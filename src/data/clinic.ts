import { FAQItem, FacilityWing } from '../types';

export const CLINIC_INFO = {
  name: {
    en: 'Noor Medical & Diagnostic Centre',
    ur: 'نور میڈیکل اینڈ ڈائیگناسٹک سینٹر',
  },
  shortName: {
    en: 'Noor Medical Centre',
    ur: 'نور میڈیکل سینٹر',
  },
  subtitle: {
    en: 'Multi-Specialty Outpatient Hospital, Dental Suite & Diagnostic Lab',
    ur: 'ملٹی اسپیشلٹی آؤٹ پیشنٹ ہسپتال، ڈینٹل سویٹ اور ڈائیگناسٹک لیبارٹری',
  },
  demoBadge: {
    en: 'Fictional Portfolio Demo — Not an Active Medical Facility',
    ur: 'فرضی پورٹ فولیو ڈیمو — یہ حقیقی ہسپتال نہیں ہے',
  },
  city: {
    en: 'Lahore, Pakistan',
    ur: 'لاہور، پاکستان',
  },
  address: {
    en: 'Plot 42-B, Main Boulevard, Gulberg III, Lahore, Punjab 54660 (Fictional Demo Campus)',
    ur: 'پلاٹ 42-B، مین بلیوارڈ، گلبرگ III، لاہور (فرضی ڈیمو پتہ)',
  },
  landmark: {
    en: 'Adjacent to Fictional Courtyard Square, 400m from Liberty Roundabout Corridor (Demo Location)',
    ur: 'نزد لبرٹی راؤنڈ اباؤٹ کوریڈور، گلبرگ تھری، لاہور (ڈیمو لوکیشن)',
  },
  phoneDisplay: '+92 42 3555 0199 (Demo)',
  phoneRaw: '+92 42 3555 0199',
  mobileDisplay: '+92 300 0000199 (Demo Placeholder)',
  emailDisplay: 'care.demo@noormedical.example.pk',
  whatsappConfigStatus: 'DEMO_PLACEHOLDER_MODE',
  timezone: 'PKT (UTC+05:00)',
  hours: {
    opd: {
      days: { en: 'Monday – Saturday', ur: 'پیر تا ہفتہ' },
      time: '09:00 AM – 09:00 PM PKT',
    },
    diagnostics: {
      days: { en: 'Monday – Saturday (Fasting Lab Collection)', ur: 'پیر تا ہفتہ (نہار منہ لیب سیمپلنگ)' },
      time: '08:00 AM – 09:30 PM PKT',
    },
    sunday: {
      days: { en: 'Sunday', ur: 'اتوار' },
      time: {
        en: 'Routine OPD Closed • Diagnostic Lab Open 09:00 AM – 02:00 PM PKT',
        ur: 'او پی ڈی بند • لیبارٹری صبح 09:00 تا دوپہر 02:00 بجے کھلی ہے',
      },
    },
  },
  emergencyNotice: {
    en: 'Noor Medical Centre is a fictional outpatient demonstration website. For real medical emergencies in Pakistan, dial Rescue 1122 immediately or proceed to the nearest hospital Emergency Department.',
    ur: 'نور میڈیکل سینٹر ایک فرضی آؤٹ پیشنٹ ڈیمو ویب سائٹ ہے۔ کسی بھی حقیقی طبی ایمرجنسی کی صورت میں فوری طور پر ریسکیو ۱۱۲۲ پر کال کریں یا قریبی ہسپتال کے ایمرجنسی روم سے رجوع کریں۔',
  },
};

export const DEMO_TIME_SLOTS = [
  {
    id: 'morning-early',
    label: {
      en: '09:30 AM – 11:30 AM PKT (Morning Session)',
      ur: 'صبح 09:30 تا 11:30 بجے (مارننگ سیشن)',
    },
    short: '09:30 AM – 11:30 AM PKT',
  },
  {
    id: 'midday',
    label: {
      en: '12:00 PM – 02:30 PM PKT (Midday Session)',
      ur: 'دوپہر 12:00 تا 02:30 بجے (مڈ ڈے سیشن)',
    },
    short: '12:00 PM – 02:30 PM PKT',
  },
  {
    id: 'afternoon',
    label: {
      en: '03:30 PM – 05:30 PM PKT (Afternoon Session)',
      ur: 'سہ پہر 03:30 تا 05:30 بجے (آفٹرنون سیشن)',
    },
    short: '03:30 PM – 05:30 PM PKT',
  },
  {
    id: 'evening',
    label: {
      en: '06:00 PM – 08:30 PM PKT (Evening Family OPD)',
      ur: 'شام 06:00 تا 08:30 بجے (ایوننگ فیملی او پی ڈی)',
    },
    short: '06:00 PM – 08:30 PM PKT',
  },
];

