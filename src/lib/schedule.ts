import { DayOfWeek, DepartmentSlug, Doctor, DoctorScheduleSlot, Language } from '../types';

export const ALL_OPD_DAYS: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DAY_SHORT: Record<DayOfWeek, { en: string; ur: string }> = {
  Monday: { en: 'M', ur: 'پیر' },
  Tuesday: { en: 'T', ur: 'منگل' },
  Wednesday: { en: 'W', ur: 'بدھ' },
  Thursday: { en: 'T', ur: 'جمعرات' },
  Friday: { en: 'F', ur: 'جمعہ' },
  Saturday: { en: 'S', ur: 'ہفتہ' },
};

export const DAY_LABEL: Record<DayOfWeek | 'Sunday', { en: string; ur: string }> = {
  Monday: { en: 'Monday', ur: 'پیر' },
  Tuesday: { en: 'Tuesday', ur: 'منگل' },
  Wednesday: { en: 'Wednesday', ur: 'بدھ' },
  Thursday: { en: 'Thursday', ur: 'جمعرات' },
  Friday: { en: 'Friday', ur: 'جمعہ' },
  Saturday: { en: 'Saturday', ur: 'ہفتہ' },
  Sunday: { en: 'Sunday', ur: 'اتوار' },
};

export interface WingWayfindingMeta {
  color: string;
  softBg: string;
  floor: 'Ground Floor' | 'First Floor';
  floorUr: string;
  wingCode: string;
  roomRange: string;
}

export const WING_META: Record<DepartmentSlug, WingWayfindingMeta> = {
  'general-medicine': {
    color: '#1B5E5A',
    softBg: '#EBF3F2',
    floor: 'Ground Floor',
    floorUr: 'گراؤنڈ فلور',
    wingCode: 'GF · East',
    roomRange: 'G-01 – G-04',
  },
  pediatrics: {
    color: '#B7791F',
    softBg: '#FAF3E6',
    floor: 'Ground Floor',
    floorUr: 'گراؤنڈ فلور',
    wingCode: 'GF · Garden',
    roomRange: 'G-06 – G-08',
  },
  orthopedics: {
    color: '#4A5568',
    softBg: '#EFF1F4',
    floor: 'Ground Floor',
    floorUr: 'گراؤنڈ فلور',
    wingCode: 'GF · Step-Free',
    roomRange: 'G-10 – G-12',
  },
  diagnostics: {
    color: '#2F5D50',
    softBg: '#EDF3F1',
    floor: 'Ground Floor',
    floorUr: 'گراؤنڈ فلور',
    wingCode: 'GF · West Lab',
    roomRange: 'Booths 1–4',
  },
  cardiology: {
    color: '#9B2C2C',
    softBg: '#F9ECEC',
    floor: 'First Floor',
    floorUr: 'فرسٹ فلور',
    wingCode: '1F · Cardiac',
    roomRange: '101 – 104',
  },
  gynecology: {
    color: '#74427B',
    softBg: '#F4EEF5',
    floor: 'First Floor',
    floorUr: 'فرسٹ فلور',
    wingCode: '1F · South (All-Female)',
    roomRange: '108 – 111',
  },
  dentistry: {
    color: '#2B6CB0',
    softBg: '#EBF2FA',
    floor: 'First Floor',
    floorUr: 'فرسٹ فلور',
    wingCode: '1F · Dental Suite',
    roomRange: 'D-1 – D-4',
  },
  dermatology: {
    color: '#8C5A3C',
    softBg: '#F6EFEA',
    floor: 'First Floor',
    floorUr: 'فرسٹ فلور',
    wingCode: '1F · Skin Clinic',
    roomRange: '114 – 115',
  },
};

/**
 * Returns the current weekday name using Pakistan Standard Time (UTC+5) if Intl supports it,
 * falling back to local system date.
 */
export function getCurrentWeekdayPKT(): DayOfWeek | 'Sunday' {
  try {
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      timeZone: 'Asia/Karachi',
    }).format(new Date());
    if (
      weekday === 'Monday' ||
      weekday === 'Tuesday' ||
      weekday === 'Wednesday' ||
      weekday === 'Thursday' ||
      weekday === 'Friday' ||
      weekday === 'Saturday' ||
      weekday === 'Sunday'
    ) {
      return weekday;
    }
  } catch {
    // fallback below
  }
  const days: (DayOfWeek | 'Sunday')[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[new Date().getDay()];
}

export function isDoctorInClinicOnDay(doctor: Doctor, day: DayOfWeek | 'Sunday'): boolean {
  if (day === 'Sunday') return false;
  return doctor.availableDays.includes(day);
}

export function isDoctorAvailableToday(doctor: Doctor): boolean {
  return isDoctorInClinicOnDay(doctor, getCurrentWeekdayPKT());
}

export function getDoctorSlotForDay(
  doctor: Doctor,
  day: DayOfWeek | 'Sunday'
): DoctorScheduleSlot | null {
  if (day === 'Sunday') return null;
  return doctor.schedule.find((s) => s.days.includes(day)) || null;
}

export function getDoctorRoomShort(roomNumber: string): string {
  const match = roomNumber.match(/(?:Room|Suite)\s+([A-Z0-9-]+)/i);
  if (match) return match[1];
  if (/Imaging/i.test(roomNumber)) return 'Lab · GF';
  return roomNumber.split('(')[0].trim();
}

export function getDoctorInitials(englishName: string): string {
  const cleaned = englishName.replace(/^Dr\.?\s+/i, '').trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function getDoctorNextSessionSummary(doctor: Doctor, lang: Language): string {
  const today = getCurrentWeekdayPKT();
  const todaySlot = getDoctorSlotForDay(doctor, today);
  if (todaySlot) {
    return lang === 'ur'
      ? `آج (${DAY_LABEL[today].ur}) · ${todaySlot.timeRangePKT.replace(' PKT', '')}`
      : `Today · ${todaySlot.timeRangePKT.replace(' PKT', '')} PKT`;
  }

  // Find next upcoming day in Mon-Sat order
  const order: (DayOfWeek | 'Sunday')[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const startIdx = order.indexOf(today);
  for (let offset = 1; offset <= 7; offset++) {
    const candidate = order[(startIdx + offset) % 7];
    if (candidate !== 'Sunday') {
      const slot = getDoctorSlotForDay(doctor, candidate);
      if (slot) {
        return lang === 'ur'
          ? `اگلا سیشن: ${DAY_LABEL[candidate].ur} · ${slot.timeRangePKT.replace(' PKT', '')}`
          : `Next: ${candidate.slice(0, 3)} · ${slot.timeRangePKT.replace(' PKT', '')} PKT`;
      }
    }
  }
  const fallback = doctor.schedule[0];
  return fallback ? `${fallback.daysLabel[lang]} · ${fallback.timeRangePKT}` : '';
}
