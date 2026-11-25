export type Language = 'en' | 'ur';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type DepartmentSlug =
  | 'general-medicine'
  | 'cardiology'
  | 'pediatrics'
  | 'dentistry'
  | 'gynecology'
  | 'orthopedics'
  | 'dermatology'
  | 'diagnostics';

export interface BilingualText {
  en: string;
  ur: string;
}

export interface ClinicalService {
  id: string;
  departmentSlug: DepartmentSlug;
  name: BilingualText;
  description: BilingualText;
  feePKR: number;
  durationMinutes: number;
  preparationNote?: BilingualText;
  category: 'Consultation' | 'Diagnostic' | 'Procedure' | 'Dental';
}

export interface Department {
  slug: DepartmentSlug;
  name: BilingualText;
  shortName: BilingualText;
  tagline: BilingualText;
  description: BilingualText;
  floorLocation: BilingualText;
  startingFeePKR: number;
  iconName:
    | 'Stethoscope'
    | 'HeartPulse'
    | 'Baby'
    | 'Smile'
    | 'ShieldCheck'
    | 'Bone'
    | 'Sparkles'
    | 'Microscope';
  highlights: BilingualText[];
  patientPreparation: BilingualText[];
  services: ClinicalService[];
}

export interface DoctorScheduleSlot {
  days: DayOfWeek[];
  daysLabel: BilingualText;
  timeRangePKT: string;
  roomNumber: string;
}

export interface Doctor {
  id: string;
  name: BilingualText;
  title: BilingualText;
  departmentSlug: DepartmentSlug;
  specialtyLabel: BilingualText;
  qualifications: string; // Explicitly marked with (Demo)
  pmdcDemoNumber: string; // e.g. DEMO-PMDC-40118-P
  experienceYears: number;
  gender: 'Female' | 'Male';
  languages: ('Urdu' | 'English' | 'Punjabi')[];
  consultationFeePKR: number;
  availableDays: DayOfWeek[];
  availableToday: boolean;
  nextSlotLabel: BilingualText;
  schedule: DoctorScheduleSlot[];
  clinicalFocus: BilingualText[];
  biography: BilingualText;
  educationHistory: BilingualText[];
  portraitTheme: {
    bgAccent: string;
    coatColor: string;
    scrubColor: string;
    skinTone: string;
    hairStyle: 'hijab-emerald' | 'hijab-sand' | 'short-beard' | 'classic-part' | 'silver-senior' | 'bob-glasses';
    hasGlasses?: boolean;
  };
}

export interface FAQItem {
  id: string;
  category: 'Appointments' | 'Hours & Location' | 'Fees & Diagnostics' | 'Urgent Care & Privacy';
  question: BilingualText;
  answer: BilingualText;
}

export interface DemoAppointmentRecord {
  referenceNumber: string;
  createdAtISO: string;
  departmentSlug: DepartmentSlug;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  consultationFeePKR: number;
  preferredDate: string;
  timeSlot: string;
  visitType: 'First Consultation' | 'Follow-up Review' | 'Diagnostic / Lab Visit';
  patientName: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface FacilityWing {
  id: string;
  name: BilingualText;
  floor: BilingualText;
  summary: BilingualText;
  features: BilingualText[];
  visualType: 'courtyard' | 'diagnostics' | 'dental' | 'consultation';
}
