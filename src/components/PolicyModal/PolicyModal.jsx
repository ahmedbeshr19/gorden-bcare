import React from 'react';
import './PolicyModal.css';

export const PolicyModal = ({ isOpen, onClose, data, isFinal = false }) => {
  if (!isOpen) return null;

  const today = new Date();
  const formattedToday = today.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' });
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);
  const formattedNextYear = nextYear.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' });

  // Company Logo Mapping
  const companyLogos = {
    'تكافل الراجحي': '/group0.svg',
    'التعاونية': '/group1.svg',
    'ميدغلف للتأمين': '/med-gulf-svg0.svg',
    'شركة سلامة للتأمين': '/clip-path-group0.svg',
  };

  const selectedLogo = companyLogos[data.selectedCompany] || '/group0.svg';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`policy-modal-overlay ${isFinal ? 'is-final-view' : ''}`} onClick={onClose}>
      <div className="policy-modal-content" onClick={e => e.stopPropagation()} dir="rtl">
        
        {/* Top Gradient Bar */}
        <div className="top-gradient-bar"></div>

        <div className="policy-document-body" id="printable-policy">
          
          {/* Watermark Overlay (Only if NOT final) */}
          {!isFinal && (
            <div className="watermark-overlay">
              <div className="watermark-text">
                <span className="wm-main">مسودة</span>
                <span className="wm-sub">بحاجة إلى تسديد الرسوم وإستكمال الإجراءات</span>
              </div>
              <div className="watermark-text second">
                <span className="wm-main">مسودة</span>
                <span className="wm-sub">بحاجة إلى تسديد الرسوم وإستكمال الإجراءات</span>
              </div>
            </div>
          )}

          {isFinal && (
            <div className="final-stamp">
              <span>مدفوع</span>
              <small>PAID</small>
            </div>
          )}

          {/* Header Logos */}
          <div className="doc-header">
            <div className="header-logo-right">
              <img src="/group-21.svg" alt="B-Care" />
              <p>وسيط تأمين معتمد</p>
            </div>
            <div className="header-logo-center">
              <img src={selectedLogo} alt={data.selectedCompany} />
              <div className="company-meta-text">
                <h3>{data.selectedCompany || 'تكافل الراجحي'}</h3>
                <p>شركة تأمين مرخصة من البنك المركزي السعودي</p>
              </div>
            </div>
            <div className="header-logo-left">
              <img src="/group22.svg" alt="Company Logo" />
            </div>
          </div>

          {/* Main Title Box */}
          <div className="main-title-container">
            <div className="title-box">
              <h1>وثيقة تأمين شامل للمركبات</h1>
              <p>Insurance Policy Document</p>
            </div>
          </div>

          {/* Policy Info Grid */}
          <div className="policy-info-grid">
            <div className="info-box-item">
              <span className="box-label">رقم الوثيقة</span>
              <span className="box-value">POL-{data.idNumber?.substring(0, 6).toUpperCase() || 'MLQCBT'}-2026</span>
            </div>
            <div className="info-box-item">
              <span className="box-label">تاريخ بدء التأمين</span>
              <span className="box-value">{formattedToday}</span>
            </div>
            <div className="info-box-item full-width">
              <span className="box-label">تاريخ انتهاء التأمين</span>
              <span className="box-value">{formattedNextYear}</span>
            </div>
          </div>

          {/* Section 1: Policy Holder */}
          <div className="doc-section-block">
            <div className="section-header">
              <span className="section-badge">1</span>
              <h2>بيانات المؤمن له</h2>
            </div>
            <div className="section-line"></div>
            <div className="data-rows-list">
              <div className="data-row">
                <span className="label">الاسم الكامل:</span>
                <span className="value">{data.fullName || '---'}</span>
              </div>
              <div className="data-row">
                <span className="label">تاريخ الميلاد:</span>
                <span className="value">8/7/1428</span>
              </div>
              <div className="data-row">
                <span className="label">رقم الهوية:</span>
                <span className="value">{data.idNumber || '---'}</span>
              </div>
              <div className="data-row">
                <span className="label">نوع التأمين:</span>
                <span className="value highlight-orange">تأمين شامل</span>
              </div>
              <div className="data-row">
                <span className="label">شركة التأمين:</span>
                <span className="value">{data.selectedCompany}</span>
              </div>
              <div className="data-row">
                <span className="label">حالة الوثيقة:</span>
                <span className={`value ${isFinal ? 'status-active' : 'status-urgent'}`}>
                  {isFinal ? 'سارية المفعول - مدفوعة' : 'بإنتظار الدفع وإستكمال الإجراءات'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Data */}
          <div className="doc-section-block">
            <div className="section-header">
              <span className="section-badge">2</span>
              <h2>بيانات المركبة</h2>
            </div>
            <div className="section-line"></div>
            <div className="data-rows-list">
              <div className="data-row">
                <span className="label">ماركة ونوع المركبة:</span>
                <span className="value">{data.carMakeModel || '---'}</span>
              </div>
              <div className="data-row">
                <span className="label">سنة الصنع:</span>
                <span className="value">{data.manufactureYear || '---'}</span>
              </div>
              <div className="data-row">
                <span className="label">القيمة التقديرية:</span>
                <span className="value">10,000 ريال</span>
              </div>
              <div className="data-row">
                <span className="label">الغرض من الاستخدام:</span>
                <span className="value">{data.usage || 'شخصي'}</span>
              </div>
              <div className="data-row">
                <span className="label">مكان إصلاح المركبة:</span>
                <span className="value">{data.repairLocation === 'agency' ? 'الوكالة' : 'الورشة'}</span>
              </div>
              <div className="data-row">
                <span className="label">نوع تسجيل المركبة:</span>
                <span className="value">استمارة</span>
              </div>
              <div className="data-row">
                <span className="label">الرقم التسلسلي:</span>
                <span className="value">{data.sequenceNumber || '---'}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Coverage */}
          <div className="doc-section-block">
            <div className="section-header">
              <span className="section-badge">3</span>
              <h2>تفاصيل التغطية</h2>
            </div>
            <div className="section-line"></div>
            <div className="coverage-box">
              <ul className="coverage-list">
                <li>المسؤولية المدنية تجاه الغير بحد أقصى 10,000,000 ريال</li>
                <li>تغطية الأضرار المادية والجسدية للطرف الثالث</li>
                <li>تغطية حالات الطوارئ على الطريق</li>
                <li>تغطية أضرار المركبة المؤمن عليها</li>
                <li>تغطية السرقة والحريق والكوارث الطبيعية</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Financial Summary */}
          <div className="doc-section-block">
            <div className="section-header">
              <span className="section-badge">4</span>
              <h2>الملخص المالي</h2>
            </div>
            <div className="section-line"></div>
            <div className="financial-summary-box">
              <div className="f-sum-row">
                <span className="label">رسوم التأمين الأساسية:</span>
                <span className="value">{(parseFloat(data.totalPrice || 0) / 1.15).toFixed(2)} ر.س</span>
              </div>
              <div className="f-sum-row">
                <span className="label">ضريبة القيمة المضافة (15%):</span>
                <span className="value">{(parseFloat(data.totalPrice || 0) * 0.1304).toFixed(2)} ر.س</span>
              </div>
              <div className="f-sum-total-box">
                <span className="label">المبلغ الإجمالي:</span>
                <span className="value">{data.totalPrice} ر.س</span>
              </div>
            </div>
          </div>

          {/* General Terms */}
          <div className="terms-container">
            <h3>الشروط والأحكام العامة:</h3>
            <ul>
              <li>هذه الوثيقة صادرة وفقاً لأحكام نظام مراقبة شركات التأمين التعاوني ولائحته التنفيذية.</li>
              <li>مدة التغطية التأمينية سنة هجرية واحدة من تاريخ الإصدار.</li>
              <li>يلتزم المؤمن له بالإفصاح عن جميع المعلومات الجوهرية المتعلقة بالخطر المؤمن عليه.</li>
              <li>في حال وقوع حادث يجب إبلاغ الشركة خلال 15 يوم عمل من تاريخ الحادث.</li>
              <li>تخضع هذه الوثيقة لأنظمة المملكة العربية السعودية والاختصاص القضائي لمحاكمها.</li>
            </ul>
          </div>

          {/* Footer Signatures */}
          <div className="doc-footer">
            <div className="footer-top-line"></div>
            <div className="footer-content">
              <div className="footer-col">
                <div className="sig-placeholder"></div>
                <p>توقيع المؤمن له</p>
              </div>
              <div className="footer-col center">
                <p>تم الإصدار إلكترونياً عبر منصة بي كير</p>
                <p className="small">هذه الوثيقة إلكترونية ولا تحتاج إلى توقيع أو ختم</p>
              </div>
              <div className="footer-col">
                <div className="sig-placeholder"></div>
                <p>ختم الشركة</p>
              </div>
            </div>
            <div className="bottom-gradient-bar"></div>
          </div>

        </div>

        {/* Buttons */}
        <div className="modal-action-buttons">
          {isFinal && (
            <button className="download-policy-btn main-action-btn" onClick={handlePrint}>تنزيل الوثيقة PDF</button>
          )}
          <button className="policy-modal-close-btn-new" onClick={onClose}>إغلاق</button>
        </div>

      </div>
    </div>
  );
};
