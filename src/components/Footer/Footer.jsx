import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="contact-number">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.9 0 7.1 3.1 7.1 7z"></path>
          </svg>
          <span>8001180044</span>
        </div>
        <img src="/group-21.svg" alt="BCare Logo" className="footer-logo" />
      </div>

      <div className="app-links-footer">
        <img src="/layer-30.svg" alt="AppGallery" />
        <img src="/group-13180.svg" alt="App Store" />
        <img src="/group-13200.svg" alt="Google Play" />
      </div>

      <div className="footer-accordion">
        {['عن بي كير', 'منتجاتنا', 'الدعم الفني', 'روابط مهمة'].map((title, i) => (
          <div key={i} className="accordion-item">
            <div className="accordion-header">
              <span>{title}</span>
              {title !== 'الدعم الفني' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-privacy-links">
        <Link to="/privacy">سياسة الخصوصية</Link>
        <span className="divider">|</span>
        <a href="#">الشروط والأحكام</a>
      </div>

      <div className="footer-bottom-info">
        <div className="payment-methods">
          <img src="/group0.svg" alt="Payment Methods" className="payment-img" />
        </div>
        <div className="social-links">
          {/* Using placeholders for social icons if not found in public */}
          <div className="social-icon">X</div>
          <div className="social-icon">in</div>
          <div className="social-icon">IG</div>
          <div className="social-icon">SC</div>
          <div className="social-icon">f</div>
        </div>
        <p className="footer-copy">2026 © جميع الحقوق محفوظة، شركة عناية الوسيط لوساطة التأمين</p>
      </div>
    </footer>
  );
};

export default Footer;
