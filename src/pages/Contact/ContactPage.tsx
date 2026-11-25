import React, { useState } from 'react';
import {
  Copy,
  Check,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_INFO } from '../../data/clinic';
import { isValidPakistaniPhone, isValidEmail } from '../../lib/validation';
import { ArrivalMapSVG } from '../../components/shared/WayfindingVisuals';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { SEOHead } from '../../components/shared/SEOHead';

export const ContactPage: React.FC = () => {
  const { language, t, openWhatsAppModal, showToast } = useApp();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Outpatient Inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; message?: string }>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    ref: string;
    name: string;
    phone: string;
    subject: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const handleCopyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // ignore if clipboard blocked
    }
    setCopiedField(label);
    showToast(
      language === 'ur' ? `${label} کلپ بورڈ پر کاپی ہو گیا` : `Copied ${label} to clipboard`
    );
    setTimeout(() => {
      setCopiedField((prev) => (prev === label ? null : prev));
    }, 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string; email?: string; message?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name =
        language === 'ur' ? 'براہِ کرم اپنا نام درج کریں' : 'Please enter your full name.';
    }
    if (!phone.trim() || !isValidPakistaniPhone(phone)) {
      nextErrors.phone =
        language === 'ur'
          ? 'درست پاکستانی فون نمبر درج کریں (مثلاً 0300-1234567)'
          : 'Please enter a valid Pakistani phone number (e.g. 0300-1234567).';
    }
    if (email.trim() && !isValidEmail(email)) {
      nextErrors.email =
        language === 'ur' ? 'درست ای میل ایڈریس درج کریں' : 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message =
        language === 'ur'
          ? 'براہِ کرم کم از کم ۱۰ حروف کا پیغام درج کریں'
          : 'Please enter a brief inquiry message (at least 10 characters).';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      const inquiryRef = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedReceipt({
        ref: inquiryRef,
        name: name.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }) + ' PKT',
      });
      showToast(
        language === 'ur'
          ? 'ڈیمو پیغام کا فرنٹ اینڈ پری ویو تیار ہو گیا'
          : 'Frontend demo inquiry confirmation generated'
      );
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={language === 'ur' ? 'رابطہ، اوقاتِ کار اور گلبرگ لاہور لوکیشن (ڈیمو)' : 'Contact Desk, Opening Hours & Gulberg III Lahore Arrival Map (Demo)'}
        description="Contact Noor Medical & Diagnostic Centre (Fictional Demo Showcase) in Gulberg III, Lahore: copy demo phone/email, prepare WhatsApp inquiry, or test the contact form."
      />

      <Breadcrumbs items={[{ label: language === 'ur' ? 'رابطہ اور لوکیشن' : 'Contact & directions' }]} />

      {/* Large Typographic Contact Strip (Duke Health inspired — no 3-card grid) */}
      <section className="mt-2 pb-8 border-b border-ink grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-6 space-y-2">
          <h1 className="text-[28px] sm:text-[36px] font-bold text-ink tracking-[-0.02em] leading-[1.12]">
            {language === 'ur' ? 'رابطہ ڈیسک اور گلبرگ III لوکیشن' : 'Contact desk & directions'}
          </h1>
          <p className="text-[15px] text-ink-2">
            {language === 'ur'
              ? 'تمام فون نمبرز، ای میل اور گلبرگ III لاہور کا پتہ صرف پورٹ فولیو ڈیمو کے لیے فرضی ہیں۔'
              : 'All phone numbers, email addresses, and street coordinates below are fictional demonstration placeholders.'}
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:border-s lg:border-rule lg:ps-8">
          <div className="space-y-1.5">
            <p className="text-[13px] text-ink-3">
              {language === 'ur' ? 'استقبالیہ ڈیمو نمبر' : 'Demo reception phone'}
            </p>
            <p className="text-[22px] font-bold text-ink tabular-nums">{CLINIC_INFO.phoneRaw}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleCopyText(CLINIC_INFO.phoneRaw, 'Demo Phone Number')}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-action hover:underline underline-offset-4"
              >
                {copiedField === 'Demo Phone Number' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedField === 'Demo Phone Number'
                    ? language === 'ur'
                      ? 'کاپی ہو گیا'
                      : 'Copied'
                    : language === 'ur'
                    ? 'نمبر کاپی کریں'
                    : 'Copy phone'}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsAppModal(
                    'Assalam-o-Alaikum Noor Medical Centre (Demo), I would like to inquire about specialist OPD timings and location directions.',
                    'Contact Page WhatsApp Action'
                  )
                }
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-action underline underline-offset-4"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'واٹس ایپ کمپوزر' : 'WhatsApp composer'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[13px] text-ink-3">
              {language === 'ur' ? 'ڈیمو ای میل' : 'Demo patient desk email'}
            </p>
            <p className="text-[15px] font-bold text-ink break-all">{CLINIC_INFO.emailDisplay}</p>
            <button
              type="button"
              onClick={() => handleCopyText(CLINIC_INFO.emailDisplay, 'Demo Email Address')}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-action hover:underline underline-offset-4 pt-1"
            >
              {copiedField === 'Demo Email Address' ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>
                {copiedField === 'Demo Email Address'
                  ? language === 'ur'
                    ? 'ای میل کاپی ہو گیا'
                    : 'Copied email'
                  : language === 'ur'
                  ? 'ای میل کاپی کریں'
                  : 'Copy email'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Split: Inquiry Form (7 Cols) + Arrival Diagram & Hours (5 Cols) */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          {submittedReceipt ? (
            <div
              role="region"
              aria-label="Contact inquiry demo confirmation"
              className="bg-surface rounded-md border-2 border-ink p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-rule">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-action shrink-0 mt-1" />
                  <div>
                    <p className="text-[12px] font-bold text-signal">
                      {language === 'ur' ? 'فرنٹ اینڈ ڈیمو تصدیق' : 'FRONTEND-ONLY DEMO CONFIRMATION'}
                    </p>
                    <h2 className="text-[22px] font-bold text-ink mt-0.5">
                      {language === 'ur'
                        ? 'آپ کا ڈیمو استفسار ریکارڈ کر لیا گیا ہے'
                        : 'Demo Inquiry Form Validated & Previewed'}
                    </h2>
                  </div>
                </div>
                <span className="text-[13px] font-bold px-2.5 py-1 rounded bg-ink text-surface tabular-nums">
                  {submittedReceipt.ref}
                </span>
              </div>

              <dl className="p-4 rounded bg-paper border border-rule space-y-2 text-[14px]">
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-3">{language === 'ur' ? 'نام:' : 'Sender:'}</dt>
                  <dd className="font-semibold text-ink">{submittedReceipt.name}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-3">{language === 'ur' ? 'فون:' : 'Phone:'}</dt>
                  <dd className="font-semibold text-ink tabular-nums">{submittedReceipt.phone}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-3">{language === 'ur' ? 'موضوع:' : 'Topic:'}</dt>
                  <dd className="font-semibold text-action">{submittedReceipt.subject}</dd>
                </div>
                <div className="pt-2 border-t border-rule">
                  <dt className="text-[13px] text-ink-3 mb-1">{language === 'ur' ? 'پیغام:' : 'Message:'}</dt>
                  <dd className="text-ink">{submittedReceipt.message}</dd>
                </div>
              </dl>

              <div className="p-3.5 rounded bg-signal-bg border border-signal-border/40 text-[13px] text-ink-2 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                <p>
                  {language === 'ur'
                    ? 'وضاحت: یہ فرنٹ اینڈ ڈیمو فارم ہے؛ کوئی حقیقی ای میل یا پیغام کسی سرور کو نہیں بھیجا گیا۔'
                    : 'Simulation Disclosure: No real message or email has been transmitted externally. This receipt confirms client-side validation.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmittedReceipt(null);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'ur' ? 'نیا ڈیمو پیغام لکھیں' : 'Send another demo inquiry'}</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              noValidate
              className="bg-surface rounded-md border border-rule-strong p-6 sm:p-8 space-y-5"
            >
              <div className="pb-3 border-b border-rule">
                <h2 className="text-[22px] font-bold text-ink">
                  {language === 'ur' ? 'جنرل استفسار فارم (ڈیمو)' : 'Send a general inquiry (demo form)'}
                </h2>
                <p className="text-[13px] text-ink-3 mt-1">
                  {language === 'ur'
                    ? 'کوئی حقیقی پیغام باہر نہیں بھیجا جاتا؛ صرف براؤزر میں تصدیقی پری ویو نظر آتا ہے۔'
                    : 'No real message is sent externally; submitting renders a frontend-only confirmation preview.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[13px] font-semibold text-ink mb-1.5">
                    {language === 'ur' ? 'آپ کا نام *' : 'Your Full Name *'}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder={language === 'ur' ? 'مثلاً فاطمہ طارق' : 'e.g. Fatima Tariq'}
                    className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink ${
                      errors.name ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                    }`}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1 text-[13px] text-danger font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-[13px] font-semibold text-ink mb-1.5">
                    {language === 'ur' ? 'پاکستانی فون نمبر *' : 'Pakistani Phone Number *'}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    placeholder="0300-1234567"
                    className={`w-full min-h-[44px] rounded border px-3 py-2 text-[14px] bg-paper text-ink tabular-nums ${
                      errors.phone ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                    }`}
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-[13px] text-danger font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-[13px] font-semibold text-ink mb-1.5">
                    {language === 'ur' ? 'ای میل (اختیاری)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="visitor@example.pk"
                    className="w-full min-h-[44px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-[13px] text-danger font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[13px] font-semibold text-ink mb-1.5">
                    {language === 'ur' ? 'موضوع' : 'Inquiry topic'}
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full min-h-[44px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
                  >
                    <option value="General Outpatient Inquiry">
                      {language === 'ur' ? 'جنرل او پی ڈی معلومات' : 'General Outpatient Inquiry'}
                    </option>
                    <option value="Diagnostic Lab & Fasting Tariff">
                      {language === 'ur' ? 'لیب ٹیسٹ اور فیس' : 'Diagnostic Lab & Fasting Tariff'}
                    </option>
                    <option value="Dental Suite Sterilization & Cost">
                      {language === 'ur' ? 'ڈینٹل کلینک' : 'Dental Suite Procedures'}
                    </option>
                    <option value="Wheelchair & Accessibility Assistance">
                      {language === 'ur' ? 'وہیل چیئر اور بزرگوں کی سہولت' : 'Wheelchair & Accessibility'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[13px] font-semibold text-ink mb-1.5">
                  {language === 'ur'
                    ? 'آپ کا پیغام * (حساس طبی ریکارڈ یا شناختی کارڈ نمبر درج نہ کریں)'
                    : 'Your Message * (Do not include sensitive medical history or CNIC)'}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  placeholder={
                    language === 'ur'
                      ? 'مثلاً ہفتے کی شام ایکو ٹیسٹ کے اوقات اور فیس کے بارے میں معلوم کرنا ہے۔'
                      : 'e.g. Please confirm whether Saturday afternoon echocardiography requires a prior booking.'
                  }
                  className={`w-full rounded border px-3 py-2 text-[14px] bg-paper text-ink ${
                    errors.message ? 'border-danger bg-danger-bg' : 'border-rule-strong'
                  }`}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-[13px] text-danger font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 min-h-[46px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'ur' ? 'ڈیمو پیغام جمع کرائیں' : 'Submit Demo Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right 5 Cols: Arrival Diagram & Hours */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-surface border border-rule-strong rounded-md overflow-hidden">
            <div className="px-4 py-3 bg-tint border-b border-rule flex items-center justify-between text-[13px]">
              <span className="font-bold text-ink">
                {language === 'ur' ? 'گلبرگ III آمد کا نقشہ (فرضی)' : 'Arrival diagram · Gulberg III (fictional)'}
              </span>
              <span className="font-semibold text-signal">DEMO MAP</span>
            </div>
            <ArrivalMapSVG />
            <div className="p-4 space-y-1.5 text-[14px] text-ink-2 border-t border-rule">
              <p className="font-bold text-ink">{t(CLINIC_INFO.address)}</p>
              <p>{t(CLINIC_INFO.landmark)}</p>
              <p className="text-[13px] text-ink-3 pt-1">
                {language === 'ur'
                  ? 'یہ نقشہ اور پتہ صرف ڈیمو کے لیے فرضی ہے۔'
                  : 'Fictional demonstration address; no active clinic operates at this plot.'}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-rule-strong rounded-md p-5 space-y-3">
            <h3 className="text-[16px] font-bold text-ink">
              {language === 'ur' ? 'اوقاتِ کار (PKT)' : 'Opening hours (PKT)'}
            </h3>
            <dl className="divide-y divide-rule text-[14px] tabular-nums">
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-ink-2">{language === 'ur' ? 'او پی ڈی (پیر–ہفتہ)' : 'Specialist OPD (Mon–Sat)'}</dt>
                <dd className="font-semibold text-ink">09:00 AM – 09:00 PM</dd>
              </div>
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-ink-2">{language === 'ur' ? 'نہار منہ لیب' : 'Diagnostic Lab'}</dt>
                <dd className="font-semibold text-ink">08:00 AM – 09:30 PM</dd>
              </div>
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-ink-2">{language === 'ur' ? 'ڈینٹل سویٹ' : 'Dental Suite'}</dt>
                <dd className="font-semibold text-ink">11:00 AM – 08:30 PM</dd>
              </div>
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-ink-2">{language === 'ur' ? 'اتوار' : 'Sunday'}</dt>
                <dd className="font-semibold text-signal">
                  {language === 'ur' ? 'صرف لیب 09:00–14:00' : 'Lab only 09:00 AM – 02:00 PM'}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
};
