import { Department } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    slug: 'general-medicine',
    name: {
      en: 'General & Internal Medicine',
      ur: 'جنرل اور انٹرنل میڈیسن',
    },
    shortName: {
      en: 'Internal Medicine',
      ur: 'انٹرنل میڈیسن',
    },
    tagline: {
      en: 'Adult primary care, chronic condition management, and preventive metabolic reviews.',
      ur: 'بالغ افراد کا ابتدائی علاج، شوگر و بلڈ پریشر کی نگرانی اور مکمل طبی معائنہ۔',
    },
    description: {
      en: 'Our Internal Medicine wing coordinates comprehensive outpatient care for adults—ranging from seasonal viral fevers and gastrointestinal complaints to long-term management of diabetes, hypertension, and thyroid disorders.',
      ur: 'ہمارا شعبہ انٹرنل میڈیسن بالغ مریضوں کے لیے جامع آؤٹ پیشنٹ علاج فراہم کرتا ہے، جس میں موسمی بخار، معدے کے مسائل، ذیابیطس، بلڈ پریشر اور تھائیرائیڈ کا مسلسل معائنہ شامل ہے۔',
    },
    floorLocation: {
      en: 'Ground Floor — East Courtyard Wing (Rooms G-01 to G-04)',
      ur: 'گراؤنڈ فلور — ایسٹ کورٹ یارڈ ونگ (کمرہ G-01 تا G-04)',
    },
    startingFeePKR: 2500,
    iconName: 'Stethoscope',
    highlights: [
      {
        en: 'Same-day consultation slots for acute fever, infection, and fatigue assessment',
        ur: 'بخار، انفیکشن اور کمزوری کے فوری معائنے کے لیے اسی دن اپائنٹمنٹ کی سہولت',
      },
      {
        en: 'Structured diabetes (HbA1c), blood pressure, and lipid management plans',
        ur: 'ذیابیطس، بلڈ پریشر اور کولیسٹرول کے مریضوں کے لیے منظم علاج اور رہنمائی',
      },
      {
        en: 'Direct coordination with on-site pathology lab for rapid blood work',
        ur: 'فوری بلڈ ٹیسٹ کے لیے سینٹر کی اپنی لیبارٹری کے ساتھ براہِ راست رابطہ',
      },
    ],
    patientPreparation: [
      {
        en: 'Bring your current medication list or photographs of medicine strips.',
        ur: 'اپنی موجودہ ادویات کی فہرست یا دوائی کے پتوں کی تصاویر ساتھ لائیں۔',
      },
      {
        en: 'If visiting for diabetes or cholesterol review, bring lab reports from the last 6 months.',
        ur: 'شوگر یا کولیسٹرول کے معائنے کے لیے پچھلے ۶ ماہ کی لیب رپورٹس ہمراہ لائیں۔',
      },
    ],
    services: [
      {
        id: 'gm-1',
        departmentSlug: 'general-medicine',
        name: {
          en: 'Consultant Physician Outpatient Review',
          ur: 'کنسلٹنٹ فزیشن آؤٹ پیشنٹ معائنہ',
        },
        description: {
          en: 'Detailed history, physical examination, vitals assessment, and prescription plan.',
          ur: 'مکمل طبی ہسٹری، جسمانی معائنہ، بلڈ پریشر چیک اپ اور نسخہ۔',
        },
        feePKR: 2500,
        durationMinutes: 20,
        category: 'Consultation',
      },
      {
        id: 'gm-2',
        departmentSlug: 'general-medicine',
        name: {
          en: 'Diabetes & Metabolic Foot/Nerve Screening',
          ur: 'ذیابیطس اور میٹابولک اسکریننگ پیکیج',
        },
        description: {
          en: 'Focused review of blood sugar logs, peripheral neuropathy check, and dietary guidance.',
          ur: 'شوگر ریکارڈ کا جائزہ، اعصابی معائنہ اور خوراک کی تفصیلی رہنمائی۔',
        },
        feePKR: 3200,
        durationMinutes: 30,
        preparationNote: {
          en: 'Bring your home glucometer log if available.',
          ur: 'اگر گھر پر شوگر چیک کرتے ہیں تو ریکارڈ ساتھ لائیں۔',
        },
        category: 'Consultation',
      },
      {
        id: 'gm-3',
        departmentSlug: 'general-medicine',
        name: {
          en: 'Annual Executive Adult Wellness Assessment',
          ur: 'سالانہ مکمل طبی ویلنس معائنہ',
        },
        description: {
          en: 'Comprehensive physician exam paired with baseline blood panel and ECG interpretation.',
          ur: 'فزیشن کے تفصیلی معائنے کے ساتھ بنیادی بلڈ ٹیسٹ اور ای سی جی کا جائزہ۔',
        },
        feePKR: 6500,
        durationMinutes: 45,
        preparationNote: {
          en: '10–12 hours overnight fasting recommended for accurate lipid and glucose readings.',
          ur: 'کولیسٹرول اور شوگر ٹیسٹ کے لیے ۱۰ سے ۱۲ گھنٹے نہار منہ آنا بہتر ہے۔',
        },
        category: 'Procedure',
      },
    ],
  },
  {
    slug: 'cardiology',
    name: {
      en: 'Cardiology & Vascular Care',
      ur: 'امراضِ قلب اور بلڈ پریشر (کارڈیالوجی)',
    },
    shortName: {
      en: 'Cardiology',
      ur: 'امراضِ قلب',
    },
    tagline: {
      en: 'Non-invasive cardiac diagnostics, hypertension clinics, and preventive heart evaluations.',
      ur: 'دل کے امراض کی تشخیص، ای سی جی، ایکو کارڈیوگرافی اور بلڈ پریشر کا مستند علاج۔',
    },
    description: {
      en: 'Our Cardiology unit offers calm, thorough outpatient cardiac evaluations supported by digital 12-lead ECG, 2D Color Doppler Echocardiography, and exercise tolerance testing for preventive and post-intervention heart care.',
      ur: 'ہمارا شعبہ امراضِ قلب جدید ڈیجیٹل ای سی جی، ایکو کارڈیوگرافی اور ماہر کارڈیالوجسٹس کی نگرانی میں دل اور بلڈ پریشر کے مریضوں کو تفصیلی آؤٹ پیشنٹ مشاورت فراہم کرتا ہے۔',
    },
    floorLocation: {
      en: 'First Floor — Cardiac Suite (Rooms 101 to 104)',
      ur: 'فرسٹ فلور — کارڈیک سویٹ (کمرہ 101 تا 104)',
    },
    startingFeePKR: 3500,
    iconName: 'HeartPulse',
    highlights: [
      {
        en: '12-Lead Digital ECG performed prior to consultant entry to save waiting time',
        ur: 'ڈاکٹر کے معائنے سے قبل ۱۲ لیڈ ڈیجیٹل ای سی جی کی سہولت تاکہ وقت کی بچت ہو',
      },
      {
        en: 'Consultant-performed 2D Color Doppler Echocardiography',
        ur: 'ماہر کارڈیالوجسٹ کے ذریعے ٹو ڈی کلر ڈاپلر ایکو کارڈیوگرافی',
      },
      {
        en: 'Dedicated management for resistant hypertension and palpitations',
        ur: 'پرانے بلڈ پریشر اور دل کی دھڑکن بےترتیب ہونے کا خصوصی معائنہ',
      },
    ],
    patientPreparation: [
      {
        en: 'Wear comfortable two-piece clothing for easy ECG or Echocardiography chest lead placement.',
        ur: 'ای سی جی اور ایکو ٹیسٹ میں آسانی کے لیے آرام دہ لباس زیب تن کریں۔',
      },
      {
        en: 'Note: For sudden severe chest pain or shortness of breath, go directly to the nearest Hospital Emergency Room or dial 1122.',
        ur: 'نوٹ: سینے میں شدید درد یا سانس کی تکلیف کی صورت میں فوری ۱۱۲۲ پر کال کریں یا قریبی ایمرجنسی روم جائیں۔',
      },
    ],
    services: [
      {
        id: 'card-1',
        departmentSlug: 'cardiology',
        name: {
          en: 'Specialist Cardiologist Consultation',
          ur: 'ماہر امراضِ قلب سے مشاورت',
        },
        description: {
          en: 'Comprehensive cardiovascular risk evaluation, medication review, and blood pressure profiling.',
          ur: 'دل کی صحت کا تفصیلی جائزہ، ادویات کی ترتیب اور بلڈ پریشر پروفائلنگ۔',
        },
        feePKR: 3500,
        durationMinutes: 25,
        category: 'Consultation',
      },
      {
        id: 'card-2',
        departmentSlug: 'cardiology',
        name: {
          en: 'Digital 12-Lead Electrocardiogram (ECG)',
          ur: 'ڈیجیٹل ۱۲ لیڈ ای سی جی (ECG)',
        },
        description: {
          en: 'Resting cardiac rhythm and electrical conduction trace with printed report.',
          ur: 'دل کی دھڑکن اور برقی لہروں کا فوری ٹیسٹ مع پرنٹڈ رپورٹ۔',
        },
        feePKR: 1200,
        durationMinutes: 15,
        category: 'Diagnostic',
      },
      {
        id: 'card-3',
        departmentSlug: 'cardiology',
        name: {
          en: '2D Color Doppler Echocardiography',
          ur: 'ٹو ڈی کلر ڈاپلر ایکو کارڈیوگرافی',
        },
        description: {
          en: 'Ultrasound imaging of heart chambers, valve function, and pumping efficiency.',
          ur: 'الٹراساؤنڈ کے ذریعے دل کے والوز اور پمپنگ کی صلاحیت کا مکمل معائنہ۔',
        },
        feePKR: 5500,
        durationMinutes: 35,
        category: 'Diagnostic',
      },
    ],
  },
  {
    slug: 'pediatrics',
    name: {
      en: 'Pediatrics & Child Healthcare',
      ur: 'امراضِ اطفال (بچوں کا شعبہ)',
    },
    shortName: {
      en: 'Pediatrics',
      ur: 'امراضِ اطفال',
    },
    tagline: {
      en: 'Newborn growth tracking, childhood illnesses, nutrition guidance, and vaccination counseling.',
      ur: 'نومولود اور بچوں کی نشوونما، موسمی بیماریوں، خوراک اور ویکسینیشن کی رہنمائی۔',
    },
    description: {
      en: 'Designed with a separate child-friendly waiting lounge to minimize cross-infection, our Pediatrics department supports parents from newborn wellness checks through adolescent developmental care.',
      ur: 'بچوں کے لیے علیحدہ اور محفوظ ویٹنگ لاؤنج کے ساتھ ہمارا شعبہ امراضِ اطفال نومولود بچوں سے لے کر بڑے بچوں تک کی نشوونما، خوراک اور موسمی بیماریوں کا تسلی بخش علاج فراہم کرتا ہے۔',
    },
    floorLocation: {
      en: 'Ground Floor — Garden Wing (Rooms G-06 to G-08)',
      ur: 'گراؤنڈ فلور — گارڈن ونگ (کمرہ G-06 تا G-08)',
    },
    startingFeePKR: 2800,
    iconName: 'Baby',
    highlights: [
      {
        en: 'Dedicated infant feeding room and sanitized pediatric waiting zone',
        ur: 'شیر خوار بچوں کے لیے مخصوص فیڈنگ روم اور صاف ستھرا ویٹنگ ایریا',
      },
      {
        en: 'Growth percentile charting (weight, height, head circumference) at every visit',
        ur: 'ہر وزٹ پر بچے کے وزن، قد اور نشوونما کا باقاعدہ چارٹ ریکارڈ',
      },
      {
        en: 'Evening OPD slots convenient for working parents and school-going children',
        ur: 'ملازمت پیشہ والدین اور اسکول جانے والے بچوں کے لیے شام کی او پی ڈی',
      },
    ],
    patientPreparation: [
      {
        en: 'Bring your child’s EPI / immunization card for growth and vaccine record verification.',
        ur: 'بچے کا حفاظتی ٹیکوں (ویکسینیشن) والا کارڈ ضرور ساتھ لائیں۔',
      },
    ],
    services: [
      {
        id: 'ped-1',
        departmentSlug: 'pediatrics',
        name: {
          en: 'Pediatric Specialist Consultation',
          ur: 'ماہر امراضِ اطفال سے مشاورت',
        },
        description: {
          en: 'Assessment for childhood fever, respiratory infection, allergies, or digestive issues.',
          ur: 'بچوں کے بخار، کھانسی، الرجی یا معدے کے مسائل کا تفصیلی معائنہ۔',
        },
        feePKR: 2800,
        durationMinutes: 20,
        category: 'Consultation',
      },
      {
        id: 'ped-2',
        departmentSlug: 'pediatrics',
        name: {
          en: 'Newborn & Well-Baby Growth Assessment',
          ur: 'نومولود بچے کی نشوونما اور ویل بے بی چیک اپ',
        },
        description: {
          en: 'Milestone evaluation, feeding assessment, and immunization schedule counseling.',
          ur: 'بچے کی جسمانی و ذہنی نشوونما، خوراک اور ویکسین شیڈول کا جائزہ۔',
        },
        feePKR: 3000,
        durationMinutes: 25,
        category: 'Consultation',
      },
    ],
  },
  {
    slug: 'dentistry',
    name: {
      en: 'Dentistry & Oral Care Suite',
      ur: 'ڈینٹل کلینک اور دانتوں کا علاج',
    },
    shortName: {
      en: 'Dentistry',
      ur: 'ڈینٹل کلینک',
    },
    tagline: {
      en: 'Sterilized preventive dentistry, painless digital root canals, scaling, and restorative care.',
      ur: 'جدید جراثیم سے پاک آلات کے ذریعے دانتوں کی صفائی، روٹ کینال، فلنگ اور مسوڑھوں کا علاج۔',
    },
    description: {
      en: 'Our 4-chair Dental Suite follows strict Class-B autoclave sterilization protocols with sealed instrument pouches opened in front of each patient, offering preventive hygiene, restorative fillings, and endodontics.',
      ur: 'ہمارا ڈینٹل سویٹ کلاس بی آٹوکلیو جراثیم کش اصولوں پر عمل پیرا ہے جہاں ہر مریض کے سامنے سیل شدہ آلات کھولے جاتے ہیں۔ یہاں اسکیلنگ، فلنگ اور روٹ کینال کی سہولت موجود ہے۔',
    },
    floorLocation: {
      en: 'First Floor — West Wing Dental Suite (Suites D-1 to D-4)',
      ur: 'فرسٹ فلور — ویسٹ ونگ ڈینٹل سویٹ (کمرہ D-1 تا D-4)',
    },
    startingFeePKR: 2000,
    iconName: 'Smile',
    highlights: [
      {
        en: 'Class-B Autoclave pouches unsealed chairside in the patient’s presence',
        ur: 'مریض کے سامنے کھلنے والے جراثیم سے پاک آٹوکلیو انسٹرومنٹ پاؤچز',
      },
      {
        en: 'Low-radiation digital periapical dental X-ray sensor at the dental chair',
        ur: 'ڈینٹل چیئر پر ہی کم شعاعوں والا ڈیجیٹل ڈینٹل ایکسرے',
      },
      {
        en: 'Transparent written treatment cost estimate before starting any dental procedure',
        ur: 'کسی بھی ڈینٹل پروسیجر سے پہلے اخراجات کا واضح تحریری تخمینہ',
      },
    ],
    patientPreparation: [
      {
        en: 'Inform the dental surgeon if you take blood thinners or have diabetes/hypertension.',
        ur: 'اگر آپ خون پتلا کرنے والی دوا لیتے ہیں یا شوگر/بلڈ پریشر کے مریض ہیں تو ڈاکٹر کو آگاہ کریں۔',
      },
    ],
    services: [
      {
        id: 'dent-1',
        departmentSlug: 'dentistry',
        name: {
          en: 'Dental Consultation & Digital Intraoral Charting',
          ur: 'ڈینٹل معائنہ اور ڈیجیٹل چیک اپ',
        },
        description: {
          en: 'Complete tooth and gum examination with personalized written treatment plan.',
          ur: 'دانتوں اور مسوڑھوں کا مکمل معائنہ اور علاج کا تحریری پلان۔',
        },
        feePKR: 2000,
        durationMinutes: 20,
        category: 'Dental',
      },
      {
        id: 'dent-2',
        departmentSlug: 'dentistry',
        name: {
          en: 'Ultrasonic Scaling & Enamel Polishing',
          ur: 'الٹراسونک اسکیلنگ اور دانتوں کی پالشنگ',
        },
        description: {
          en: 'Gentle plaque and tartar removal followed by stain polishing and gum care advice.',
          ur: 'جدید مشین سے دانتوں پر جمے میل اور ٹارٹر کی صفائی اور پالش۔',
        },
        feePKR: 6500,
        durationMinutes: 40,
        category: 'Dental',
      },
      {
        id: 'dent-3',
        departmentSlug: 'dentistry',
        name: {
          en: 'Tooth-Colored Composite Restoration (Per Tooth)',
          ur: 'دانت کے ہم رنگ کمپوزٹ فلنگ (فی دانت)',
        },
        description: {
          en: 'Bonded light-cured composite resin filling for cavities or chipped enamel.',
          ur: 'کیڑا لگے یا ٹوٹے ہوئے دانت کے لیے مضبوط اور قدرتی رنگ کی فلنگ۔',
        },
        feePKR: 5500,
        durationMinutes: 35,
        category: 'Dental',
      },
      {
        id: 'dent-4',
        departmentSlug: 'dentistry',
        name: {
          en: 'Rotary Root Canal Therapy (Anterior / Premolar)',
          ur: 'روٹری روٹ کینال تھراپی (آر سی ٹی)',
        },
        description: {
          en: 'Precision endodontic root canal cleaning and obturation under local anesthesia.',
          ur: 'جدید روٹری مشین کے ذریعے بغیر درد کے دانت کی جڑ کا علاج (روٹ کینال)۔',
        },
        feePKR: 16000,
        durationMinutes: 60,
        category: 'Dental',
      },
    ],
  },
  {
    slug: 'gynecology',
    name: {
      en: 'Gynecology & Women’s Health',
      ur: 'گائنی اور خواتین کی صحت کا شعبہ',
    },
    shortName: {
      en: 'Gynecology',
      ur: 'شعبہ گائنی',
    },
    tagline: {
      en: 'Antenatal maternity care, PCOS & hormonal management, and confidential women’s health.',
      ur: 'حمل کے دوران دیکھ بھال، ہارمونز کے مسائل (PCOS) اور خواتین کی صحت کی مکمل رازداری کے ساتھ مشاورت۔',
    },
    description: {
      en: 'Staffed entirely by female consultants and nursing assistants, our Women’s Health wing provides dignified antenatal checkups, PCOS/endocrine guidance, and preventive gynecological screenings.',
      ur: 'مکمل طور پر خواتین ڈاکٹرز اور نرسنگ اسٹاف پر مشتمل یہ شعبہ خواتین کو باوقار ماحول میں حمل کے معائنے، ہارمونل مسائل اور گائنی مشاورت فراہم کرتا ہے۔',
    },
    floorLocation: {
      en: 'First Floor — Private South Wing (Rooms 108 to 111)',
      ur: 'فرسٹ فلور — پرائیویٹ ساؤتھ ونگ (کمرہ 108 تا 111)',
    },
    startingFeePKR: 3000,
    iconName: 'ShieldCheck',
    highlights: [
      {
        en: 'All-female clinical and nursing staff for complete privacy and comfort',
        ur: 'مکمل پردے اور آرام کے لیے صرف خواتین ڈاکٹرز اور نرسنگ اسٹاف',
      },
      {
        en: 'Structured antenatal trimester checkups with adjacent obstetric ultrasound suite',
        ur: 'حمل کے ہر مرحلے کی نگرانی اور ملحقہ الٹراساؤنڈ روم کی سہولت',
      },
      {
        en: 'Evidence-based management for PCOS, anemia, and menstrual health',
        ur: 'پی سی او ایس، خون کی کمی اور ہارمونز کے مسائل کا جدید علاج',
      },
    ],
    patientPreparation: [
      {
        en: 'For pelvic or early antenatal ultrasound, a moderately full bladder may be requested.',
        ur: 'ابتدائی الٹراساؤنڈ کی صورت میں پانی پی کر آنے کی ہدایت کی جا سکتی ہے۔',
      },
    ],
    services: [
      {
        id: 'gyn-1',
        departmentSlug: 'gynecology',
        name: {
          en: 'Consultant Gynecologist Outpatient Visit',
          ur: 'کنسلٹنٹ گائناکالوجسٹ سے مشاورت',
        },
        description: {
          en: 'Private consultation for antenatal care, hormonal health, or gynecological concerns.',
          ur: 'حمل، ہارمونز یا خواتین کے دیگر طبی مسائل کے لیے تفصیلی مشاورت۔',
        },
        feePKR: 3000,
        durationMinutes: 25,
        category: 'Consultation',
      },
      {
        id: 'gyn-2',
        departmentSlug: 'gynecology',
        name: {
          en: 'Antenatal Trimester Review & Fetal Wellbeing Check',
          ur: 'حمل کا معائنہ اور فیٹل ویل بینگ چیک اپ',
        },
        description: {
          en: 'Maternal blood pressure, fetal heart Doppler check, nutrition & supplement review.',
          ur: 'ماں کا بلڈ پریشر، بچے کی دھڑکن کا ڈاپلر چیک اپ اور خوراک کی رہنمائی۔',
        },
        feePKR: 3500,
        durationMinutes: 30,
        category: 'Consultation',
      },
    ],
  },
  {
    slug: 'orthopedics',
    name: {
      en: 'Orthopedics, Spine & Physiotherapy',
      ur: 'ہڈیوں، جوڑوں اور فزیوتھراپی کا شعبہ',
    },
    shortName: {
      en: 'Orthopedics',
      ur: 'ہڈی و جوڑ',
    },
    tagline: {
      en: 'Knee arthritis care, back & neck pain rehabilitation, sports injuries, and posture clinics.',
      ur: 'گھٹنوں اور جوڑوں کا درد، کمر اور گردن کے مہرے، کھیلوں کی چوٹیں اور فزیوتھراپی۔',
    },
    description: {
      en: 'Combining orthopedic surgeons with licensed physical therapists, we help patients restore mobility and manage osteoarthritis, lumbar disc strain, frozen shoulder, and ligament injuries conservatively.',
      ur: 'آرتھوپیڈک سرجنز اور ماہر فزیوتھراپسٹس کی مشترکہ ٹیم جوڑوں کے درد، کمر کے مہروں، فروزن شولڈر اور پٹھوں کے کھنچاؤ کا مربوط علاج فراہم کرتی ہے۔',
    },
    floorLocation: {
      en: 'Ground Floor — Step-Free Rehab Access Wing (Rooms G-10 to G-12)',
      ur: 'گراؤنڈ فلور — وہیل چیئر فرینڈلی ریہیب ونگ (کمرہ G-10 تا G-12)',
    },
    startingFeePKR: 3000,
    iconName: 'Bone',
    highlights: [
      {
        en: 'Ground-floor step-free access with complimentary wheelchair assistance at drop-off',
        ur: 'بزرگ مریضوں کی سہولت کے لیے گراؤنڈ فلور پر بغیر سیڑھیوں کے رسائی اور وہیل چیئر',
      },
      {
        en: 'Integrated orthopedic evaluation and guided physiotherapy rehabilitation sessions',
        ur: 'ہڈیوں کے ڈاکٹر کے معائنے کے ساتھ جدید فزیوتھراپی اور ورزش کی سہولت',
      },
    ],
    patientPreparation: [
      {
        en: 'Bring previous X-ray films, MRI CDs, or bone density reports if available.',
        ur: 'اگر پہلے سے ایکسرے یا ایم آر آئی موجود ہوں تو ہمراہ لائیں۔',
      },
    ],
    services: [
      {
        id: 'ortho-1',
        departmentSlug: 'orthopedics',
        name: {
          en: 'Orthopedic Consultant Assessment',
          ur: 'ماہر امراضِ ہڈی و جوڑ سے مشاورت',
        },
        description: {
          en: 'Joint, spine, and musculoskeletal examination with conservative management plan.',
          ur: 'جوڑوں، مہروں اور پٹھوں کا معائنہ اور علاج کا تفصیلی پلان۔',
        },
        feePKR: 3000,
        durationMinutes: 20,
        category: 'Consultation',
      },
      {
        id: 'ortho-2',
        departmentSlug: 'orthopedics',
        name: {
          en: 'Guided Physiotherapy & Pain Relief Session',
          ur: 'فزیوتھراپی اور پین ریلیف سیشن',
        },
        description: {
          en: '45-minute supervised manual therapy, TENS/ultrasound modality, and mobility exercise.',
          ur: '۴۵ منٹ کا فزیوتھراپی سیشن برائے کمر درد، گردن اور جوڑوں کی بحالی۔',
        },
        feePKR: 2200,
        durationMinutes: 45,
        category: 'Procedure',
      },
    ],
  },
  {
    slug: 'dermatology',
    name: {
      en: 'Clinical Dermatology & Skin Health',
      ur: 'امراضِ جلد اور ڈرماٹولوجی',
    },
    shortName: {
      en: 'Dermatology',
      ur: 'امراضِ جلد',
    },
    tagline: {
      en: 'Medical dermatology for acne, eczema, fungal infections, pediatric skin care, and mole checks.',
      ur: 'کیل مہاسوں، ایگزیما، جلد کی الرجی، فنگل انفیکشن اور بالوں کے مسائل کا طبی علاج۔',
    },
    description: {
      en: 'Focused on evidence-based medical dermatology suited to Pakistani climate and skin types, treating chronic eczema, acne scarring, melasma, scalp disorders, and cutaneous infections.',
      ur: 'پاکستانی آب و ہوا اور جلد کی ساخت کو مدنظر رکھتے ہوئے ہمارا شعبہ ڈرماٹولوجی ایکنی، ایگزیما، چھائیوں، الرجی اور بالوں کے مسائل کا مستند طبی علاج پیش کرتا ہے۔',
    },
    floorLocation: {
      en: 'First Floor — Dermatology Clinic (Rooms 114 to 115)',
      ur: 'فرسٹ فلور — ڈرماٹولوجی کلینک (کمرہ 114 تا 115)',
    },
    startingFeePKR: 2800,
    iconName: 'Sparkles',
    highlights: [
      {
        en: 'Digital dermoscopy examination for accurate pigment and lesion assessment',
        ur: 'ڈیجیٹل ڈرموسکوپی کے ذریعے جلد کے نشانات اور الرجی کی درست تشخیص',
      },
      {
        en: 'Medical-first prescription plans without aggressive cosmetic upselling',
        ur: 'غیر ضروری کاسمیٹک پراڈکٹس کے بجائے مستند طبی علاج پر توجہ',
      },
    ],
    patientPreparation: [
      {
        en: 'Arrive with clean skin free of heavy makeup on the area being examined.',
        ur: 'چہرے یا جلد کے معائنے کے لیے میک اپ کے بغیر تشریف لائیں۔',
      },
    ],
    services: [
      {
        id: 'derm-1',
        departmentSlug: 'dermatology',
        name: {
          en: 'Consultant Dermatologist Consultation',
          ur: 'ماہر امراضِ جلد سے مشاورت',
        },
        description: {
          en: 'Clinical skin, hair, and nail evaluation with customized prescription regimen.',
          ur: 'جلد، بالوں اور ناخنوں کے مسائل کا معائنہ اور نسخہ۔',
        },
        feePKR: 2800,
        durationMinutes: 20,
        category: 'Consultation',
      },
    ],
  },
  {
    slug: 'diagnostics',
    name: {
      en: 'Diagnostic Lab & Ultrasound Imaging',
      ur: 'ڈائیگناسٹک لیبارٹری اور الٹراساؤنڈ',
    },
    shortName: {
      en: 'Diagnostics & Lab',
      ur: 'لیبارٹری و تشخیص',
    },
    tagline: {
      en: 'Automated hematology, biochemistry profiles, digital X-ray, and high-resolution ultrasound.',
      ur: 'بلڈ ٹیسٹ، شوگر و کولیسٹرول پروفائل، ڈیجیٹل ایکسرے اور الٹراساؤنڈ کی تیز رفتار سہولت۔',
    },
    description: {
      en: 'Our ground-floor Diagnostic Centre operates from 8:00 AM daily for fasting blood sample collection, delivering barcode-tracked pathology reports and radiologist-verified ultrasound imaging.',
      ur: 'گراؤنڈ فلور پر واقع ڈائیگناسٹک سینٹر صبح ۸ بجے سے نہار منہ بلڈ سیمپلز کے لیے کھلا رہتا ہے، جہاں بارکوڈ سسٹم کے تحت مستند لیب رپورٹس اور الٹراساؤنڈ فراہم کیے جاتے ہیں۔',
    },
    floorLocation: {
      en: 'Ground Floor — West Diagnostic Atrium (Sample Booths 1–4 & Imaging Suite)',
      ur: 'گراؤنڈ فلور — ویسٹ ڈائیگناسٹک ایٹریم (سیمپل بوتھ ۱ تا ۴)',
    },
    startingFeePKR: 950,
    iconName: 'Microscope',
    highlights: [
      {
        en: 'Early morning sample collection starting at 8:00 AM PKT for fasting tests',
        ur: 'نہار منہ ٹیسٹوں کے لیے صبح ۸ بجے سے بلڈ سیمپلنگ کا آغاز',
      },
      {
        en: 'Same-day routine hematology and chemistry reporting',
        ur: 'معمول کے بلڈ ٹیسٹوں کی رپورٹ اسی دن فراہم کرنے کی سہولت',
      },
    ],
    patientPreparation: [
      {
        en: 'Lipid Profile and Fasting Blood Glucose require 10 to 12 hours of overnight fasting (plain water is permitted).',
        ur: 'کولیسٹرول اور فاسٹنگ شوگر ٹیسٹ کے لیے ۱۰ سے ۱۲ گھنٹے نہار منہ رہنا ضروری ہے (سادہ پانی پی سکتے ہیں)۔',
      },
    ],
    services: [
      {
        id: 'diag-1',
        departmentSlug: 'diagnostics',
        name: {
          en: 'Complete Blood Count (CBC) & ESR',
          ur: 'کمپلیٹ بلڈ کاؤنٹ (CBC) اور ای ایس آر',
        },
        description: {
          en: 'Automated 5-part differential blood analysis for hemoglobin, WBC, platelets, and infection markers.',
          ur: 'ہیموگلوبن، سفید خلیات اور پلیٹلیٹس کا مکمل خودکار بلڈ ٹیسٹ۔',
        },
        feePKR: 950,
        durationMinutes: 10,
        category: 'Diagnostic',
      },
      {
        id: 'diag-2',
        departmentSlug: 'diagnostics',
        name: {
          en: 'Fasting Lipid Profile & HbA1c Metabolic Panel',
          ur: 'فاسٹنگ لپڈ پروفائل اور ایچ بی اے ون سی (HbA1c)',
        },
        description: {
          en: 'Total cholesterol, HDL, LDL, triglycerides, and 3-month average blood glucose index.',
          ur: 'کولیسٹرول کی مکمل اقسام اور ۳ ماہ کی اوسط شوگر کا مستند ٹیسٹ۔',
        },
        feePKR: 3400,
        durationMinutes: 15,
        preparationNote: {
          en: '10–12 hours fasting required (plain water allowed).',
          ur: '۱۰ سے ۱۲ گھنٹے نہار منہ آنا لازمی ہے۔',
        },
        category: 'Diagnostic',
      },
      {
        id: 'diag-3',
        departmentSlug: 'diagnostics',
        name: {
          en: 'High-Resolution Abdominal & Pelvic Ultrasound',
          ur: 'پیٹ اور پیلوک الٹراساؤنڈ اسکین',
        },
        description: {
          en: 'Consultant radiologist ultrasound scan with printed diagnostic summary.',
          ur: 'ماہر ریڈیالوجسٹ کے ذریعے الٹراساؤنڈ اسکین اور تفصیلی رپورٹ۔',
        },
        feePKR: 2800,
        durationMinutes: 25,
        preparationNote: {
          en: '6 hours fasting recommended for upper abdomen/gallbladder clarity.',
          ur: 'جگر اور پتے کے واضح الٹراساؤنڈ کے لیے ۶ گھنٹے خالی پیٹ آنا بہتر ہے۔',
        },
        category: 'Diagnostic',
      },
    ],
  },
];

export const ALL_SERVICES = DEPARTMENTS.flatMap((dept) => dept.services);
