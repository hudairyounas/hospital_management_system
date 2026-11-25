import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';
import { Doctor } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPKR } from '../../lib/validation';
import {
  ALL_OPD_DAYS,
  DAY_SHORT,
  WING_META,
  getCurrentWeekdayPKT,
  isDoctorAvailableToday,
  getDoctorNextSessionSummary,
  getDoctorRoomShort,
} from '../../lib/schedule';
import { DoctorMonogramPlaque } from '../shared/WayfindingVisuals';

interface DoctorCardProps {
  doctor: Doctor;
}

/**
 * Architectural directory roster row (replaces repetitive tall rounded SaaS cards).
 * Displays consultant monogram plaque, clinical wing colour bar, Mon–Sat availability matrix,
 * computed real-time next OPD session, tabular PKR fee, and clear actions.
 */
export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { language, t, openWhatsAppModal } = useApp();
  const wing = WING_META[doctor.departmentSlug];
  const today = getCurrentWeekdayPKT();
  const inToday = isDoctorAvailableToday(doctor);
  const nextSession = getDoctorNextSessionSummary(doctor, language);
  const room = getDoctorRoomShort(doctor.schedule[0]?.roomNumber || '');

  return (
    <article
      className="bg-surface border-b border-rule hover:bg-paper/70 transition-colors px-4 sm:px-5 py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center"
      style={{ borderInlineStart: `3px solid ${wing.color}` }}
    >
      {/* Identity & Credentials (5 cols) */}
      <div className="lg:col-span-5 flex items-start gap-3.5 min-w-0">
        <Link
          to={`/doctors/${doctor.id}`}
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-action rounded"
          aria-label={`View profile for ${doctor.name.en}`}
        >
          <DoctorMonogramPlaque doctor={doctor} size="md" />
        </Link>

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="text-[17px] font-bold text-ink leading-snug">
              <Link
                to={`/doctors/${doctor.id}`}
                className="hover:text-action underline-offset-4 hover:underline"
              >
                {t(doctor.name)}
              </Link>
            </h3>
            {inToday && (
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2 py-0.5 rounded bg-signal-bg text-signal">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
                {language === 'ur' ? 'آج کلینک میں' : 'In clinic today'}
              </span>
            )}
          </div>

          <p className="text-[14px] text-ink-2">
            {t(doctor.title)} · <span style={{ color: wing.color }} className="font-medium">{t(doctor.specialtyLabel)}</span>
          </p>

          <p className="text-[13px] text-ink-3">
            {doctor.qualifications} · {doctor.languages.join(', ')}
          </p>
        </div>
      </div>

      {/* Mon–Sat Schedule Grid & Next Session (4 cols) */}
      <div className="lg:col-span-4 space-y-2">
        <div
          className="grid grid-cols-6 gap-1 max-w-[240px]"
          aria-label={`Weekly OPD days for ${doctor.name.en}`}
        >
          {ALL_OPD_DAYS.map((day) => {
            const active = doctor.availableDays.includes(day);
            const isToday = day === today;
            return (
              <span
                key={day}
                title={`${day}: ${active ? 'OPD open' : 'Off'}`}
                className={`text-center py-1 rounded-sm text-[12px] font-semibold tabular-nums border ${
                  active && isToday
                    ? 'bg-signal-bg border-signal-border text-signal'
                    : active
                    ? 'bg-tint border-rule-strong text-ink'
                    : 'bg-surface border-rule text-ink-3/45'
                }`}
              >
                {language === 'ur' ? DAY_SHORT[day].ur.slice(0, 1) : DAY_SHORT[day].en}
              </span>
            );
          })}
        </div>

        <p className="text-[13px] text-ink-2 tabular-nums">
          <span className="font-semibold text-ink">{nextSession}</span>
          <span className="text-ink-3"> · {room}</span>
        </p>
      </div>

      {/* Fee & Actions (3 cols) */}
      <div className="lg:col-span-3 flex flex-wrap lg:flex-col lg:items-end justify-between gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-rule">
        <div className="lg:text-end">
          <span className="text-[12px] text-ink-3 block">
            {language === 'ur' ? 'مشاورتی فیس (ڈیمو)' : 'Consultation fee'}
          </span>
          <span className="text-[17px] font-bold text-ink tabular-nums">
            {formatPKR(doctor.consultationFeePKR)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/appointment?department=${doctor.departmentSlug}&doctor=${doctor.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 min-h-[40px] rounded bg-action hover:bg-action-hover text-surface text-[13px] font-semibold transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'بک کریں' : 'Book'}</span>
          </Link>

          <Link
            to={`/doctors/${doctor.id}`}
            className="inline-flex items-center px-3 min-h-[40px] rounded border border-rule-strong hover:bg-tint text-ink text-[13px] font-semibold transition-colors"
          >
            {language === 'ur' ? 'پروفائل' : 'Profile'}
          </Link>

          <button
            type="button"
            onClick={() =>
              openWhatsAppModal(
                `Assalam-o-Alaikum, I would like to inquire about OPD appointment availability for ${doctor.name.en} (${doctor.specialtyLabel.en}).`,
                `Consultant Inquiry: ${doctor.name.en}`
              )
            }
            aria-label={`Prepare WhatsApp inquiry for ${doctor.name.en}`}
            className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded border border-rule-strong hover:bg-tint text-ink-2"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
