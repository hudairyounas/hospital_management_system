import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, DemoAppointmentRecord, BilingualText } from '../types';

interface WhatsAppModalState {
  isOpen: boolean;
  prefillMessage: string;
  contextLabel: string;
}

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info';
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (textObj: BilingualText) => string;
  isRTL: boolean;
  savedBookings: DemoAppointmentRecord[];
  addDemoBooking: (booking: DemoAppointmentRecord) => void;
  clearDemoBookings: () => void;
  isBookingsDrawerOpen: boolean;
  setBookingsDrawerOpen: (open: boolean) => void;
  whatsAppModal: WhatsAppModalState;
  openWhatsAppModal: (prefillMessage: string, contextLabel?: string) => void;
  closeWhatsAppModal: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const STORAGE_LANG_KEY = 'nmc_demo_lang_v1';
const STORAGE_BOOKINGS_KEY = 'nmc_demo_bookings_v1';

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  const [savedBookings, setSavedBookings] = useState<DemoAppointmentRecord[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isBookingsDrawerOpen, setBookingsDrawerOpen] = useState(false);

  const [whatsAppModal, setWhatsAppModal] = useState<WhatsAppModalState>({
    isOpen: false,
    prefillMessage: '',
    contextLabel: '',
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.lang = language;
    htmlEl.dir = language === 'ur' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch {
      // ignore storage restrictions
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'ur' : 'en'));
  }, []);

  const t = useCallback(
    (textObj: BilingualText): string => {
      return textObj[language] || textObj.en;
    },
    [language]
  );

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3600);
  }, []);

  const addDemoBooking = useCallback((booking: DemoAppointmentRecord) => {
    setSavedBookings((prev) => {
      const next = [booking, ...prev].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(next));
      } catch {
        // ignore storage limits
      }
      return next;
    });
  }, []);

  const clearDemoBookings = useCallback(() => {
    setSavedBookings([]);
    try {
      localStorage.removeItem(STORAGE_BOOKINGS_KEY);
    } catch {
      // ignore
    }
  }, []);

  const openWhatsAppModal = useCallback(
    (prefillMessage: string, contextLabel = 'General Outpatient Inquiry') => {
      setWhatsAppModal({
        isOpen: true,
        prefillMessage,
        contextLabel,
      });
    },
    []
  );

  const closeWhatsAppModal = useCallback(() => {
    setWhatsAppModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isRTL: language === 'ur',
        savedBookings,
        addDemoBooking,
        clearDemoBookings,
        isBookingsDrawerOpen,
        setBookingsDrawerOpen,
        whatsAppModal,
        openWhatsAppModal,
        closeWhatsAppModal,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
