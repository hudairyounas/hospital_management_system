import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  Globe,
  Calendar,
  Menu,
  X,
  MessageSquare,
  FileCheck,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_INFO } from '../../data/clinic';
import { DEPARTMENTS } from '../../data/departments';
import { getCurrentWeekdayPKT, DAY_LABEL } from '../../lib/schedule';

export const TopUtilityBar: React.FC = () => {
  const { language, toggleLanguage, savedBookings, setBookingsDrawerOpen } = useApp();
  const today = getCurrentWeekdayPKT();
  const isSunday = today === 'Sunday';

  return (
    <div className="bg-ink text-surface/90 text-[13px] leading-snug">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-2 font-medium text-surface">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
            {language === 'ur'
              ? 'فرضی پورٹ فولیو ڈیمو — حقیقی ہسپتال نہیں'
              : 'Fictional demo showcase — not an active hospital'}
          </span>
          <span className="hidden md:inline text-surface/40" aria-hidden="true">|</span>
          <span className="hidden md:inline text-surface/80 tabular-nums">
            {language === 'ur'
              ? isSunday
                ? `آج (${DAY_LABEL[today].ur}): صرف لیب 09:00–14:00`
                : `آج (${DAY_LABEL[today].ur}) کھلا ہے: 09:00–21:00 PKT`
              : isSunday
              ? 'Today (Sun): Lab only 09:00–14:00 PKT'
              : `Open today (${today.slice(0, 3)}): 09:00–21:00 PKT`}
          </span>
          <span className="hidden lg:inline text-surface/40" aria-hidden="true">|</span>
          <span className="hidden lg:inline text-amber-200">
            {language === 'ur' ? 'ایمرجنسی: ریسکیو 1122' : 'Emergencies: Dial Rescue 1122'}
          </span>
        </div>

        <div className="flex items-center gap-3 ms-auto">
          <button
            type="button"
            onClick={() => setBookingsDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface/10 hover:bg-surface/20 text-surface font-medium transition-colors"
            aria-label="Open saved demo appointment requests"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span className="tabular-nums">
              {language === 'ur'
                ? `محفوظ سلپس (${savedBookings.length})`
                : `Saved slips (${savedBookings.length})`}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface text-ink hover:bg-tint font-semibold transition-colors"
            aria-label={
              language === 'en'
                ? 'Switch language to Urdu (RTL)'
                : 'Switch language to English (LTR)'
            }
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  const { language, openWhatsAppModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { to: '/doctors', label: { en: 'Doctors', ur: 'ڈاکٹرز' } },
    { to: '/departments', label: { en: 'Departments', ur: 'شعبہ جات' } },
    { to: '/patient-info', label: { en: 'Patient Guide', ur: 'رہنمائی' } },
    { to: '/about', label: { en: 'About', ur: 'تعارف' } },
    { to: '/contact', label: { en: 'Contact', ur: 'رابطہ' } },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-rule">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-4">
        {/* Compact architectural wordmark — never wraps */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-2 focus-visible:outline-action rounded"
        >
          <span
            className="w-9 h-9 rounded bg-ink text-surface flex items-center justify-center shrink-0 font-bold text-sm tracking-tight"
            aria-hidden="true"
          >
            NM
          </span>
          <span className="flex flex-col leading-tight rtl:gap-1">
            <span className="font-bold text-[15px] sm:text-[17px] tracking-tight text-ink whitespace-nowrap rtl:leading-normal">
              {language === 'ur' ? 'نور میڈیکل سینٹر' : 'Noor Medical Centre'}
            </span>
            <span className="text-[12px] text-ink-3 hidden sm:block whitespace-nowrap rtl:leading-normal">
              {language === 'ur'
                ? 'گلبرگ III، لاہور · آؤٹ پیشنٹ و ڈائیگناسٹکس'
                : 'Gulberg III, Lahore · Outpatient & Diagnostics'}
            </span>
          </span>
        </Link>

        {/* Single-row desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3.5 py-2 text-[14px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-action text-action font-semibold'
                    : 'border-transparent text-ink-2 hover:text-ink hover:border-rule-strong'
                }`
              }
            >
              {item.label[language]}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right utility + single primary CTA */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div className="hidden xl:flex flex-col items-end leading-tight border-e border-rule pe-4">
            <span className="text-[12px] text-ink-3">
              {language === 'ur' ? 'ڈیمو ہیلپ لائن' : 'Demo reception desk'}
            </span>
            <Link
              to="/contact"
              className="text-[14px] font-semibold text-ink hover:text-action tabular-nums whitespace-nowrap"
            >
              {CLINIC_INFO.phoneRaw}
            </Link>
          </div>

          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold whitespace-nowrap transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'ur' ? 'اپائنٹمنٹ بک کریں' : 'Request appointment'}</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded border border-rule-strong text-ink text-[14px] font-semibold hover:bg-tint"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>{mobileMenuOpen ? (language === 'ur' ? 'بند' : 'Close') : language === 'ur' ? 'مینو' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Full-height accessible mobile drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[104px] bottom-0 z-50 bg-surface border-t border-rule overflow-y-auto px-4 py-5 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <nav aria-label="Mobile navigation" className="divide-y divide-rule border-y border-rule">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `py-3.5 flex items-center justify-between text-[16px] font-semibold ${
                    isActive ? 'text-action' : 'text-ink'
                  }`
                }
              >
                <span>{language === 'ur' ? 'سرورق' : 'Home'}</span>
              </NavLink>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `py-3.5 flex items-center justify-between text-[16px] font-semibold ${
                      isActive ? 'text-action' : 'text-ink'
                    }`
                  }
                >
                  <span>{item.label[language]}</span>
                </NavLink>
              ))}
            </nav>

            <div className="space-y-2.5">
              <Link
                to="/appointment"
                className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[48px] rounded bg-action text-surface text-[15px] font-semibold"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ur' ? 'اپائنٹمنٹ کی درخواست دیں' : 'Request an appointment'}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppModal(
                    'Assalam-o-Alaikum Noor Medical Centre (Demo), I would like to check specialist consultation timings.',
                    'Mobile Menu WhatsApp Action'
                  );
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[48px] rounded border border-ink text-ink text-[15px] font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ur' ? 'واٹس ایپ استفسار' : 'WhatsApp inquiry'}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-rule text-[13px] text-ink-2 space-y-1">
            <p className="font-semibold text-ink tabular-nums">{CLINIC_INFO.phoneDisplay}</p>
            <p>{language === 'ur' ? 'پیر تا ہفتہ: 09:00 – 21:00 PKT' : 'Mon–Sat: 09:00 AM – 09:00 PM PKT'}</p>
            <p className="text-danger font-medium">
              {language === 'ur' ? 'ایمرجنسی: ریسکیو 1122 پر کال کریں' : 'Medical emergency: Dial Rescue 1122'}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export const MobileBottomActionBar: React.FC = () => {
  const { language, openWhatsAppModal, showToast } = useApp();

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CLINIC_INFO.phoneRaw);
    } catch {
      // ignore if clipboard blocked
    }
    showToast(
      language === 'ur'
        ? `ڈیمو فون نمبر کاپی ہو گیا: ${CLINIC_INFO.phoneRaw}`
        : `Demo phone copied: ${CLINIC_INFO.phoneRaw}`
    );
  };

  return (
    <nav
      aria-label="Quick mobile actions"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-rule shadow-bar grid grid-cols-3"
    >
      <button
        type="button"
        onClick={handleCopyPhone}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[54px] text-ink hover:bg-tint border-e border-rule text-[13px] font-semibold"
      >
        <Phone className="w-4 h-4 text-ink-2" />
        <span>{language === 'ur' ? 'کال (ڈیمو)' : 'Call'}</span>
      </button>

      <button
        type="button"
        onClick={() =>
          openWhatsAppModal(
            'Assalam-o-Alaikum Noor Medical Centre (Demo), I would like to inquire about specialist OPD timings.',
            'Mobile Bottom Bar WhatsApp'
          )
        }
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[54px] text-ink hover:bg-tint border-e border-rule text-[13px] font-semibold"
      >
        <MessageSquare className="w-4 h-4 text-ink-2" />
        <span>{language === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
      </button>

      <Link
        to="/appointment"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[54px] bg-action text-surface hover:bg-action-hover text-[13px] font-semibold"
      >
        <Calendar className="w-4 h-4" />
        <span>{language === 'ur' ? 'اپائنٹمنٹ' : 'Book'}</span>
      </Link>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const { language, t } = useApp();

  return (
    <footer className="bg-ink text-surface mt-16 pb-20 lg:pb-0">
      {/* Honest Demo & Emergency Strip */}
      <div className="border-b border-surface/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[13px] text-surface/85">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p>
              <strong className="text-surface">
                {language === 'ur' ? 'فرضی ڈیمو نوٹس:' : 'Fictional portfolio demo:'}
              </strong>{' '}
              {language === 'ur'
                ? 'نور میڈیکل سینٹر، اس کے ڈاکٹرز، پی ایم ڈی سی نمبرز، پتہ اور فون نمبرز فرضی ہیں۔ کوئی ڈیٹا سرور پر نہیں بھیجا جاتا۔ ایمرجنسی میں ریسکیو 1122 پر کال کریں۔'
                : 'Noor Medical & Diagnostic Centre, its doctors, DEMO-PMDC IDs, address, and phone numbers are fictional. No form data leaves your browser. For real emergencies, dial Rescue 1122.'}
            </p>
          </div>
          <Link
            to="/patient-info#privacy-notice"
            className="shrink-0 font-semibold text-surface underline underline-offset-4 hover:text-amber-200"
          >
            {language === 'ur' ? 'پرائیویسی نوٹس' : 'Demo privacy notice'}
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand & Address (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded bg-surface text-ink flex items-center justify-center font-bold text-sm">
              NM
            </span>
            <div>
              <p className="font-bold text-[16px] text-surface">{t(CLINIC_INFO.name)}</p>
              <p className="text-[13px] text-surface/70">{t(CLINIC_INFO.city)}</p>
            </div>
          </div>

          <div className="space-y-2 text-[14px] text-surface/80 pt-1">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-1 text-surface/60" />
              <span>{t(CLINIC_INFO.address)}</span>
            </p>
            <p className="flex items-center gap-2 tabular-nums font-semibold text-surface">
              <Phone className="w-4 h-4 shrink-0 text-surface/60" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </p>
          </div>
        </div>

        {/* Departments (3 cols) */}
        <div className="lg:col-span-3">
          <h3 className="text-[14px] font-semibold text-surface mb-3">
            {language === 'ur' ? 'طبی شعبہ جات' : 'Departments'}
          </h3>
          <ul className="space-y-2 text-[14px] text-surface/75">
            {DEPARTMENTS.map((dept) => (
              <li key={dept.slug}>
                <Link
                  to={`/departments/${dept.slug}`}
                  className="hover:text-surface hover:underline underline-offset-4"
                >
                  {t(dept.shortName)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Links (2 cols) */}
        <div className="lg:col-span-2">
          <h3 className="text-[14px] font-semibold text-surface mb-3">
            {language === 'ur' ? 'اہم صفحات' : 'Patient links'}
          </h3>
          <ul className="space-y-2 text-[14px] text-surface/75">
            <li>
              <Link to="/doctors" className="hover:text-surface hover:underline underline-offset-4">
                {language === 'ur' ? 'ڈاکٹرز کی فہرست' : 'Find a doctor'}
              </Link>
            </li>
            <li>
              <Link to="/departments" className="hover:text-surface hover:underline underline-offset-4">
                {language === 'ur' ? 'فیس اور ٹیسٹ ریٹس' : 'Fees & diagnostics'}
              </Link>
            </li>
            <li>
              <Link to="/appointment" className="hover:text-surface hover:underline underline-offset-4">
                {language === 'ur' ? 'اپائنٹمنٹ فارم' : 'Request appointment'}
              </Link>
            </li>
            <li>
              <Link to="/patient-info" className="hover:text-surface hover:underline underline-offset-4">
                {language === 'ur' ? 'مریضوں کی رہنمائی' : 'Patient guide & FAQs'}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-surface hover:underline underline-offset-4">
                {language === 'ur' ? 'تعارف اور فلور پلان' : 'About the building'}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-surface hover:underline underline-offset-4">
                {language === 'ur' ? 'رابطہ اور نقشہ' : 'Contact & directions'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours (3 cols) */}
        <div className="lg:col-span-3">
          <h3 className="text-[14px] font-semibold text-surface mb-3">
            {language === 'ur' ? 'اوقاتِ کار (PKT)' : 'Opening hours (PKT)'}
          </h3>
          <dl className="divide-y divide-surface/15 text-[13px] text-surface/80 tabular-nums">
            <div className="py-2 flex justify-between gap-2">
              <dt>{language === 'ur' ? 'او پی ڈی (پیر–ہفتہ)' : 'OPD (Mon–Sat)'}</dt>
              <dd className="text-surface font-medium">09:00 – 21:00</dd>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <dt>{language === 'ur' ? 'نہار منہ لیب' : 'Fasting lab'}</dt>
              <dd className="text-surface font-medium">08:00 – 21:30</dd>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <dt>{language === 'ur' ? 'ڈینٹل سویٹ' : 'Dental suite'}</dt>
              <dd className="text-surface font-medium">11:00 – 20:30</dd>
            </div>
            <div className="py-2 flex justify-between gap-2">
              <dt>{language === 'ur' ? 'اتوار' : 'Sunday'}</dt>
              <dd className="text-amber-200">{language === 'ur' ? 'صرف لیب 09–14' : 'Lab only 09:00–14:00'}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-surface/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-surface/65">
          <p>
            © {new Date().getFullYear()} {t(CLINIC_INFO.name)} · FuturePlix Frontend Portfolio Demo
          </p>
          <p className="tabular-nums">PKT (UTC+5) · PKR (Rs.) · Frontend-only</p>
        </div>
      </div>
    </footer>
  );
};
