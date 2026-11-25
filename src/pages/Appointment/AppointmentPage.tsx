import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Printer,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  PhoneCall,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS } from '../../data/departments';
import { DOCTORS } from '../../data/doctors';
import { DEMO_TIME_SLOTS, CLINIC_INFO } from '../../data/clinic';
import { DepartmentSlug, DemoAppointmentRecord } from '../../types';
import {
  formatPKR,
  getTodayDateString,
  getTomorrowDateString,
  isFutureOrTodayDate,
  isValidPakistaniPhone,
  isValidEmail,
  generateDemoReferenceNumber,
  normalizePakistaniPhone,
} from '../../lib/validation';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { SEOHead } from '../../components/shared/SEOHead';

type VisitType = 'First Consultation' | 'Follow-up Review' | 'Diagnostic / Lab Visit';

interface FormErrors {
  departmentSlug?: string;
  preferredDate?: string;
  timeSlot?: string;
  patientName?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export const AppointmentPage: React.FC = () => {
  const { language, t, addDemoBooking, showToast, setBookingsDrawerOpen } = useApp();
  const [searchParams] = useSearchParams();

  const initialDeptParam = searchParams.get('department') || '';
  const initialDocParam = searchParams.get('doctor') || '';

  const validInitialDept = DEPARTMENTS.some((d) => d.slug === initialDeptParam)
    ? (initialDeptParam as DepartmentSlug)
    : '';

  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [departmentSlug, setDepartmentSlug] = useState<DepartmentSlug | ''>(validInitialDept);
  const [doctorId, setDoctorId] = useState<string>(initialDocParam);
  const [preferredDate, setPreferredDate] = useState<string>(getTomorrowDateString());
  const [timeSlot, setTimeSlot] = useState<string>(DEMO_TIME_SLOTS[0].short);
  const [visitType, setVisitType] = useState<VisitType>('First Consultation');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmedRecord, setConfirmedRecord] = useState<DemoAppointmentRecord | null>(null);

  useEffect(() => {
    if (initialDocParam) {
      const matchedDoc = DOCTORS.find((d) => d.id === initialDocParam);
      if (matchedDoc) {
        setDepartmentSlug(matchedDoc.departmentSlug);
        setDoctorId(matchedDoc.id);
      }
    }
  }, [initialDocParam]);

  const availableDoctors = useMemo(() => {
    if (!departmentSlug) return DOCTORS;
    return DOCTORS.filter((d) => d.departmentSlug === departmentSlug);
  }, [departmentSlug]);

  const handleDepartmentChange = (newDept: string) => {
    const typedDept = newDept as DepartmentSlug | '';
    setDepartmentSlug(typedDept);
    if (typedDept && doctorId) {
      const docStillValid = DOCTORS.some(
        (d) => d.id === doctorId && d.departmentSlug === typedDept
      );
      if (!docStillValid) {
        setDoctorId('');
      }
    }
    setErrors((prev) => ({ ...prev, departmentSlug: undefined }));
  };

  const selectedDepartmentObj = DEPARTMENTS.find((d) => d.slug === departmentSlug);
  const selectedDoctorObj = DOCTORS.find((d) => d.id === doctorId);

