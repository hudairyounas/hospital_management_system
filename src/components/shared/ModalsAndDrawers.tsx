import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  MessageSquare,
  AlertTriangle,
  Trash2,
  Calendar,
  Clock,
  FileText,
  Printer,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPKR } from '../../lib/validation';
import { CLINIC_INFO } from '../../data/clinic';

export const ToastBanner: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 max-w-md bg-ink text-surface px-4 py-3 rounded shadow-modal border border-surface/15 flex items-center gap-3"
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-action text-surface shrink-0">
        <Check className="w-3.5 h-3.5" />
      </span>
      <p className="text-[14px] font-medium">{toast.message}</p>
    </div>
  );
};

export const WhatsAppModal: React.FC = () => {
  const { whatsAppModal, closeWhatsAppModal, language, showToast } = useApp();
  const [messageText, setMessageText] = useState(whatsAppModal.prefillMessage);
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMessageText(whatsAppModal.prefillMessage);
    setCopied(false);
  }, [whatsAppModal.prefillMessage, whatsAppModal.isOpen]);

  useEffect(() => {
    if (!whatsAppModal.isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWhatsAppModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [whatsAppModal.isOpen, closeWhatsAppModal]);

  if (!whatsAppModal.isOpen) return null;

  const encodedMessage = encodeURIComponent(messageText);
  const previewUri = `https://wa.me/923000000199?text=${encodedMessage}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
    } catch {
      // fallback if clipboard blocked
    }
    setCopied(true);
    showToast(
      language === 'ur'
        ? 'واٹس ایپ پیغام کاپی ہو گیا ہے'
        : 'Prefilled WhatsApp inquiry message copied to clipboard'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
    >
      <div className="bg-surface border border-rule-strong rounded-md max-w-lg w-full p-6 shadow-modal">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-rule">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-action shrink-0" />
            <div>
              <h2 id="whatsapp-modal-title" className="text-[18px] font-bold text-ink">
                {language === 'ur'
                  ? 'واٹس ایپ استفسار کمپوزر (ڈیمو)'
                  : 'WhatsApp Click-to-Chat Composer (Demo)'}
              </h2>
              <p className="text-[13px] text-ink-3">{whatsAppModal.contextLabel}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeWhatsAppModal}
            aria-label="Close WhatsApp composer modal"
            className="p-2 rounded text-ink-3 hover:text-ink hover:bg-tint min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3.5 rounded bg-signal-bg border border-signal-border/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-signal shrink-0 mt-0.5" />
          <div className="text-[13px] text-ink-2 space-y-1">
            <p className="font-semibold text-signal">
              {language === 'ur'
                ? 'ڈیمو نمبر پلیس ہولڈر — کوئی حقیقی پیغام ارسال نہیں کیا جا رہا'
                : 'Demo Configuration Notice — No Real Phone Number Dialed'}
            </p>
            <p>
              {language === 'ur'
                ? 'نور میڈیکل سینٹر ایک فرضی پورٹ فولیو ڈیمو ہے۔ کسی حقیقی شخص کے نمبر پر پیغام جانے سے بچنے کے لیے یہاں پری فلڈ میسج کاپی اور لنک پری ویو فراہم کیا گیا ہے۔'
                : 'Noor Medical Centre is a fictional demonstration brand, so we do not open a chat to an unverified phone number. Customize and copy the prefilled message below or inspect the encoded click-to-chat URI.'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="wa-message-box" className="block text-[13px] font-semibold text-ink mb-1.5">
            {language === 'ur'
              ? 'پری فلڈ پیغام (حساس طبی معلومات یا شناختی کارڈ درج نہ کریں):'
              : 'Prefilled inquiry message (do not include sensitive medical history or CNIC):'}
          </label>
          <textarea
            id="wa-message-box"
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full rounded border border-rule-strong bg-paper px-3.5 py-2.5 text-[14px] text-ink"
          />
        </div>

        <div className="mt-3 p-3 rounded bg-tint border border-rule">
          <p className="text-[13px] font-semibold text-ink-2 mb-1">
            {language === 'ur' ? 'انکوڈڈ واٹس ایپ لنک پلیس ہولڈر:' : 'Encoded WhatsApp URI placeholder:'}
          </p>
          <code className="block text-[13px] text-action break-all select-all">{previewUri}</code>
          <p className="text-[13px] text-ink-3 mt-1 tabular-nums">
            {language === 'ur'
              ? `پلیس ہولڈر نمبر: ${CLINIC_INFO.mobileDisplay}`
              : `Configured placeholder: ${CLINIC_INFO.mobileDisplay}`}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeWhatsAppModal}
            className="px-4 min-h-[44px] rounded border border-ink text-[14px] font-semibold text-ink hover:bg-tint"
          >
            {language === 'ur' ? 'بند کریں' : 'Close'}
          </button>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded bg-action text-surface text-[14px] font-semibold hover:bg-action-hover"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>
              {copied
                ? language === 'ur'
                  ? 'پیغام کاپی ہو گیا'
                  : 'Message Copied'
                : language === 'ur'
                ? 'پیغام کاپی کریں'
                : 'Copy Prefilled Message'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const SavedBookingsDrawer: React.FC = () => {
  const {
    isBookingsDrawerOpen,
    setBookingsDrawerOpen,
    savedBookings,
    clearDemoBookings,
    language,
    showToast,
  } = useApp();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isBookingsDrawerOpen) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBookingsDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [isBookingsDrawerOpen, setBookingsDrawerOpen]);

  if (!isBookingsDrawerOpen) return null;

  const handleClear = () => {
    clearDemoBookings();
    showToast(
      language === 'ur'
        ? 'براؤزر سے تمام ڈیمو ریکارڈز حذف کر دیے گئے ہیں'
        : 'Cleared all simulated demo bookings from browser storage',
      'info'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-bookings-title"
    >
      <div className="bg-surface w-full max-w-md h-full shadow-modal border-s border-rule-strong flex flex-col">
        <div className="p-5 border-b border-rule flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-signal">
              {language === 'ur' ? 'لوکل براؤزر ڈیمو ریکارڈ' : 'Browser LocalStorage simulation'}
            </p>
            <h2 id="saved-bookings-title" className="text-[19px] font-bold text-ink">
              {language === 'ur'
                ? `محفوظ ڈیمو سلپس (${savedBookings.length})`
                : `Saved demo slips (${savedBookings.length})`}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setBookingsDrawerOpen(false)}
            aria-label="Close saved demo requests drawer"
            className="p-2 rounded text-ink-3 hover:text-ink hover:bg-tint min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-3.5 bg-tint border-b border-rule flex items-start gap-2.5 text-[13px] text-ink-2">
          <ShieldAlert className="w-4 h-4 text-action shrink-0 mt-0.5" />
          <p>
            {language === 'ur'
              ? 'یہ فرضی درخواستیں صرف آپ کے براؤزر میں محفوظ ہیں۔ کوئی حقیقی اپائنٹمنٹ کنفرم نہیں ہوئی۔'
              : 'These simulated slips exist only in your browser’s LocalStorage. No real clinic or doctor has received them.'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 divide-y divide-rule">
          {savedBookings.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-rule-strong rounded bg-paper">
              <FileText className="w-7 h-7 text-ink-3 mx-auto mb-2" />
              <p className="text-[15px] font-semibold text-ink">
                {language === 'ur' ? 'ابھی کوئی ڈیمو درخواست محفوظ نہیں' : 'No simulated bookings saved yet'}
              </p>
              <p className="text-[13px] text-ink-3 mt-1">
                {language === 'ur'
                  ? 'اپائنٹمنٹ فارم جمع کرانے پر ڈیمو سلپ یہاں محفوظ ہو جائے گی۔'
                  : 'Submit the Appointment Request Simulator form to see your demo reference slip stored here.'}
              </p>
            </div>
          ) : (
            savedBookings.map((item) => (
              <div key={item.referenceNumber} className="py-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold px-2 py-0.5 rounded bg-ink text-surface tabular-nums">
                    {item.referenceNumber}
                  </span>
                  <span className="text-[12px] font-semibold text-signal">
                    {language === 'ur' ? 'ڈیمو درخواست' : 'DEMO REQUEST ONLY'}
                  </span>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{item.doctorName}</p>
                  <p className="text-[13px] text-ink-2">{item.departmentName}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-2 tabular-nums">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-action" />
                    {item.preferredDate}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-action" />
                    {item.timeSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[13px]">
                  <span className="text-ink-3">
                    {language === 'ur' ? 'مریض:' : 'Patient:'}{' '}
                    <strong className="text-ink">{item.patientName}</strong>
                  </span>
                  <span className="font-bold text-ink tabular-nums">
                    {formatPKR(item.consultationFeePKR)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-rule bg-paper flex items-center justify-between gap-3">
          {savedBookings.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 min-h-[40px] rounded text-[13px] font-semibold text-danger hover:bg-danger-bg border border-danger-border"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'ریکارڈ صاف کریں' : 'Clear history'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 min-h-[40px] rounded text-[13px] font-semibold bg-surface border border-rule-strong text-ink hover:bg-tint"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'پرنٹ' : 'Print'}</span>
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setBookingsDrawerOpen(false)}
            className="ms-auto px-4 min-h-[40px] rounded bg-action text-surface text-[13px] font-semibold hover:bg-action-hover"
          >
            {language === 'ur' ? 'بند کریں' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
