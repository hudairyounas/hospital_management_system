import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS } from '../../data/departments';
import { DOCTORS } from '../../data/doctors';
import { formatPKR } from '../../lib/validation';
import { WING_META } from '../../lib/schedule';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { DoctorCard } from '../../components/doctors/DoctorCard';
import { SEOHead } from '../../components/shared/SEOHead';

export const DepartmentDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t, openWhatsAppModal } = useApp();

  const department = DEPARTMENTS.find((d) => d.slug === slug);

  if (!department) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-[24px] font-bold text-ink">
          {language === 'ur' ? 'مطلوبہ شعبہ نہیں ملا' : 'Department Not Found'}
        </h1>
        <Link
          to="/departments"
          className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded bg-action text-surface text-[14px] font-semibold"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ur' ? 'تمام شعبہ جات پر واپس جائیں' : 'Back to All Departments'}</span>
        </Link>
      </div>
    );
  }

  const wing = WING_META[department.slug];
  const departmentDoctors = DOCTORS.filter((doc) => doc.departmentSlug === department.slug);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={`${t(department.name)} — Services, Doctors & Fees`}
        description={`${t(department.name)} at Noor Medical Centre Lahore (Demo): explore procedures, PKR consultation fees, and specialist doctors.`}
      />

      <Breadcrumbs
        items={[
          { label: language === 'ur' ? 'شعبہ جات' : 'Departments', to: '/departments' },
          { label: t(department.name) },
        ]}
      />

      {/* Wing-Coloured Signage Header */}
      <header
        className="mt-2 bg-surface border border-rule-strong rounded-md p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        style={{ borderTop: `4px solid ${wing.color}` }}
      >
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
            <span
              className="font-bold px-2.5 py-0.5 rounded-sm tabular-nums"
              style={{ backgroundColor: wing.softBg, color: wing.color }}
            >
              {wing.wingCode} · {wing.roomRange}
            </span>
            <span className="text-ink-3">{t(department.floorLocation)}</span>
          </div>

          <h1 className="text-[28px] sm:text-[36px] font-bold text-ink tracking-[-0.02em] leading-[1.12]">
            {t(department.name)}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-ink-2 leading-relaxed">
            {t(department.description)}
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
          <Link
            to={`/appointment?department=${department.slug}`}
            className="inline-flex items-center justify-center gap-2 px-5 min-h-[46px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>
              {language === 'ur' ? 'اس شعبے میں بکنگ کریں' : `Book in ${department.shortName.en}`}
            </span>
          </Link>

          <button
            type="button"
            onClick={() =>
              openWhatsAppModal(
                `Assalam-o-Alaikum Noor Medical Centre (Demo), I have an inquiry regarding ${department.name.en} services and timings.`,
                `Department Inquiry: ${department.name.en}`
              )
            }
            className="inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded border border-ink hover:bg-tint text-ink text-[14px] font-semibold transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'ur' ? 'واٹس ایپ استفسار' : 'WhatsApp wing desk'}</span>
          </button>
        </div>
      </header>

      {/* Services Tariff + Capabilities & Prep */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-[20px] font-bold text-ink pb-2 border-b border-ink">
            {language === 'ur'
              ? 'سروسز، ٹیسٹ اور متوقع فیس (PKR)'
              : 'Services & indicative fee tariff (PKR)'}
          </h2>

          <div className="divide-y divide-rule border-b border-rule">
            {department.services.map((srv) => (
              <div
                key={srv.id}
                className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="text-[16px] font-bold text-ink">{t(srv.name)}</h3>
                  <p className="text-[14px] text-ink-2">{t(srv.description)}</p>
                  <p className="text-[13px] text-ink-3 tabular-nums">
                    {srv.category} · ~{srv.durationMinutes} min
                  </p>
                  {srv.preparationNote && (
                    <p className="text-[13px] text-signal pt-1 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{t(srv.preparationNote)}</span>
                    </p>
                  )}
                </div>

                <div className="sm:text-end shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <span className="text-[18px] font-bold text-ink tabular-nums">
                    {formatPKR(srv.feePKR)}
                  </span>
                  <Link
                    to={`/appointment?department=${department.slug}`}
                    className="text-[13px] font-semibold text-action hover:underline underline-offset-4"
                  >
                    {language === 'ur' ? 'اپائنٹمنٹ مانگیں' : 'Request slot'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h2 className="text-[18px] font-bold text-ink pb-2 border-b border-rule-strong">
              {language === 'ur' ? 'شعبے کی سہولیات' : 'What this wing covers'}
            </h2>
            <ul className="divide-y divide-rule border-b border-rule text-[14px] text-ink-2">
              {department.highlights.map((item, idx) => (
                <li key={idx} className="py-3">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-tint border border-rule-strong rounded-md p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-ink">
              {language === 'ur' ? 'آنے سے پہلے تیاری' : 'Before you arrive'}
            </h3>
            <ul className="space-y-2 text-[14px] text-ink-2">
              {department.patientPreparation.map((prep, idx) => (
                <li key={idx}>• {t(prep)}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Department Consultants Roster */}
      <section className="mt-12 pt-8 border-t border-rule">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[22px] font-bold text-ink">
            {language === 'ur'
              ? `${t(department.name)} کے ڈاکٹرز`
              : `Consultants in ${department.name.en}`}
          </h2>
          <Link to="/doctors" className="text-[14px] font-semibold text-action hover:underline underline-offset-4">
            {language === 'ur' ? 'تمام ۱۲ ڈاکٹرز دیکھیں' : 'All 12 doctors'}
          </Link>
        </div>

        <div className="border border-rule-strong rounded-md overflow-hidden bg-surface">
          {departmentDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>
    </div>
  );
};