  const estimatedFeePKR = selectedDoctorObj
    ? selectedDoctorObj.consultationFeePKR
    : selectedDepartmentObj
    ? selectedDepartmentObj.startingFeePKR
    : 2500;

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!departmentSlug) {
      nextErrors.departmentSlug =
        language === 'ur'
          ? 'براہِ کرم طبی شعبہ منتخب کریں'
          : 'Please select a clinical department.';
    }

    if (!preferredDate) {
      nextErrors.preferredDate =
        language === 'ur'
          ? 'براہِ کرم اپائنٹمنٹ کی تاریخ منتخب کریں'
          : 'Please select a preferred appointment date.';
    } else if (!isFutureOrTodayDate(preferredDate)) {
      nextErrors.preferredDate =
        language === 'ur'
          ? 'گزری ہوئی تاریخ منتخب نہیں کی جا سکتی۔ آج یا مستقبل کی تاریخ منتخب کریں۔'
          : 'Past dates cannot be selected. Please choose today or a future date.';
    }

    if (!timeSlot) {
      nextErrors.timeSlot =
        language === 'ur'
          ? 'براہِ کرم وقت کا انتخاب کریں'
          : 'Please select a preferred PKT time window.';
    }

    if (!patientName.trim() || patientName.trim().length < 2) {
      nextErrors.patientName =
        language === 'ur'
          ? 'مریض کا مکمل نام درج کریں (کم از کم ۲ حروف)'
          : 'Please enter the patient’s full name (at least 2 characters).';
    }

    if (!phone.trim()) {
      nextErrors.phone =
        language === 'ur'
          ? 'پاکستانی موبائل یا فون نمبر درج کرنا لازمی ہے'
          : 'Pakistani mobile or landline number is required.';
    } else if (!isValidPakistaniPhone(phone)) {
      nextErrors.phone =
        language === 'ur'
          ? 'درست پاکستانی نمبر درج کریں، مثلاً 0300-1234567 یا +92 321 7654321'
          : 'Enter a valid Pakistani phone number (e.g. 0300-1234567 or +92 321 7654321).';
    }

    if (email.trim() && !isValidEmail(email)) {
      nextErrors.email =
        language === 'ur'
          ? 'درست ای میل ایڈریس درج کریں یا خالی چھوڑ دیں'
          : 'Please enter a valid email address or leave optional field blank.';
    }

    if (notes.length > 250) {
      nextErrors.notes =
        language === 'ur'
          ? 'پیغام ۲۵۰ حروف سے کم ہونا چاہیے'
          : 'Short note must be 250 characters or fewer.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmDemoSubmission = () => {
    if (!selectedDepartmentObj) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const refCode = generateDemoReferenceNumber();
      const record: DemoAppointmentRecord = {
        referenceNumber: refCode,
        createdAtISO: new Date().toISOString(),
        departmentSlug: selectedDepartmentObj.slug,
        departmentName: selectedDepartmentObj.name.en,
        doctorId: selectedDoctorObj ? selectedDoctorObj.id : 'any-department-specialist',
        doctorName: selectedDoctorObj
          ? selectedDoctorObj.name.en
          : `Any Available Consultant (${selectedDepartmentObj.shortName.en})`,
        consultationFeePKR: estimatedFeePKR,
        preferredDate,
        timeSlot,
        visitType,
        patientName: patientName.trim(),
        phone: normalizePakistaniPhone(phone),
        email: email.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      addDemoBooking(record);
      setConfirmedRecord(record);
      setIsSubmitting(false);
      setStep('confirmed');
      showToast(
        language === 'ur'
          ? `ڈیمو درخواست جمع ہو گئی — ریفرنس: ${refCode}`
          : `Simulated demo appointment slip generated: ${refCode}`
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleStartAnotherRequest = () => {
    setConfirmedRecord(null);
    setStep('form');
    setPatientName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setErrors({});
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={language === 'ur' ? 'آن لائن اپائنٹمنٹ کی درخواست (ڈیمو)' : 'Request an Outpatient Appointment (Demo Simulator)'}
        description="Simulate an outpatient specialist or dental appointment request at Noor Medical Centre Lahore with Pakistani phone validation and demo reference generation."
      />

      <Breadcrumbs
        items={[{ label: language === 'ur' ? 'اپائنٹمنٹ بکنگ' : 'Request appointment' }]}
      />

      {/* Simulation Notice */}
      <div className="mt-2 mb-6 p-4 rounded bg-signal-bg border border-signal-border/40 flex items-start gap-3 text-[13px] text-ink-2">
        <ShieldAlert className="w-5 h-5 text-signal shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-signal">
            {language === 'ur'
              ? 'فرنٹ اینڈ سمولیشن — کوئی حقیقی اپائنٹمنٹ کنفرم نہیں ہوتی'
              : 'Frontend Demonstration Mode — Not a Real Confirmed Medical Booking'}
          </p>
          <p className="mt-0.5">
            {language === 'ur'
              ? 'یہ فارم صرف براؤزر میں ڈیمو ریفرنس سلپ بناتا ہے۔ کوئی حقیقی ڈاکٹر یا ہسپتال اس ڈیٹا کو وصول نہیں کرتا۔ شناختی کارڈ نمبر (CNIC) یا حساس میڈیکل ریکارڈ درج نہ کریں۔'
              : 'Submitting this form generates a local demo reference slip in your browser. No clinic or doctor receives your input. Do not enter CNIC numbers or sensitive medical history.'}
          </p>
        </div>
      </div>

      {/* Horizontal Stepper (genuine 3-step sequence) */}
      <ol className="mb-8 grid grid-cols-3 border border-rule-strong rounded-md overflow-hidden bg-surface max-w-2xl text-[13px]">
        <li
          className={`px-3.5 py-2.5 font-semibold border-e border-rule ${
            step === 'form' ? 'bg-ink text-surface' : 'bg-tint text-ink'
          }`}
        >
          1. {language === 'ur' ? 'تفصیلات' : 'Details'}
        </li>
        <li
          className={`px-3.5 py-2.5 font-semibold border-e border-rule ${
            step === 'review'
              ? 'bg-ink text-surface'
              : step === 'confirmed'
              ? 'bg-tint text-ink'
              : 'bg-surface text-ink-3'
          }`}
        >
          2. {language === 'ur' ? 'جائزہ' : 'Review'}
        </li>
        <li
          className={`px-3.5 py-2.5 font-semibold ${
            step === 'confirmed' ? 'bg-ink text-surface' : 'bg-surface text-ink-3'
          }`}
        >
          3. {language === 'ur' ? 'ڈیمو سلپ' : 'Demo slip'}
        </li>
      </ol>

      {/* STEP 3: CONFIRMED DEMO SLIP */}
      {step === 'confirmed' && confirmedRecord && (
        <div
          role="region"
          aria-labelledby="demo-confirmation-heading"
          className="bg-surface rounded-md border-2 border-ink p-6 sm:p-8 max-w-3xl mx-auto space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-rule">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-7 h-7 text-action shrink-0 mt-1" />
              <div>
                <p className="text-[12px] font-bold text-signal">
                  {language === 'ur'
                    ? 'ڈیمو درخواست — حقیقی تصدیق شدہ اپائنٹمنٹ نہیں'
                    : 'SIMULATED DEMO REQUEST — NOT A REAL CONFIRMED APPOINTMENT'}
                </p>
                <h1
                  id="demo-confirmation-heading"
                  className="text-[24px] sm:text-[28px] font-bold text-ink mt-1 leading-tight"
                >
                  {language === 'ur'
                    ? 'ڈیمو اپائنٹمنٹ درخواست سلپ تیار ہے'
                    : 'Demo Appointment Request Slip Generated'}
                </h1>
              </div>
            </div>

            <div className="bg-ink text-surface px-4 py-3 rounded shrink-0 sm:text-end">
              <p className="text-[12px] text-surface/75">
                {language === 'ur' ? 'ڈیمو ریفرنس' : 'Demo reference'}
              </p>
              <p className="text-[18px] font-bold tabular-nums">{confirmedRecord.referenceNumber}</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-paper p-5 rounded border border-rule text-[14px]">
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'مریض کا نام' : 'Patient name'}</dt>
              <dd className="font-bold text-ink">{confirmedRecord.patientName}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'فون نمبر' : 'Contact phone'}</dt>
              <dd className="font-bold text-ink tabular-nums">{confirmedRecord.phone}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'شعبہ' : 'Department'}</dt>
              <dd className="font-semibold text-ink">{confirmedRecord.departmentName}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'ڈاکٹر' : 'Consultant'}</dt>
              <dd className="font-semibold text-action">{confirmedRecord.doctorName}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'تاریخ' : 'Preferred date'}</dt>
              <dd className="font-semibold text-ink tabular-nums">{confirmedRecord.preferredDate}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'وقت (PKT)' : 'PKT window'}</dt>
              <dd className="font-semibold text-ink tabular-nums">{confirmedRecord.timeSlot}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'وزٹ کی قسم' : 'Visit type'}</dt>
              <dd className="text-ink">{confirmedRecord.visitType}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'متوقع فیس' : 'Indicative fee'}</dt>
              <dd className="font-bold text-ink tabular-nums">
                {formatPKR(confirmedRecord.consultationFeePKR)}
              </dd>
            </div>
            {confirmedRecord.email && (
              <div className="sm:col-span-2">
                <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'ای میل' : 'Email'}</dt>
                <dd className="text-ink">{confirmedRecord.email}</dd>
              </div>
            )}
            {confirmedRecord.notes && (
              <div className="sm:col-span-2">
                <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'نوٹ' : 'Visitor note'}</dt>
                <dd className="text-ink-2">{confirmedRecord.notes}</dd>
              </div>
            )}
          </dl>

          <p className="text-[13px] text-ink-2">
            {language === 'ur'
              ? 'یہ ریکارڈ صرف آپ کے اپنے براؤزر کی لوکل اسٹوریج میں محفوظ ہے اور کسی سرور کو نہیں بھیجا گیا۔'
              : 'Stored locally in your browser’s LocalStorage only. No external server, clinic reception, or physician has received this request.'}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-rule">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleStartAnotherRequest}
                className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'ur' ? 'نئی درخواست شروع کریں' : 'Start another request'}</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingsDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded border border-ink hover:bg-tint text-ink text-[14px] font-semibold"
              >
                <FileCheck className="w-4 h-4" />
                <span>{language === 'ur' ? 'محفوظ سلپس دیکھیں' : 'View saved slips'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 min-h-[44px] rounded border border-rule-strong hover:bg-tint text-[13px] font-semibold text-ink-2"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ur' ? 'پرنٹ کریں' : 'Print slip'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 & STEP 2 */}
      {step !== 'confirmed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            {step === 'form' ? (
              <form
                onSubmit={handleProceedToReview}
                noValidate
                className="bg-surface rounded-md border border-rule-strong p-6 sm:p-8 space-y-6"
              >
                <div className="pb-4 border-b border-rule">
                  <h1 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-[-0.015em]">
                    {language === 'ur'
                      ? 'آؤٹ پیشنٹ اپائنٹمنٹ کی درخواست'
                      : 'Request an outpatient appointment'}
                  </h1>
                  <p className="text-[13px] text-ink-3 mt-1">
                    {language === 'ur'
                      ? 'ستارے (*) والے خانے لازمی ہیں۔'
                      : 'Fields marked with * are required.'}
                  </p>
                </div>

                {/* Section A */}
                <fieldset className="space-y-4">
                  <legend className="text-[15px] font-bold text-ink mb-2">
                    {language === 'ur' ? '۱۔ شعبہ، ڈاکٹر اور وقت' : '1. Department, doctor & time window'}
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="appt-department" className="block text-[13px] font-semibold text-ink mb-1.5">
                        {language === 'ur' ? 'طبی شعبہ *' : 'Clinical Department *'}
                      </label>
                      <select
                        id="appt-department"
                        required
                        aria-invalid={Boolean(errors.departmentSlug)}
                        aria-describedby={errors.departmentSlug ? 'err-dept' : undefined}
                        value={departmentSlug}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink ${
                          errors.departmentSlug ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                        }`}
                      >
                        <option value="">
                          {language === 'ur' ? '-- شعبہ منتخب کریں --' : '-- Select a department --'}
                        </option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept.slug} value={dept.slug}>
                            {t(dept.name)} ({formatPKR(dept.startingFeePKR)}+)
                          </option>
                        ))}
                      </select>
                      {errors.departmentSlug && (
                        <p id="err-dept" role="alert" className="mt-1 text-[13px] text-danger font-medium">
                          {errors.departmentSlug}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="appt-doctor" className="block text-[13px] font-semibold text-ink mb-1.5">
                        {language === 'ur'
                          ? 'کنسلٹنٹ ڈاکٹر (شعبے کے مطابق)'
                          : 'Preferred Doctor (Filtered by Department)'}
                      </label>
                      <select
                        id="appt-doctor"
                        value={doctorId}
                        onChange={(e) => {
                          const docVal = e.target.value;
                          setDoctorId(docVal);
                          if (docVal) {
                            const matched = DOCTORS.find((d) => d.id === docVal);
                            if (matched && matched.departmentSlug !== departmentSlug) {
                              setDepartmentSlug(matched.departmentSlug);
                            }
                          }
                        }}
                        className="w-full min-h-[44px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
                      >
                        <option value="">
                          {language === 'ur'
                            ? 'اس شعبے کا کوئی بھی دستیاب ماہر ڈاکٹر'
                            : 'Any available specialist in department'}
                        </option>
                        {availableDoctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {t(doc.name)} — {formatPKR(doc.consultationFeePKR)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="appt-date" className="block text-[13px] font-semibold text-ink mb-1.5">
                        {language === 'ur' ? 'ترجیحی تاریخ *' : 'Preferred Future Date *'}
                      </label>
                      <input
                        id="appt-date"
                        type="date"
                        required
                        min={getTodayDateString()}
                        aria-invalid={Boolean(errors.preferredDate)}
                        aria-describedby={errors.preferredDate ? 'err-date' : undefined}
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          setErrors((prev) => ({ ...prev, preferredDate: undefined }));
                        }}
                        className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink tabular-nums ${
                          errors.preferredDate ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p id="err-date" role="alert" className="mt-1 text-[13px] text-danger font-medium">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="appt-slot" className="block text-[13px] font-semibold text-ink mb-1.5">
                        {language === 'ur' ? 'ترجیحی وقت (PKT) *' : 'Preferred Time Window (PKT) *'}
                      </label>
                      <select
                        id="appt-slot"
                        required
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full min-h-[44px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
                      >
                        {DEMO_TIME_SLOTS.map((slot) => (
                          <option key={slot.id} value={slot.short}>
                            {t(slot.label)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[13px] font-semibold text-ink mb-1.5">
                      {language === 'ur' ? 'وزٹ کی قسم' : 'Appointment type'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(
                        [
                          { value: 'First Consultation', label: { en: 'First Consultation', ur: 'پہلا معائنہ' } },
                          { value: 'Follow-up Review', label: { en: 'Follow-up Review', ur: 'فالو اپ' } },
                          { value: 'Diagnostic / Lab Visit', label: { en: 'Diagnostic / Lab Visit', ur: 'لیب ٹیسٹ' } },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setVisitType(opt.value)}
                          aria-pressed={visitType === opt.value}
                          className={`px-3 min-h-[42px] rounded border text-[13px] font-semibold transition-colors ${
                            visitType === opt.value
                              ? 'bg-action-soft border-action text-action'
                              : 'bg-paper border-rule-strong text-ink-2 hover:bg-tint'
                          }`}
                        >
                          {t(opt.label)}
                        </button>
                      ))}
                    </div>
                  </div>
                </fieldset>

                {/* Section B */}
                <fieldset className="pt-5 border-t border-rule space-y-4">
                  <legend className="text-[15px] font-bold text-ink mb-2">
                    {language === 'ur' ? '۲۔ رابطے کی تفصیلات' : '2. Visitor contact details'}
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="appt-name" className="block text-[13px] font-semibold text-ink mb-1.5">
                        {language === 'ur' ? 'مریض کا مکمل نام *' : 'Patient Full Name *'}
                      </label>
                      <input
                        id="appt-name"
                        type="text"
                        required
                        aria-invalid={Boolean(errors.patientName)}
                        aria-describedby={errors.patientName ? 'err-name' : undefined}
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          setErrors((prev) => ({ ...prev, patientName: undefined }));
                        }}
                        placeholder={language === 'ur' ? 'مثلاً احمد علی خان' : 'e.g. Ahmed Ali Khan'}
                        className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink ${
                          errors.patientName ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                        }`}
                      />
                      {errors.patientName && (
                        <p id="err-name" role="alert" className="mt-1 text-[13px] text-danger font-medium">
                          {errors.patientName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="appt-phone" className="block text-[13px] font-semibold text-ink mb-1.5">
                        {language === 'ur' ? 'پاکستانی فون نمبر (+92 یا 03XX) *' : 'Pakistani Phone Number (+92 or 03XX) *'}
                      </label>
                      <input
                        id="appt-phone"
                        type="tel"
                        required
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'err-phone' : 'phone-hint'}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="0300-1234567 or +92 321 7654321"
                        className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink tabular-nums ${
                          errors.phone ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                        }`}
                      />
                      <p id="phone-hint" className="mt-1 text-[13px] text-ink-3">
                        {language === 'ur'
                          ? 'مثلاً 0300-1234567 یا 042 لینڈ لائن'
                          : 'Accepted: 03XX-XXXXXXX, +92 3XX XXXXXXX, or 042 landline'}
                      </p>
                      {errors.phone && (
                        <p id="err-phone" role="alert" className="mt-1 text-[13px] text-danger font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="appt-email" className="block text-[13px] font-semibold text-ink mb-1.5">
                      {language === 'ur' ? 'ای میل ایڈریس (اختیاری)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      id="appt-email"
                      type="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="visitor.demo@example.pk"
                      className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink ${
                        errors.email ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                      }`}
                    />
                    {errors.email && (
                      <p id="err-email" role="alert" className="mt-1 text-[13px] text-danger font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="appt-notes" className="block text-[13px] font-semibold text-ink mb-1.5">
                      {language === 'ur'
                        ? 'مختصر نوٹ (اختیاری — حساس طبی معلومات یا شناختی کارڈ نہ لکھیں)'
                        : 'Optional Short Note (Do NOT enter sensitive medical records or CNIC)'}
                    </label>
                    <textarea
                      id="appt-notes"
                      rows={3}
                      maxLength={250}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        language === 'ur'
                          ? 'مثلاً وہیل چیئر کی ضرورت ہے۔'
                          : 'e.g. Requesting ground-floor wheelchair assistance on arrival.'
                      }
                      className="w-full rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
                    />
                    <div className="flex items-center justify-between text-[13px] text-ink-3 mt-1">
                      <span>
                        {language === 'ur'
                          ? 'براہِ کرم بیماری کی ہسٹری یا CNIC درج نہ کریں۔'
                          : 'Avoid entering diagnoses, lab values, or CNIC numbers.'}
                      </span>
                      <span className="tabular-nums">{notes.length}/250</span>
                    </div>
                  </div>
                </fieldset>

                <div className="pt-4 border-t border-rule flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded bg-action hover:bg-action-hover text-surface text-[15px] font-semibold transition-colors"
                  >
                    <span>
                      {language === 'ur' ? 'درخواست کا جائزہ لیں' : 'Review Appointment Request'}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </form>
            ) : (
              /* STEP 2: REVIEW */
              <div className="bg-surface rounded-md border border-rule-strong p-6 sm:p-8 space-y-6">
                <div className="pb-4 border-b border-rule flex items-center justify-between gap-3">
                  <h2 className="text-[22px] font-bold text-ink">
                    {language === 'ur'
                      ? 'اپنی ڈیمو اپائنٹمنٹ درخواست کا جائزہ لیں'
                      : 'Review Your Demo Appointment Request'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="inline-flex items-center gap-1.5 px-3 min-h-[40px] rounded border border-rule-strong text-[13px] font-semibold text-ink hover:bg-tint"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                    <span>{language === 'ur' ? 'ترمیم' : 'Edit'}</span>
                  </button>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-paper p-5 rounded border border-rule text-[14px]">
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'شعبہ' : 'Department'}</dt>
                    <dd className="font-semibold text-ink">
                      {selectedDepartmentObj ? t(selectedDepartmentObj.name) : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'ڈاکٹر' : 'Consultant'}</dt>
                    <dd className="font-semibold text-action">
                      {selectedDoctorObj
                        ? t(selectedDoctorObj.name)
                        : language === 'ur'
                        ? 'کوئی بھی دستیاب ماہر ڈاکٹر'
                        : 'Any available department specialist'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'تاریخ اور وقت' : 'Date & PKT window'}</dt>
                    <dd className="font-semibold text-ink tabular-nums">
                      {preferredDate} · {timeSlot}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'متوقع فیس' : 'Indicative fee'}</dt>
                    <dd className="font-bold text-ink tabular-nums">{formatPKR(estimatedFeePKR)}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'مریض کا نام' : 'Patient name'}</dt>
                    <dd className="font-semibold text-ink">{patientName}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'فون نمبر' : 'Phone'}</dt>
                    <dd className="font-semibold text-ink tabular-nums">{normalizePakistaniPhone(phone)}</dd>
                  </div>
                  {email && (
                    <div className="sm:col-span-2">
                      <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'ای میل' : 'Email'}</dt>
                      <dd className="text-ink">{email}</dd>
                    </div>
                  )}
                  {notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'نوٹ' : 'Note'}</dt>
                      <dd className="text-ink-2">{notes}</dd>
                    </div>
                  )}
                </dl>

                <div className="p-4 rounded bg-signal-bg border border-signal-border/40 text-[13px] text-ink-2 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                  <p>
                    {language === 'ur'
                      ? 'جمع کرانے پر ایک فرضی ڈیمو ریفرنس نمبر (NMC-2026-XXXX) جاری کیا جائے گا۔ یہ حقیقی طبی بکنگ نہیں ہے۔'
                      : 'Submitting generates a simulated reference slip (NMC-2026-XXXX) locally in your browser. No real medical booking is created.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="px-4 min-h-[46px] rounded border border-ink text-[14px] font-semibold text-ink hover:bg-tint"
                  >
                    {language === 'ur' ? 'واپس فارم پر جائیں' : 'Back to edit'}
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleConfirmDemoSubmission}
                    className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded bg-action hover:bg-action-hover disabled:opacity-50 text-surface text-[15px] font-semibold"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? language === 'ur'
                          ? 'ڈیمو سلپ تیار ہو رہی ہے...'
                          : 'Generating demo slip...'
                        : language === 'ur'
                        ? 'ڈیمو درخواست جمع کرائیں'
                        : 'Submit Demo Request'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Cols: Live Summary + Emergency */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-surface rounded-md border border-rule-strong p-5 space-y-3">
              <h2 className="text-[16px] font-bold text-ink pb-2.5 border-b border-rule">
                {language === 'ur' ? 'منتخب اپائنٹمنٹ کا خلاصہ' : 'Request summary'}
              </h2>

              <dl className="space-y-2.5 text-[14px]">
                <div>
                  <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'شعبہ' : 'Department'}</dt>
                  <dd className="font-semibold text-ink">
                    {selectedDepartmentObj
                      ? t(selectedDepartmentObj.name)
                      : language === 'ur'
                      ? 'ابھی منتخب نہیں کیا گیا'
                      : 'Not selected yet'}
                  </dd>
                </div>

                <div>
                  <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'ڈاکٹر' : 'Consultant'}</dt>
                  <dd className="font-semibold text-action">
                    {selectedDoctorObj
                      ? t(selectedDoctorObj.name)
                      : language === 'ur'
                      ? 'کوئی بھی دستیاب ماہر ڈاکٹر'
                      : 'Any available department specialist'}
                  </dd>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-rule tabular-nums">
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'تاریخ' : 'Date'}</dt>
                    <dd className="font-semibold text-ink">{preferredDate || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">{language === 'ur' ? 'فیس' : 'Fee'}</dt>
                    <dd className="font-bold text-ink">{formatPKR(estimatedFeePKR)}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="bg-danger-bg rounded-md border border-danger-border p-5 space-y-2 text-[13px]">
              <div className="flex items-center gap-2 text-danger font-bold text-[14px]">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <h3>{language === 'ur' ? 'فوری طبی ایمرجنسی' : 'Need urgent care?'}</h3>
              </div>
              <p className="text-ink-2 leading-relaxed">{t(CLINIC_INFO.emergencyNotice)}</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
