import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, ShieldCheck, Calendar, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FAQS, CLINIC_INFO } from '../../data/clinic';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { SEOHead } from '../../components/shared/SEOHead';

export const PatientInfoPage: React.FC = () => {
  const { language, t } = useApp();
  const [faqQuery, setFaqQuery] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQS[0].id);

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    return FAQS.filter((item) => {
      if (selectedFaqCategory !== 'all' && item.category !== selectedFaqCategory) {
        return false;
      }
      if (q) {
        const hay = `${item.question.en} ${item.question.ur} ${item.answer.en} ${item.answer.ur}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [faqQuery, selectedFaqCategory]);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={language === 'ur' ? 'مریضوں کی رہنمائی، عام سوالات اور پرائیویسی نوٹس' : 'Patient Guide, Lab Fasting Instructions, FAQs & Demo Privacy Notice'}
        description="Practical visitor guide for Noor Medical Centre Lahore (Demo): lab fasting rules, OPD checklist, emergency guidance, searchable FAQs, and frontend privacy notice."
      />

      <Breadcrumbs
        items={[{ label: language === 'ur' ? 'مریضوں کی رہنمائی' : 'Patient guide & FAQs' }]}
      />

      {/* Editorial Header */}
      <div className="mt-2 pb-6 border-b border-ink space-y-2 max-w-3xl">
        <h1 className="text-[28px] sm:text-[36px] font-bold text-ink tracking-[-0.02em] leading-[1.12]">
          {language === 'ur'
            ? 'مریضوں کی رہنمائی، لیب تیاری اور عام سوالات'
            : 'Patient Information, Lab Preparation & Frequently Asked Questions'}
        </h1>
        <p className="text-[15px] text-ink-2">
          {language === 'ur'
            ? 'کلینک آنے سے پہلے کیا ساتھ لائیں، نہار منہ ٹیسٹوں کے اصول، ایمرجنسی رہنمائی اور پرائیویسی نوٹس۔'
            : 'What to bring for an OPD visit, overnight fasting rules for lab draws, urgent care redirection, and our frontend privacy notice.'}
        </p>
      </div>

      {/* Practical Preparation Grid (Ruled columns, not identical boxes) */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="pt-4 border-t-2 border-ink space-y-3">
          <h2 className="text-[17px] font-bold text-ink">
            {language === 'ur' ? 'او پی ڈی کے لیے کیا ساتھ لائیں' : 'What to bring to OPD'}
          </h2>
          <ul className="space-y-2 text-[14px] text-ink-2 leading-relaxed">
            <li>• {language === 'ur' ? 'موجودہ ادویات کی فہرست یا دوائی کے پتے۔' : 'Current medications or clear smartphone photos of medicine strips.'}</li>
            <li>• {language === 'ur' ? 'پچھلے ۶ ماہ کی لیب رپورٹس، ایکسرے یا ای سی جی۔' : 'Previous lab reports, ECG traces, or X-ray films from the past 6 months.'}</li>
            <li>• {language === 'ur' ? 'بچوں کے لیے حفاظتی ٹیکوں (EPI) والا کارڈ۔' : 'Child’s EPI immunization and growth card for pediatric visits.'}</li>
          </ul>
        </div>

        <div className="pt-4 border-t-2 border-ink space-y-3">
          <h2 className="text-[17px] font-bold text-ink">
            {language === 'ur' ? 'نہار منہ لیب اور الٹراساؤنڈ' : 'Fasting lab & ultrasound prep'}
          </h2>
          <ul className="space-y-2 text-[14px] text-ink-2 leading-relaxed">
            <li>• {language === 'ur' ? 'لپڈ پروفائل اور فاسٹنگ شوگر: ۱۰ تا ۱۲ گھنٹے نہار منہ۔' : 'Lipid Profile & Fasting Glucose: 10–12 hours overnight fasting.'}</li>
            <li>• {language === 'ur' ? 'سادہ پانی پینے کی اجازت ہے؛ چائے یا جوس سے پرہیز کریں۔' : 'Plain water is permitted; avoid tea, coffee, or juice.'}</li>
            <li>• {language === 'ur' ? 'سیمپل بوتھ پیر تا ہفتہ صبح ۸ بجے کھلتے ہیں۔' : 'Sample booths open at 08:00 AM PKT Monday through Saturday.'}</li>
          </ul>
        </div>

        <div className="bg-danger-bg border border-danger-border rounded-md p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-danger font-bold text-[15px]">
            <PhoneCall className="w-4 h-4 shrink-0" />
            <h2>{language === 'ur' ? 'ایمرجنسی طبی امداد' : 'Urgent & emergency care'}</h2>
          </div>
          <p className="text-[14px] text-ink-2 leading-relaxed">{t(CLINIC_INFO.emergencyNotice)}</p>
        </div>
      </section>

      {/* Searchable FAQ Directory */}
      <section className="mt-14 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-ink">
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-bold text-ink tracking-[-0.015em]">
              {language === 'ur' ? 'اکثر پوچھے جانے والے سوالات (FAQs)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-ink-3 absolute top-3.5 start-3 pointer-events-none" />
              <input
                type="search"
                aria-label="Search frequently asked questions"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder={language === 'ur' ? 'سوال تلاش کریں...' : 'Search questions...'}
                className="w-full sm:w-64 min-h-[42px] rounded border border-rule-strong bg-surface ps-9 pe-3 py-2 text-[14px] text-ink"
              />
            </div>

            <select
              aria-label="Filter FAQs by topic"
              value={selectedFaqCategory}
              onChange={(e) => setSelectedFaqCategory(e.target.value)}
              className="min-h-[42px] rounded border border-rule-strong bg-surface px-3 py-2 text-[14px] text-ink"
            >
              <option value="all">{language === 'ur' ? 'تمام موضوعات' : 'All topics'}</option>
              <option value="Appointments">{language === 'ur' ? 'اپائنٹمنٹ' : 'Appointments'}</option>
              <option value="Hours & Location">{language === 'ur' ? 'اوقات اور لوکیشن' : 'Hours & Location'}</option>
              <option value="Fees & Diagnostics">{language === 'ur' ? 'فیس اور لیب' : 'Fees & Diagnostics'}</option>
              <option value="Urgent Care & Privacy">{language === 'ur' ? 'ایمرجنسی اور پرائیویسی' : 'Urgent Care & Privacy'}</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-rule border-b border-rule bg-surface px-4 sm:px-6 border-x border-rule-strong rounded-md">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 text-start flex items-center justify-between gap-4 hover:text-action transition-colors"
                >
                  <div>
                    <span className="text-[12px] font-semibold text-ink-3 block">{faq.category}</span>
                    <span className="text-[15px] font-bold text-ink">{t(faq.question)}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-action shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-3 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="pb-4 text-[14px] text-ink-2 leading-relaxed max-w-[74ch]">
                    {t(faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo Privacy Notice & Healthcare Responsibility */}
      <section
        id="privacy-notice"
        className="mt-14 scroll-mt-24 bg-ink text-surface rounded-md p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-300 shrink-0" />
          <h2 className="text-[20px] sm:text-[24px] font-bold text-surface">
            {language === 'ur'
              ? 'ڈیمو پرائیویسی نوٹس اور طبی ذمہ داری کی وضاحت'
              : 'Demo Privacy Notice & Healthcare Responsibility Statement'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] text-surface/85 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-surface">
              {language === 'ur' ? '۱۔ ۱۰۰٪ فرنٹ اینڈ براؤزر اسٹوریج' : '1. Zero external transmission (browser-only state)'}
            </h3>
            <p>
              {language === 'ur'
                ? 'یہ ویب سائٹ صرف ایک فرنٹ اینڈ شوکیس ہے۔ اپائنٹمنٹ یا رابطہ فارم میں درج کیا گیا کوئی بھی نام یا فون نمبر کسی سرور یا ڈیٹا بیس کو نہیں بھیجا جاتا۔ ڈیمو سلپس صرف آپ کے اپنے براؤزر میں محفوظ ہوتی ہیں۔'
                : 'This application runs strictly in your browser with no backend server or database. Information entered into the Appointment Simulator or Contact Form never leaves your device and can be cleared from browser LocalStorage at any time.'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-surface">
              {language === 'ur' ? '۲۔ حساس معلومات اور طبی مشورے کی ممانعت' : '2. No real PHI collection or medical advice'}
            </h3>
            <p>
              {language === 'ur'
                ? 'ہم شناختی کارڈ نمبر (CNIC)، بیماری کی تفصیلی ہسٹری یا میڈیکل رپورٹس طلب نہیں کرتے۔ اس ویب سائٹ کا مواد کسی مستند ڈاکٹر کے مشورے کا متبادل نہیں ہے۔'
                : 'We intentionally do not ask for CNIC numbers, medical history, or diagnostic reports. Nothing on this demonstration website constitutes medical advice, diagnosis, or a confirmed clinical appointment.'}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-surface/15 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[13px] text-surface/70">
            FuturePlix Healthcare UI/UX Showcase · Frontend-only
          </span>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-4 min-h-[42px] rounded bg-surface text-ink hover:bg-tint text-[14px] font-semibold"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'ur' ? 'ڈیمو اپائنٹمنٹ فارم آزمائیں' : 'Test appointment simulator'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
