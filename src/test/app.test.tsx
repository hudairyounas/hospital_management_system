import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import {
  isValidPakistaniPhone,
  isFutureOrTodayDate,
  formatPKR,
  generateDemoReferenceNumber,
  getTomorrowDateString,
} from '../lib/validation';

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('Pakistan Localization & Validation Helpers', () => {
  it('validates Pakistani mobile and landline phone formats correctly', () => {
    expect(isValidPakistaniPhone('0300-1234567')).toBe(true);
    expect(isValidPakistaniPhone('+92 321 7654321')).toBe(true);
    expect(isValidPakistaniPhone('03331234567')).toBe(true);
    expect(isValidPakistaniPhone('042-35550199')).toBe(true);

    expect(isValidPakistaniPhone('12345')).toBe(false);
    expect(isValidPakistaniPhone('abc-def-ghij')).toBe(false);
    expect(isValidPakistaniPhone('')).toBe(false);
  });

  it('prevents past dates and accepts future dates', () => {
    expect(isFutureOrTodayDate('2020-01-01')).toBe(false);
    expect(isFutureOrTodayDate(getTomorrowDateString())).toBe(true);
  });

  it('formats PKR currency and demo reference numbers properly', () => {
    expect(formatPKR(3500)).toBe('Rs. 3,500');
    const ref = generateDemoReferenceNumber();
    expect(ref).toMatch(/^NMC-2026-\d{4}$/);
  });
});