export const FACILITY_WINGS: FacilityWing[] = [
  {
    id: 'courtyard-reception',
    name: {
      en: 'Shaded Courtyard Reception & Triage Desk',
      ur: 'کشادہ استقبالیہ اور مریضوں کی رہنمائی کا کاؤنٹر',
    },
    floor: { en: 'Ground Floor — Main Atrium', ur: 'گراؤنڈ فلور — مرکزی ایٹریم' },
    summary: {
      en: 'Step-free access from Main Boulevard drop-off with daylight-filled waiting zones, clear Urdu/English signage, and separate queuing for senior citizens.',
      ur: 'بزرگوں اور وہیل چیئر مریضوں کے لیے بغیر سیڑھیوں کے آسان رسائی، اردو اور انگریزی میں واضح سائن بورڈز اور پرسکون انتظار گاہ۔',
    },
    features: [
      { en: 'Complimentary wheelchair assistance at entrance', ur: 'مرکزی دروازے پر مفت وہیل چیئر کی سہولت' },
      { en: 'Digital token display without loud intercom noise', ur: 'بغیر شور کے ڈیجیٹل ٹوکن ڈسپلے سسٹم' },
      { en: 'Dedicated pharmacy & prescription explanation counter', ur: 'ادویات کے استعمال کی وضاحت کے لیے فارمیسی ڈیسک' },
    ],
    visualType: 'courtyard',
  },
  {
    id: 'diagnostic-atrium',
    name: {
      en: 'Pathology Sample Booths & Ultrasound Imaging',
      ur: 'پیتھالوجی سیمپل بوتھ اور الٹراساؤنڈ یونٹ',
    },
    floor: { en: 'Ground Floor — West Wing', ur: 'گراؤنڈ فلور — ویسٹ ونگ' },
    summary: {
      en: 'Private phlebotomy booths for fasting blood tests, digital 12-lead ECG room, and high-resolution ultrasound suites staffed by female and male sonographers.',
      ur: 'خون کے نمونوں کے لیے علیحدہ کیبن، ڈیجیٹل ای سی جی روم اور مرد و خواتین سونوگرافرز کی نگرانی میں الٹراساؤنڈ۔',
    },
    features: [
      { en: 'Opens at 8:00 AM daily for overnight fasting blood work', ur: 'نہار منہ ٹیسٹوں کے لیے روزانہ صبح ۸ بجے آغاز' },
      { en: 'Barcode-labelled vacutainer tracking at sample draw', ur: 'سیمپل لیتے وقت کمپیوٹرائزڈ بارکوڈ لیبلنگ' },
      { en: 'Female ultrasound waiting lounge for privacy', ur: 'خواتین کے الٹراساؤنڈ کے لیے علیحدہ باپردہ ویٹنگ ایریا' },
    ],
    visualType: 'diagnostics',
  },
  {
    id: 'dental-suite',
    name: {
      en: 'Class-B Sterilized Dental & Endodontic Suite',
      ur: 'کلاس بی جراثیم کش ڈینٹل اور روٹ کینال سویٹ',
    },
    floor: { en: 'First Floor — West Wing', ur: 'فرسٹ فلور — ویسٹ ونگ' },
    summary: {
      en: 'Four acoustic-insulated dental treatment suites featuring chairside digital X-ray sensors and visible sterilization pouch verification.',
      ur: 'چار جدید ڈینٹل ٹریٹمنٹ رومز جہاں مریض کے سامنے سیل شدہ جراثیم سے پاک آلات کھولے جاتے ہیں۔',
    },
    features: [
      { en: '3-stage ultrasonic, thermal, and Class-B vacuum autoclaving', ur: 'تین مراحل پر مشتمل جدید آٹوکلیو اسٹیریلائزیشن' },
      { en: 'Written PKR cost breakdown provided before treatment begins', ur: 'علاج شروع کرنے سے پہلے اخراجات کی تحریری تفصیل' },
    ],
    visualType: 'dental',
  },
  {
    id: 'consultation-chambers',
    name: {
      en: 'Acoustic-Private Specialist Consultation Chambers',
      ur: 'ماہر ڈاکٹرز کے پرسکون مشاورتی کمرے',
    },
    floor: { en: 'Ground & First Floors', ur: 'گراؤنڈ اور فرسٹ فلور' },
    summary: {
      en: 'Designed for one-patient-at-a-time privacy so families can discuss health concerns calmly without hallway interruptions.',
      ur: 'ایک وقت میں صرف ایک مریض کے معائنے کا اصول تاکہ آپ مکمل رازداری اور اطمینان سے ڈاکٹر سے بات کر سکیں۔',
    },
    features: [
      { en: 'Strict single-family entry policy for patient dignity', ur: 'مریض کی رازداری کے لیے کمرے میں غیر متعلقہ افراد کا داخلہ ممنوع' },
      { en: 'Separate Pediatric feeding and diaper room nearby', ur: 'بچوں کے شعبے کے قریب علیحدہ بے بی فیڈنگ روم' },
    ],
    visualType: 'consultation',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments',
    question: {
      en: 'How can I request an appointment with a specialist?',
      ur: 'میں کسی ماہر ڈاکٹر سے اپائنٹمنٹ کیسے حاصل کر سکتا ہوں؟',
    },
    answer: {
      en: 'You can use our online Appointment Request form to select a department, choose a specific consultant, pick a preferred future date and PKT time slot, and receive an instant demo reference slip. Because this website is a frontend showcase, all submitted requests are clearly marked as simulated demo bookings.',
      ur: 'آپ ہماری ویب سائٹ پر "اپائنٹمنٹ بک کریں" فارم کے ذریعے شعبہ، ڈاکٹر، تاریخ اور وقت منتخب کر کے فوری ڈیمو ریفرنس سلپ حاصل کر سکتے ہیں۔ واضح رہے کہ یہ ایک فرضی ڈیمو ویب سائٹ ہے، اس لیے کوئی حقیقی اپائنٹمنٹ بک نہیں ہوتی۔',
    },
  },
  {
    id: 'faq-2',
    category: 'Appointments',
    question: {
      en: 'Can I request a specific female or male doctor, or filter by language?',
      ur: 'کیا میں اپنی مرضی کے مرد یا خاتون ڈاکٹر یا زبان کے مطابق انتخاب کر سکتا ہوں؟',
    },
    answer: {
      en: 'Yes. On the Doctors Directory page, you can search by doctor name, filter by medical department, filter by day of availability, or filter by spoken language (Urdu, English, Punjabi). Clicking "Book Consultation" on any doctor card automatically pre-selects that consultant in the appointment form.',
      ur: 'جی ہاں۔ ڈاکٹرز ڈائریکٹری میں آپ شعبہ، دن یا زبان (اردو، انگریزی، پنجابی) کے لحاظ سے ڈاکٹر تلاش کر سکتے ہیں۔ کسی بھی ڈاکٹر کے کارڈ پر بکنگ بٹن دبانے سے فارم میں وہی ڈاکٹر خودکار طور پر منتخب ہو جاتا ہے۔',
    },
  },
  {
    id: 'faq-3',
    category: 'Hours & Location',
    question: {
      en: 'What are the clinic timings and diagnostic lab sample collection hours?',
      ur: 'کلینک اور لیبارٹری کے اوقاتِ کار کیا ہیں؟',
    },
    answer: {
      en: 'Specialist Outpatient Clinics (OPD) operate Monday through Saturday from 09:00 AM to 09:00 PM Pakistan Standard Time (PKT). Fasting blood sample collection at the Diagnostic Lab opens early at 08:00 AM Monday through Saturday, and 09:00 AM to 02:00 PM on Sundays.',
      ur: 'ماہر ڈاکٹرز کی او پی ڈی پیر تا ہفتہ صبح ۹ بجے سے رات ۹ بجے تک کھلی رہتی ہے۔ نہار منہ بلڈ ٹیسٹوں کے لیے لیبارٹری پیر تا ہفتہ صبح ۸ بجے اور اتوار کو صبح ۹ تا دوپہر ۲ بجے تک کھلی رہتی ہے۔',
    },
  },
  {
    id: 'faq-4',
    category: 'Fees & Diagnostics',
    question: {
      en: 'How much are specialist consultation fees and how are payments handled?',
      ur: 'ڈاکٹرز کی مشاورتی فیس کتنی ہے؟',
    },
    answer: {
      en: 'Indicative demo consultation fees are transparently listed in Pakistani Rupees (PKR) on every doctor profile and department page—ranging from Rs. 2,000 for Dental Consultations to Rs. 2,500–3,500 for Specialist Physicians. In this frontend demo, no online payment or card details are ever collected.',
      ur: 'ہر ڈاکٹر کے پروفائل اور شعبے کے صفحے پر فیس پاکستانی روپے (Rs.) میں واضح درج ہے، جو ڈینٹل چیک اپ کے لیے 2,000 روپے اور اسپیشلسٹ معائنے کے لیے 2,500 تا 3,500 روپے ہے۔ اس ڈیمو ویب سائٹ پر کوئی آن لائن ادائیگی یا بینک کارڈ طلب نہیں کیا جاتا۔',
    },
  },
  {
    id: 'faq-5',
    category: 'Fees & Diagnostics',
    question: {
      en: 'Which blood tests or ultrasounds require overnight fasting?',
      ur: 'کون سے بلڈ ٹیسٹ یا الٹراساؤنڈ کے لیے نہار منہ آنا ضروری ہے؟',
    },
    answer: {
      en: 'Fasting Lipid Profile (Cholesterol) and Fasting Blood Sugar require 10 to 12 hours of overnight fasting (plain water is permitted). Upper abdominal ultrasounds (for liver and gallbladder assessment) typically require 6 hours of fasting. Routine CBC, HbA1c, and Dengue NS1 do not require fasting.',
      ur: 'کولیسٹرول (Lipid Profile) اور فاسٹنگ شوگر ٹیسٹ کے لیے ۱۰ سے ۱۲ گھنٹے نہار منہ رہنا ضروری ہے (سادہ پانی پی سکتے ہیں)۔ پیٹ اور پتے کے الٹراساؤنڈ کے لیے ۶ گھنٹے خالی پیٹ آنا بہتر ہے، جبکہ سی بی سی اور HbA1c کے لیے خالی پیٹ ہونا ضروری نہیں۔',
    },
  },
  {
    id: 'faq-6',
    category: 'Urgent Care & Privacy',
    question: {
      en: 'What should I do if someone needs urgent or emergency medical care?',
      ur: 'اگر کسی مریض کو فوری ایمرجنسی طبی امداد کی ضرورت ہو تو کیا کریں؟',
    },
    answer: {
      en: 'Do not use an online appointment form for urgent symptoms such as chest pain, severe breathing difficulty, high trauma, stroke symptoms, or acute pediatric distress. Immediately dial Pakistan’s emergency helpline 1122 or proceed directly to the nearest tertiary hospital 24/7 Emergency Department.',
      ur: 'سینے میں شدید درد، سانس کی تکلیف، حادثے یا کسی بھی ایمرجنسی کی صورت میں آن لائن فارم ہرگز استعمال نہ کریں۔ فوری طور پر ریسکیو ۱۱۲۲ پر کال کریں یا قریبی بڑے ہسپتال کے ۲۴ گھنٹے کھلے ایمرجنسی ڈیپارٹمنٹ تشریف لے جائیں۔',
    },
  },
  {
    id: 'faq-7',
    category: 'Urgent Care & Privacy',
    question: {
      en: 'Is my personal information sent to a server when I test the booking form?',
      ur: 'کیا اس ڈیمو فارم میں درج کی گئی معلومات کسی سرور پر بھیجی جاتی ہیں؟',
    },
    answer: {
      en: 'No. This application is a 100% client-side frontend demonstration. No backend server, database, or external API receives your entries. Simulated demo appointment slips are stored only in your own browser’s LocalStorage so you can test the interface, and you can clear them with one click at any time.',
      ur: 'ہرگز نہیں۔ یہ ویب سائٹ مکمل طور پر فرنٹ اینڈ ڈیمو ہے۔ آپ کی درج کردہ کوئی بھی معلومات کسی سرور یا ڈیٹا بیس کو نہیں بھیجی جاتیں بلکہ صرف آپ کے اپنے براؤزر میں ڈیمو ٹیسٹنگ کے لیے محفوظ ہوتی ہیں جنہیں آپ ایک کلک سے ختم کر سکتے ہیں۔',
    },
  },
];
