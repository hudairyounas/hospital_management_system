import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Search,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, ALL_SERVICES } from '../../data/departments';
import { DOCTORS } from '../../data/doctors';
import { CLINIC_INFO, FAQS } from '../../data/clinic';
import { formatPKR } from '../../lib/validation';
import {
  WING_META,
  DAY_LABEL,
  getCurrentWeekdayPKT,
  isDoctorInClinicOnDay,
  getDoctorSlotForDay,
  getDoctorRoomShort,
} from '../../lib/schedule';
import { BuildingCrossSectionSVG } from '../../components/shared/WayfindingVisuals';
import { SEOHead } from '../../components/shared/SEOHead';

export const HomePage: React.FC = () => {
  const { language, t, openWhatsAppModal } = useApp();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQS[0].id);

  const today = getCurrentWeekdayPKT();
  const boardDay = today === 'Sunday' ? 'Monday' : today;
  const todaysDoctors = DOCTORS.filter((doc) => isDoctorInClinicOnDay(doc, boardDay)).slice(0, 6);

  const groundFloorDepts = DEPARTMENTS.filter((d) => WING_META[d.slug].floor === 'Ground Floor');
  const firstFloorDepts = DEPARTMENTS.filter((d) => WING_META[d.slug].floor === 'First Floor');

  const sampleTariffIds = ['gm-1', 'ped-1', 'card-1', 'card-2', 'dent-2', 'diag-2'];
  const sampleTariff = sampleTariffIds
    .map((id) => ALL_SERVICES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const homeFaqs = FAQS.slice(0, 5);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchKeyword.trim();
    navigate(q ? `/doctors?q=${encodeURIComponent(q)}` : '/doctors');
  };

  return (
    <>
      <SEOHead
        title={
          language === 'ur'
            ? 'نور میڈیکل اینڈ ڈائیگناسٹک سینٹر — لاہور'
            : 'Noor Medical & Diagnostic Centre — Outpatient Hospital & Clinic Lahore'
        }
        description="Fictional Pakistani multi-specialty outpatient clinic, dental suite, and diagnostic centre in Gulberg III, Lahore. Live OPD room directory, PKR fees, and simulated booking."
      />

      {/* 1. TASK-LED WAYFINDING HERO + LIVE TODAY'S OPD LOBBY BOARD */}
      <section className="bg-paper border-b border-rule">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 cols: Direct clinical positioning & single focused search */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[14px] font-medium text-ink-2">
                {language === 'ur'
                  ? 'پلاٹ 42-B، مین بلیوارڈ، گلبرگ III، لاہور (فرضی ڈیمو کیمپس)'
                  : 'Plot 42-B, Main Boulevard, Gulberg III, Lahore · Fictional demo campus'}
              </p>

              <h1 className="text-[30px] sm:text-[40px] lg:text-[46px] font-bold text-ink leading-[1.08] tracking-[-0.025em]">
                {language === 'ur'
                  ? 'گلبرگ III لاہور میں ماہر ڈاکٹرز، ڈینٹل سویٹ اور ڈائیگناسٹک لیبارٹری۔'
                  : 'Outpatient specialists, dentistry, and diagnostics in Gulberg III.'}
              </h1>

              <p className="text-[16px] sm:text-[17px] text-ink-2 leading-[1.6] max-w-[58ch]">
                {language === 'ur'
                  ? 'آٹھ طبی شعبہ جات، بارہ فرضی کنسلٹنٹ ڈاکٹرز اور صبح ۸ بجے نہار منہ لیب سیمپلنگ۔ کلینک آنے سے پہلے آج کا او پی ڈی شیڈول اور پاکستانی روپے (Rs.) میں فیس دیکھیں۔'
                  : 'Eight outpatient departments, twelve demo consultants, and 8:00 AM fasting lab collection. Check today’s room schedule and indicative PKR fees before you travel.'}
              </p>

              {/* Single focused search bar */}
              <form
                onSubmit={handleHeroSearch}
                role="search"
                aria-label="Find a doctor, department, or condition"
                className="pt-1 max-w-xl"
              >
                <label htmlFor="hero-search-input" className="block text-[13px] font-semibold text-ink mb-1.5">
                  {language === 'ur'
                    ? 'ڈاکٹر، شعبہ یا علامت تلاش کریں'
                    : 'Find a doctor, specialty, or condition'}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search
                      className="w-4 h-4 text-ink-3 absolute top-3.5 start-3.5 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="hero-search-input"
                      type="search"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder={
                        language === 'ur'
                          ? 'مثلاً ڈاکٹر عائشہ، کارڈیالوجی، شوگر، ڈینٹل...'
                          : 'e.g. Ayesha, Cardiology, Diabetes, Root Canal...'
                      }
                      className="w-full min-h-[46px] rounded border border-rule-strong bg-surface ps-10 pe-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 min-h-[46px] rounded bg-ink hover:bg-ink/90 text-surface text-[14px] font-semibold whitespace-nowrap transition-colors"
                  >
                    {language === 'ur' ? 'تلاش کریں' : 'Search'}
                  </button>
                </div>
              </form>

              {/* Primary CTA + plain contact links */}
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 px-5 min-h-[48px] rounded bg-action hover:bg-action-hover text-surface text-[15px] font-semibold transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'ur' ? 'اپائنٹمنٹ کی درخواست دیں' : 'Request an appointment'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppModal(
                      'Assalam-o-Alaikum Noor Medical Centre (Demo), I want to check today’s OPD doctor availability.',
                      'Homepage Hero WhatsApp'
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 min-h-[48px] rounded border border-ink text-ink hover:bg-tint text-[14px] font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'ur' ? 'واٹس ایپ استفسار' : 'WhatsApp inquiry'}</span>
                </button>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink hover:text-action underline underline-offset-4 decoration-action/40 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-ink-3" />
                  <span>{CLINIC_INFO.phoneRaw}</span>
                </Link>
              </div>
            </div>

            {/* Right 5 cols: Live "Today's OPD" Lobby Directory Board */}
            <div className="lg:col-span-5">
              <div className="bg-surface border border-rule-strong rounded-md overflow-hidden">
                <div className="bg-ink text-surface px-4 py-3.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
                    <h2 className="text-[15px] font-bold tracking-tight">
                      {language === 'ur'
                        ? today === 'Sunday'
                          ? 'پیر کا او پی ڈی بورڈ (آج صرف لیب)'
                          : `آج کا او پی ڈی بورڈ · ${DAY_LABEL[boardDay].ur}`
                        : today === 'Sunday'
                        ? 'Next OPD board · Monday (Lab open today)'
                        : `Today’s OPD · ${boardDay}`}
                    </h2>
                  </div>
                  <span className="text-[12px] text-surface/75 tabular-nums">PKT</span>
                </div>

                <ul className="divide-y divide-rule">
                  {todaysDoctors.map((doc) => {
                    const wing = WING_META[doc.departmentSlug];
                    const slot = getDoctorSlotForDay(doc, boardDay);
                    const room = getDoctorRoomShort(slot?.roomNumber || doc.schedule[0]?.roomNumber || '');
                    const timeShort = (slot?.timeRangePKT || '').replace(' PKT', '');
                    return (
                      <li
                        key={doc.id}
                        className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-paper/70 transition-colors"
                        style={{ borderInlineStart: `3px solid ${wing.color}` }}
                      >
                        <div className="min-w-0">
                          <Link
                            to={`/doctors/${doc.id}`}
                            className="text-[14px] font-semibold text-ink hover:text-action hover:underline underline-offset-2 block truncate"
                          >
                            {t(doc.name)}
                          </Link>
                          <p className="text-[13px] text-ink-3 truncate">
                            {t(doc.specialtyLabel)} ·{' '}
                            <span className="tabular-nums text-ink-2 font-medium">{timeShort}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span
                            className="text-[12px] font-semibold px-2 py-0.5 rounded-sm tabular-nums"
                            style={{ backgroundColor: wing.softBg, color: wing.color }}
                          >
                            {room}
                          </span>
                          <Link
                            to={`/appointment?department=${doc.departmentSlug}&doctor=${doc.id}`}
                            className="text-[13px] font-semibold text-action hover:underline underline-offset-4"
                          >
                            {language === 'ur' ? 'بک' : 'Book'}
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="px-4 py-3 bg-paper border-t border-rule flex items-center justify-between text-[13px]">
                  <span className="text-ink-3 tabular-nums">
                    {language === 'ur'
                      ? `کل ${DOCTORS.length} کنسلٹنٹ ڈاکٹرز`
                      : `Showing 6 of ${DOCTORS.length} consultants`}
                  </span>
                  <Link
                    to="/doctors"
                    className="font-semibold text-action hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    <span>{language === 'ur' ? 'مکمل ہفتہ وار شیڈول' : 'Full weekly directory'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RULED 4-COLUMN QUICK PATIENT TASKS STRIP */}
      <section aria-label="Quick patient tasks" className="bg-surface border-b border-rule">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-rule">
          {[
            {
              to: '/doctors',
              title: { en: 'Find a doctor', ur: 'ڈاکٹر تلاش کریں' },
              desc: { en: 'Filter 12 consultants by day, wing, or language.', ur: 'دن، شعبہ یا زبان کے لحاظ سے ۱۲ ڈاکٹرز۔' },
            },
            {
              to: '/departments#tariff',
              title: { en: 'Fees & lab tests', ur: 'فیس اور لیب ٹیسٹ' },
              desc: { en: 'Indicative PKR rates and fasting prep notes.', ur: 'پاکستانی روپے میں فیس اور نہار منہ ہدایات۔' },
            },
            {
              to: '/appointment',
              title: { en: 'Request an appointment', ur: 'اپائنٹمنٹ بک کریں' },
              desc: { en: '3-step demo booking slip with PKT time windows.', ur: '۳ مراحل میں ڈیمو اپائنٹمنٹ سلپ حاصل کریں۔' },
            },
            {
              to: '/contact',
              title: { en: 'Location & opening hours', ur: 'پتہ اور اوقاتِ کار' },
              desc: { en: 'Gulberg III directions, ramp access, and desk.', ur: 'گلبرگ III نقشہ، ریمپ اور رابطہ ڈیسک۔' },
            },
          ].map((task) => (
            <Link
              key={task.to}
              to={task.to}
              className="py-5 sm:px-5 first:sm:ps-0 last:sm:pe-0 group flex items-start justify-between gap-3 hover:bg-paper/60 transition-colors"
            >
              <div>
                <p className="text-[15px] font-bold text-ink group-hover:text-action group-hover:underline underline-offset-4">
                  {t(task.title)}
                </p>
                <p className="text-[13px] text-ink-3 mt-1">{t(task.desc)}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-action shrink-0 mt-1 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FLOOR-BY-FLOOR BUILDING DIRECTORY (REPLACES 8 IDENTICAL CARDS) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-[-0.015em]">
              {language === 'ur' ? 'عمارت کی فلور ڈائریکٹری اور شعبہ جات' : 'Building directory by floor'}
            </h2>
            <p className="text-[15px] text-ink-2 mt-1">
              {language === 'ur'
                ? 'ہر شعبے کی منزل، کمرہ نمبر اور ابتدائی مشاورتی فیس (PKR)۔'
                : 'Room ranges, clinical focus, and starting consultation fees across both floors.'}
            </p>
          </div>
          <Link
            to="/departments"
            className="text-[14px] font-semibold text-action hover:underline underline-offset-4 inline-flex items-center gap-1 shrink-0"
          >
            <span>{language === 'ur' ? 'تمام شعبے اور مکمل ٹیرف' : 'All departments & full tariff'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Ground Floor */}
          <div>
            <div className="flex items-baseline justify-between pb-3 border-b border-rule-strong">
              <h3 className="text-[15px] font-bold text-ink">
                {language === 'ur' ? 'گراؤنڈ فلور (بغیر سیڑھیوں کے رسائی)' : 'Ground Floor · Step-free entry'}
              </h3>
              <span className="text-[13px] text-ink-3 tabular-nums">G-01 – G-12 · Lab</span>
            </div>
            <ul className="divide-y divide-rule">
              {groundFloorDepts.map((dept) => {
                const wing = WING_META[dept.slug];
                return (
                  <li key={dept.slug} className="py-4 flex items-start justify-between gap-4">
                    <div
                      className="ps-3.5 min-w-0"
                      style={{ borderInlineStart: `3px solid ${wing.color}` }}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <Link
                          to={`/departments/${dept.slug}`}
                          className="text-[16px] font-bold text-ink hover:text-action hover:underline underline-offset-4"
                        >
                          {t(dept.name)}
                        </Link>
                        <span className="text-[13px] text-ink-3 tabular-nums">{wing.roomRange}</span>
                      </div>
                      <p className="text-[14px] text-ink-2 mt-1 leading-snug">{t(dept.tagline)}</p>
                    </div>
                    <div className="text-end shrink-0">
                      <span className="block text-[14px] font-bold text-ink tabular-nums">
                        {formatPKR(dept.startingFeePKR)}
                      </span>
                      <Link
                        to={`/appointment?department=${dept.slug}`}
                        className="text-[13px] font-semibold text-action hover:underline underline-offset-4"
                      >
                        {language === 'ur' ? 'بک کریں' : 'Book'}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* First Floor */}
          <div>
            <div className="flex items-baseline justify-between pb-3 border-b border-rule-strong">
              <h3 className="text-[15px] font-bold text-ink">
                {language === 'ur' ? 'فرسٹ فلور (لفٹ اور سیڑھیاں)' : 'First Floor · Lift & stairs'}
              </h3>
              <span className="text-[13px] text-ink-3 tabular-nums">101 – 115 · D-1 – D-4</span>
            </div>
            <ul className="divide-y divide-rule">
              {firstFloorDepts.map((dept) => {
                const wing = WING_META[dept.slug];
                return (
                  <li key={dept.slug} className="py-4 flex items-start justify-between gap-4">
                    <div
                      className="ps-3.5 min-w-0"
                      style={{ borderInlineStart: `3px solid ${wing.color}` }}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <Link
                          to={`/departments/${dept.slug}`}
                          className="text-[16px] font-bold text-ink hover:text-action hover:underline underline-offset-4"
                        >
                          {t(dept.name)}
                        </Link>
                        <span className="text-[13px] text-ink-3 tabular-nums">{wing.roomRange}</span>
                      </div>
                      <p className="text-[14px] text-ink-2 mt-1 leading-snug">{t(dept.tagline)}</p>
                    </div>
                    <div className="text-end shrink-0">
                      <span className="block text-[14px] font-bold text-ink tabular-nums">
                        {formatPKR(dept.startingFeePKR)}
                      </span>
                      <Link
                        to={`/appointment?department=${dept.slug}`}
                        className="text-[13px] font-semibold text-action hover:underline underline-offset-4"
                      >
                        {language === 'ur' ? 'بک کریں' : 'Book'}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FULL-BLEED ARCHITECTURAL WAYFINDING BAND */}
      <section className="bg-tint border-y border-rule py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 bg-surface border border-rule-strong p-3 sm:p-4 rounded-md">
            <BuildingCrossSectionSVG />
          </div>

          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-[-0.015em] leading-tight">
              {language === 'ur'
                ? 'آنے سے پہلے جان لیں: رسائی، پردہ اور لیبارٹری کے اوقات۔'
                : 'Built for unhurried outpatient visits.'}
            </h2>

            <dl className="divide-y divide-rule border-y border-rule text-[14px]">
              <div className="py-3">
                <dt className="font-bold text-ink">
                  {language === 'ur' ? 'گراؤنڈ فلور وہیل چیئر رسائی' : 'Step-free ground floor'}
                </dt>
                <dd className="text-ink-2 mt-0.5">
                  {language === 'ur'
                    ? 'ہڈی و جوڑ، انٹرنل میڈیسن، اطفال اور لیبارٹری گراؤنڈ فلور پر واقع ہیں۔'
                    : 'Orthopedics, Internal Medicine, Pediatrics, and the Diagnostic Lab sit on Ground Floor with ramp access.'}
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-bold text-ink">
                  {language === 'ur' ? 'خواتین کا علیحدہ ساؤتھ ونگ' : 'All-female Gynecology South Wing'}
                </dt>
                <dd className="text-ink-2 mt-0.5">
                  {language === 'ur'
                    ? 'گائنی اور الٹراساؤنڈ کے لیے مکمل طور پر خواتین ڈاکٹرز اور نرسنگ اسٹاف۔'
                    : 'Rooms 108–111 are staffed exclusively by female consultants and nursing assistants.'}
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-bold text-ink">
                  {language === 'ur' ? 'صبح ۸ بجے نہار منہ لیب سیمپلنگ' : '8:00 AM fasting blood collection'}
                </dt>
                <dd className="text-ink-2 mt-0.5">
                  {language === 'ur'
                    ? 'کولیسٹرول اور شوگر کے ٹیسٹ دفتری اوقات سے پہلے مکمل کروائیں۔'
                    : 'Lipid profiles and fasting glucose draws start an hour before specialist OPD opens.'}
                </dd>
              </div>
            </dl>

            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-action hover:underline underline-offset-4"
            >
              <span>{language === 'ur' ? 'عمارت اور کلینیکل معیار کے بارے میں مزید پڑھیں' : 'Read about the building & care standards'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PRINTED TARIFF PREVIEW + OPENING HOURS & RESCUE 1122 SPLIT */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Printed-style Tariff Sheet (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-ink">
              <h2 className="text-[22px] sm:text-[26px] font-bold text-ink tracking-[-0.015em]">
                {language === 'ur' ? 'متوقع فیس اور تشخیصی ریٹس (PKR)' : 'Indicative fees & diagnostics (PKR)'}
              </h2>
              <Link
                to="/departments#tariff"
                className="text-[14px] font-semibold text-action hover:underline underline-offset-4"
              >
                {language === 'ur' ? 'مکمل فہرست دیکھیں' : 'Full fee schedule'}
              </Link>
            </div>

            <ul className="space-y-3.5">
              {sampleTariff.map((srv) => (
                <li key={srv.id} className="flex items-baseline gap-3 text-[15px]">
                  <span className="font-medium text-ink">{t(srv.name)}</span>
                  <span className="flex-1 tariff-leader h-3 min-w-[24px]" aria-hidden="true" />
                  <span className="font-bold text-ink tabular-nums whitespace-nowrap">
                    {formatPKR(srv.feePKR)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[13px] text-ink-3 pt-2">
              {language === 'ur'
                ? 'نوٹ: یہ ڈیمو ریٹس پاکستانی روپے (PKR) میں محض رہنمائی کے لیے ہیں۔ اس ویب سائٹ پر کوئی آن لائن ادائیگی نہیں لی جاتی۔'
                : 'Indicative demo tariff in Pakistani Rupees. No online payments or card details are collected on this frontend showcase.'}
            </p>
          </div>

          {/* Opening Hours & Calm Urgent Care Guidance (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-rule-strong rounded-md p-5 space-y-3">
              <h2 className="text-[17px] font-bold text-ink">
                {language === 'ur' ? 'اوقاتِ کار (پاکستان اسٹینڈرڈ ٹائم)' : 'Clinic & lab hours (PKT)'}
              </h2>
              <dl className="divide-y divide-rule text-[14px] tabular-nums">
                <div className="py-2 flex justify-between gap-2">
                  <dt className="text-ink-2">{language === 'ur' ? 'او پی ڈی (پیر تا ہفتہ)' : 'Specialist OPD (Mon–Sat)'}</dt>
                  <dd className="font-semibold text-ink">09:00 AM – 09:00 PM</dd>
                </div>
                <div className="py-2 flex justify-between gap-2">
                  <dt className="text-ink-2">{language === 'ur' ? 'نہار منہ لیب سیمپلنگ' : 'Fasting Lab (Mon–Sat)'}</dt>
                  <dd className="font-semibold text-ink">08:00 AM – 09:30 PM</dd>
                </div>
                <div className="py-2 flex justify-between gap-2">
                  <dt className="text-ink-2">{language === 'ur' ? 'اتوار (Sunday)' : 'Sunday'}</dt>
                  <dd className="font-semibold text-signal">
                    {language === 'ur' ? 'صرف لیب 09:00–14:00' : 'Lab only 09:00 AM – 02:00 PM'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-danger-bg border border-danger-border rounded-md p-5 space-y-2">
              <div className="flex items-center gap-2 text-danger font-bold text-[15px]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <h3>{language === 'ur' ? 'ایمرجنسی کی صورت میں' : 'If you need urgent medical help'}</h3>
              </div>
              <p className="text-[14px] text-ink-2 leading-relaxed">{t(CLINIC_INFO.emergencyNotice)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPACT RULED FAQ LIST (NO CARDS) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="border-t border-ink pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-[24px] font-bold text-ink tracking-[-0.015em]">
              {language === 'ur' ? 'عام سوالات' : 'Common questions'}
            </h2>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              {language === 'ur'
                ? 'اپائنٹمنٹ، لیب ٹیسٹ کی تیاری اور پرائیویسی سے متعلق مختصر جوابات۔'
                : 'Plain answers on requesting a slot, fasting requirements, fees, and how this demo handles data.'}
            </p>
            <Link
              to="/patient-info"
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-action hover:underline underline-offset-4"
            >
              <span>{language === 'ur' ? 'مکمل گائیڈ اور پرائیویسی نوٹس' : 'Full patient guide & privacy notice'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="lg:col-span-8 divide-y divide-rule border-y border-rule">
            {homeFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-4 text-start flex items-center justify-between gap-4 hover:text-action transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-ink">{t(faq.question)}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-action shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-ink-3 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pb-4 text-[14px] text-ink-2 leading-relaxed max-w-[68ch]">
                      {t(faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
