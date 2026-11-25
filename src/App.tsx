import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { TopUtilityBar, Header, Footer, MobileBottomActionBar } from './components/layout/LayoutChrome';
import { WhatsAppModal, SavedBookingsDrawer, ToastBanner } from './components/shared/ModalsAndDrawers';
import { ScrollToTop } from './components/shared/SEOHead';
import { HomePage } from './pages/Home/HomePage';
import { AboutPage } from './pages/About/AboutPage';
import { DoctorsPage } from './pages/Doctors/DoctorsPage';
import { DoctorDetailsPage } from './pages/DoctorDetails/DoctorDetailsPage';
import { DepartmentsPage } from './pages/Departments/DepartmentsPage';
import { DepartmentDetailsPage } from './pages/DepartmentDetails/DepartmentDetailsPage';
import { AppointmentPage } from './pages/Appointment/AppointmentPage';
import { PatientInfoPage } from './pages/PatientInfo/PatientInfoPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-ink focus:text-surface focus:text-[14px] focus:font-semibold"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <TopUtilityBar />
      <Header />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:slug" element={<DepartmentDetailsPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/patient-info" element={<PatientInfoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomActionBar />
      <WhatsAppModal />
      <SavedBookingsDrawer />
      <ToastBanner />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
};

export default App;