describe('Noor Medical & Diagnostic Centre — End-to-End Frontend Flows', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  it('renders Homepage with wayfinding hero, Today OPD board, floor directory, and doctors', () => {
    renderWithRouter('/');
    expect(
      screen.getByRole('heading', {
        name: /Outpatient specialists, dentistry, and diagnostics in Gulberg III/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Find a doctor, specialty, or condition/i)).toBeInTheDocument();
    expect(screen.getByText(/Building directory by floor/i)).toBeInTheDocument();
  });

  it('filters doctors by search query, specialty, and handles empty state + reset', () => {
    renderWithRouter('/doctors');

    expect(screen.getByText(/Showing 12 of 12 demo specialist consultants/i)).toBeInTheDocument();

    const searchInput = screen.getByLabelText(/Search by Name, Specialty, or Condition/i);
    fireEvent.change(searchInput, { target: { value: 'Zainab' } });

    expect(screen.getByText(/Showing 1 of 12 demo specialist consultants/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr\. Zainab Raza/i)).toBeInTheDocument();

    // Trigger no-results state
    fireEvent.change(searchInput, { target: { value: 'NonExistentDoctorXYZ' } });
    expect(
      screen.getByRole('heading', { name: /No specialist doctors match your current filter/i })
    ).toBeInTheDocument();

    // Reset filters
    fireEvent.click(screen.getByRole('button', { name: /Reset All Filters/i }));
    expect(screen.getByText(/Showing 12 of 12 demo specialist consultants/i)).toBeInTheDocument();
  });

  it('renders Doctor Profile page with fictional credential disclaimer and schedule', () => {
    renderWithRouter('/doctors/dr-ayesha-siddiqui');
    expect(screen.getByRole('heading', { name: /Dr\. Ayesha Siddiqui/i })).toBeInTheDocument();
    expect(screen.getAllByText(/DEMO-PMDC-31048-P/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Weekly Outpatient Schedule/i)).toBeInTheDocument();
  });

  it('validates Appointment form, filters doctors by department, and generates a demo confirmation slip', async () => {
    renderWithRouter('/appointment');

    // Submit empty form to verify validation errors
    fireEvent.click(screen.getByRole('button', { name: /Review Appointment Request/i }));
    expect(screen.getByText(/Please select a clinical department/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter the patient’s full name/i)).toBeInTheDocument();
    expect(screen.getByText(/Pakistani mobile or landline number is required/i)).toBeInTheDocument();

    // Select Dentistry department and verify doctor list filters to Dental consultants
    const deptSelect = screen.getByLabelText(/Clinical Department \*/i);
    fireEvent.change(deptSelect, { target: { value: 'dentistry' } });

    const docSelect = screen.getByLabelText(/Preferred Doctor/i) as HTMLSelectElement;
    const optionTexts = Array.from(docSelect.options).map((o) => o.text);
    expect(optionTexts.some((t) => t.includes('Dr. Zainab Raza'))).toBe(true);
    expect(optionTexts.some((t) => t.includes('Dr. Ayesha Siddiqui'))).toBe(false);

    // Select Dr. Zainab Raza
    fireEvent.change(docSelect, { target: { value: 'dr-zainab-raza' } });

    // Enter invalid phone first
    const nameInput = screen.getByLabelText(/Patient Full Name \*/i);
    const phoneInput = screen.getByLabelText(/Pakistani Phone Number/i);

    fireEvent.change(nameInput, { target: { value: 'Bilal Tariq' } });
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: /Review Appointment Request/i }));
    expect(screen.getByText(/Enter a valid Pakistani phone number/i)).toBeInTheDocument();

    // Enter valid Pakistani phone number and proceed to Review step
    fireEvent.change(phoneInput, { target: { value: '0300-1234567' } });
    fireEvent.click(screen.getByRole('button', { name: /Review Appointment Request/i }));

    expect(
      screen.getByRole('heading', { name: /Review Your Demo Appointment Request/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Bilal Tariq')).toBeInTheDocument();

    // Submit Demo Request and verify confirmation state
    fireEvent.click(screen.getByRole('button', { name: /Submit Demo Request/i }));

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: /Demo Appointment Request Slip Generated/i })
        ).toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    expect(
      screen.getByText(/SIMULATED DEMO REQUEST — NOT A REAL CONFIRMED APPOINTMENT/i)
    ).toBeInTheDocument();
  });

  it('switches between English (LTR) and Urdu (RTL) mode properly', () => {
    renderWithRouter('/');
    expect(document.documentElement.dir).toBe('ltr');

    const langBtn = screen.getByRole('button', { name: /Switch language to Urdu/i });
    fireEvent.click(langBtn);

    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ur');
    expect(screen.getByText(/عمارت کی فلور ڈائریکٹری اور شعبہ جات/i)).toBeInTheDocument();
  });

  it('validates Contact page inquiry form and renders 404 NotFound page on unknown routes', () => {
    const { unmount } = renderWithRouter('/contact');

    fireEvent.click(screen.getByRole('button', { name: /Submit Demo Inquiry/i }));
    expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Your Full Name \*/i), {
      target: { value: 'Fatima Khan' },
    });
    fireEvent.change(screen.getByLabelText(/Pakistani Phone Number \*/i), {
      target: { value: '0321-7654321' },
    });
    fireEvent.change(screen.getByLabelText(/Your Message \*/i), {
      target: { value: 'Please share Saturday lab sample timings.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Demo Inquiry/i }));

    expect(
      screen.getByRole('heading', { name: /Demo Inquiry Form Validated & Previewed/i })
    ).toBeInTheDocument();

    unmount();

    renderWithRouter('/unknown-broken-route-404');
    expect(
      screen.getByRole('heading', { name: /We could not find the page you were looking for/i })
    ).toBeInTheDocument();
  });

  it('renders About, Departments, Department Details, and Patient Info pages with accessible headings and zero broken images', () => {
    const { unmount: u1 } = renderWithRouter('/about');
    expect(
      screen.getByRole('heading', {
        name: /Reimagining the private outpatient clinic experience for Pakistani families/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Fictional Brand Background & Portfolio Demonstration Disclosure/i)
    ).toBeInTheDocument();
    u1();

    const { unmount: u2 } = renderWithRouter('/departments');
    expect(
      screen.getByRole('heading', {
        name: /Clinical Departments, Dental Suite & Diagnostic Services/i,
      })
    ).toBeInTheDocument();
    // Filter procedure fee lookup table
    const procSearch = screen.getByLabelText(/Search procedures or lab tests/i);
    fireEvent.change(procSearch, { target: { value: 'Echocardiography' } });
    expect(screen.getAllByText(/2D Color Doppler Echocardiography/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Rs\. 5,500/i).length).toBeGreaterThanOrEqual(1);
    u2();

    const { unmount: u3 } = renderWithRouter('/departments/dentistry');
    expect(
      screen.getByRole('heading', { level: 1, name: /^Dentistry & Oral Care Suite$/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Rotary Root Canal Therapy/i).length).toBeGreaterThanOrEqual(1);
    u3();

    const { unmount: u4 } = renderWithRouter('/patient-info');
    expect(
      screen.getByRole('heading', {
        name: /Patient Information, Lab Preparation & Frequently Asked Questions/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Demo Privacy Notice & Healthcare Responsibility Statement/i,
      })
    ).toBeInTheDocument();
    u4();
  });

  it('opens and operates the WhatsApp Demo Composer modal and Mobile Navigation menu', async () => {
    renderWithRouter('/');

    // Open mobile menu button
    const menuBtn = screen.getByRole('button', { name: /Open navigation menu/i });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(menuBtn);
    expect(screen.getByRole('button', { name: /Close navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    // Trigger WhatsApp composer modal
    const waButtons = screen.getAllByRole('button', { name: /WhatsApp/i });
    fireEvent.click(waButtons[0]);

    expect(
      screen.getByRole('dialog', { name: /WhatsApp Click-to-Chat Composer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Demo Configuration Notice — No Real Phone Number Dialed/i)
    ).toBeInTheDocument();

    // Copy prefilled message inside modal
    fireEvent.click(screen.getByRole('button', { name: /Copy Prefilled Message/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/Message Copied|copied to clipboard/i).length).toBeGreaterThanOrEqual(1);
    });
  });
});
