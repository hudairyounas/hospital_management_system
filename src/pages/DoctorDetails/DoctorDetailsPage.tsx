import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Languages,
  ShieldAlert,
  MapPin,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOCTORS } from '../../data/doctors';
import { DEPARTMENTS } from '../../data/departments';
import { formatPKR } from '../../lib/validation';
import {
  WING_META,
  isDoctorAvailableToday,
  getDoctorNextSessionSummary,
} from '../../lib/schedule';
import { DoctorMonogramPlaque } from '../../components/shared/WayfindingVisuals';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { DoctorCard } from '../../components/doctors/DoctorCard';
import { SEOHead } from '../../components/shared/SEOHead';

export const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t, openWhatsAppModal } = useApp();

  const doctor = DOCTORS.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-[24px] font-bold text-ink">
          {language === 'ur' ? 'ڈاکٹر کا پروفائل نہیں ملا' : 'Consultant Profile Not Found'}
        </h1>
        <p className="text-[15px] text-ink-2">
          {language === 'ur'
            ? 'مطلوبہ ڈاکٹر کا ریکارڈ ڈیمو ڈائریکٹری میں موجود نہیں ہے۔'
            : 'The requested consultant ID does not exist in our fictional demo directory.'}
        </p>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded bg-action text-surface text-[14px] font-semibold"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ur' ? 'ڈاکٹرز کی فہرست پر واپس جائیں' : 'Return to Doctors Directory'}</span>
        </Link>
      </div>
    );
  }

  const department = DEPARTMENTS.find((dept) => dept.slug === doctor.departmentSlug);
  const wing = WING_META[doctor.departmentSlug];
  const inToday = isDoctorAvailableToday(doctor);
  const nextSession = getDoctorNextSessionSummary(doctor, language);
  const peerDoctors = DOCTORS.filter(
    (d) => d.departmentSlug === doctor.departmentSlug && d.id !== doctor.id
  );

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={`${t(doctor.name)} — ${t(doctor.title)}`}
        description={`${t(doctor.name)} (${doctor.qualifications}) fictional demo profile, PKT outpatient schedule, and consultation fee at Noor Medical Centre Lahore.`}
      />

      <Breadcrumbs
        items={[
          { label: language === 'ur' ? 'ماہر ڈاکٹرز' : 'Doctors', to: '/doctors' },
          { label: t(doctor.name) },
        ]}
      />

      {/* Fictional Profile Notice */}
      <div className="mt-2 mb-6 p-3.5 rounded bg-signal-bg border border-signal-border/40 flex items-start gap-3 text-[13px] text-ink-2">
        <ShieldAlert className="w-4 h-4 text-signal shrink-0 mt-0.5" />
        <p>
          <strong className="text-signal">
            {language === 'ur' ? 'فرضی ڈیمو پروفائل:' : 'Fictional Demonstration Profile Notice:'}
          </strong>{' '}
          {language === 'ur'
            ? `${t(doctor.name)}، ان کی اسناد (${doctor.qualifications}) اور رجسٹریشن نمبر (${doctor.pmdcDemoNumber}) صرف فرنٹ اینڈ شوکیس کے لیے فرضی ہیں۔`
            : `${doctor.name.en}, qualifications (${doctor.qualifications}), and registration ID (${doctor.pmdcDemoNumber}) are fictional demo content.`}
        </p>
      </div>

      {/* Asymmetric Consultant Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-8">
          <div
            className="bg-surface border border-rule-strong rounded-md p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-start"
            style={{ borderTop: `4px solid ${wing.color}` }}
          >
            <DoctorMonogramPlaque doctor={doctor} size="lg" />

            <div className="flex-1 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                {department && (
                  <Link
                    to={`/departments/${department.slug}`}
                    className="text-[13px] font-semibold px-2.5 py-0.5 rounded-sm hover:underline underline-offset-2"
                    style={{ backgroundColor: wing.softBg, color: wing.color }}
                  >
                    {t(department.name)}
                  </Link>
                )}
                {inToday && (
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-0.5 rounded-sm bg-signal-bg text-signal">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                    {language === 'ur' ? 'آج او پی ڈی میں' : 'In clinic today'}
                  </span>
                )}
              </div>

              <h1 className="text-[26px] sm:text-[32px] font-bold text-ink tracking-[-0.02em] leading-tight">
                {t(doctor.name)}
              </h1>
              <p className="text-[15px] font-medium text-ink-2">{t(doctor.title)}</p>
              <p className="text-[13px] text-ink-3 tabular-nums">
                {doctor.qualifications} · ID: {doctor.pmdcDemoNumber}
              </p>

              <div className="pt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-[14px] text-ink-2">
                <span>
                  {language === 'ur'
                    ? `${doctor.experienceYears} سالہ تجربہ (ڈیمو)`
                    : `${doctor.experienceYears} years experience (demo)`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-ink-3" />
                  <span>{doctor.languages.join(', ')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Schedule Table */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between pb-2 border-b border-ink">
              <h2 className="text-[20px] font-bold text-ink">
                {language === 'ur' ? 'ہفتہ وار او پی ڈی اوقات (PKT)' : 'Weekly Outpatient Schedule (PKT)'}
              </h2>
              <span className="text-[13px] text-ink-3 tabular-nums">UTC+05:00</span>
            </div>

            <div className="overflow-x-auto bg-surface border border-rule-strong rounded-md">
              <table className="w-full text-start border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-rule-strong bg-tint text-ink-2 text-[13px]">
                    <th className="py-3 px-4 text-start font-semibold">
                      {language === 'ur' ? 'ایام' : 'OPD days'}
                    </th>
                    <th className="py-3 px-4 text-start font-semibold">
                      {language === 'ur' ? 'وقت (PKT)' : 'Session window (PKT)'}
                    </th>
                    <th className="py-3 px-4 text-start font-semibold">
                      {language === 'ur' ? 'کمرہ' : 'Room / wing'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {doctor.schedule.map((slot, idx) => (
                    <tr key={idx}>
                      <td className="py-3.5 px-4 font-semibold text-ink">{t(slot.daysLabel)}</td>
                      <td className="py-3.5 px-4 font-semibold text-ink tabular-nums">
                        {slot.timeRangePKT}
                      </td>
                      <td className="py-3.5 px-4 text-ink-2">{slot.roomNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Biography & Focus */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-ink">
                {language === 'ur' ? 'تعارف اور کلینیکل دائرہ کار' : 'Clinical profile'}
              </h2>
              <p className="text-[15px] text-ink-2 leading-relaxed max-w-[68ch]">
                {t(doctor.biography)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-rule">
              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3">
                  {language === 'ur' ? 'خصوصی طبی شعبے' : 'Areas of clinical focus'}
                </h3>
                <ul className="divide-y divide-rule border-y border-rule text-[14px] text-ink-2">
                  {doctor.clinicalFocus.map((focus, idx) => (
                    <li key={idx} className="py-2.5">
                      {t(focus)}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3">
                  {language === 'ur' ? 'تعلیمی پس منظر (فرضی ڈیمو)' : 'Academic record (fictional demo)'}
                </h3>
                <ul className="divide-y divide-rule border-y border-rule text-[14px] text-ink-2">
                  {doctor.educationHistory.map((edu, idx) => (
                    <li key={idx} className="py-2.5">
                      {t(edu)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Right 4 Cols: Sticky Booking Sheet */}
        <aside className="lg:col-span-4">
          <div className="bg-surface border border-rule-strong rounded-md p-6 space-y-5 sticky top-24">
            <div className="pb-4 border-b border-rule flex items-baseline justify-between">
              <div>
                <p className="text-[13px] text-ink-3">
                  {language === 'ur' ? 'مشاورتی فیس (ڈیمو)' : 'Outpatient consultation fee'}
                </p>
                <p className="text-[26px] font-bold text-ink tabular-nums mt-0.5">
                  {formatPKR(doctor.consultationFeePKR)}
                </p>
              </div>
              <span className="text-[13px] font-semibold text-ink-3">PKR</span>
            </div>

            <div className="space-y-3 text-[14px] text-ink-2">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-ink-3 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-ink">
                    {language === 'ur' ? 'اگلا او پی ڈی سیشن:' : 'Next session:'}
                  </p>
                  <p className="tabular-nums">{nextSession}</p>
                </div>
              </div>

              {department && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-ink-3 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-ink">
                      {language === 'ur' ? 'کیمپس لوکیشن:' : 'Location in building:'}
                    </p>
                    <p>{t(department.floorLocation)}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                to={`/appointment?department=${doctor.departmentSlug}&doctor=${doctor.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded bg-action hover:bg-action-hover text-surface text-[15px] font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {language === 'ur'
                    ? `${t(doctor.name)} سے بک کریں`
                    : `Book with ${doctor.name.en}`}
                </span>
              </Link>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppModal(
                    `Assalam-o-Alaikum Noor Medical Centre (Demo), I would like to inquire about an appointment with ${doctor.name.en} (${doctor.specialtyLabel.en}).`,
                    `Profile Inquiry: ${doctor.name.en}`
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded border border-ink hover:bg-tint text-ink text-[14px] font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ur' ? 'واٹس ایپ استفسار' : 'WhatsApp inquiry'}</span>
              </button>
            </div>

            <p className="text-[13px] text-ink-3 pt-2 border-t border-rule">
              {language === 'ur'
                ? 'بکنگ بٹن دبانے سے فارم میں یہ ڈاکٹر اور ان کا شعبہ خودکار منتخب ہو جائے گا۔'
                : 'Pre-selects this consultant and department in our simulated booking form.'}
            </p>
          </div>
        </aside>
      </div>

      {/* Peer Consultants in Same Department */}
      {peerDoctors.length > 0 && (
        <section className="mt-14 pt-8 border-t border-rule">
          <h2 className="text-[20px] font-bold text-ink mb-4">
            {language === 'ur'
              ? 'اسی شعبے کے دیگر کنسلٹنٹ ڈاکٹرز'
              : `Other specialists in ${department ? department.name.en : 'this department'}`}
          </h2>
          <div className="border border-rule-strong rounded-md overflow-hidden bg-surface">
            {peerDoctors.map((peer) => (
              <DoctorCard key={peer.id} doctor={peer} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
