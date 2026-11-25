import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, Calendar, UserX } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOCTORS } from '../../data/doctors';
import { DEPARTMENTS } from '../../data/departments';
import { DayOfWeek } from '../../types';
import { isDoctorAvailableToday } from '../../lib/schedule';
import { DoctorCard } from '../../components/doctors/DoctorCard';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { SEOHead } from '../../components/shared/SEOHead';

export const DoctorsPage: React.FC = () => {
  const { language, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const selectedDept = searchParams.get('department') || 'all';
  const selectedDay = searchParams.get('day') || 'all';
  const selectedGender = searchParams.get('gender') || 'all';
  const sortBy = searchParams.get('sort') || 'recommended';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || (key === 'sort' && value === 'recommended')) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const list = DOCTORS.filter((doc) => {
      if (selectedDept !== 'all' && doc.departmentSlug !== selectedDept) {
        return false;
      }

      if (selectedDay === 'today') {
        if (!isDoctorAvailableToday(doc)) return false;
      } else if (selectedDay !== 'all') {
        if (!doc.availableDays.includes(selectedDay as DayOfWeek)) return false;
      }

      if (selectedGender !== 'all' && doc.gender !== selectedGender) {
        return false;
      }

      if (normalizedQuery) {
        const haystack = [
          doc.name.en,
          doc.name.ur,
          doc.title.en,
          doc.title.ur,
          doc.specialtyLabel.en,
          doc.specialtyLabel.ur,
          doc.qualifications,
          ...doc.clinicalFocus.map((f) => `${f.en} ${f.ur}`),
        ]
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });

    if (sortBy === 'fee-asc') {
      return [...list].sort((a, b) => a.consultationFeePKR - b.consultationFeePKR);
    }
    if (sortBy === 'fee-desc') {
      return [...list].sort((a, b) => b.consultationFeePKR - a.consultationFeePKR);
    }
    if (sortBy === 'exp-desc') {
      return [...list].sort((a, b) => b.experienceYears - a.experienceYears);
    }
    return list;
  }, [query, selectedDept, selectedDay, selectedGender, sortBy]);

  const hasActiveFilters =
    Boolean(query.trim()) ||
    selectedDept !== 'all' ||
    selectedDay !== 'all' ||
    selectedGender !== 'all' ||
    sortBy !== 'recommended';

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={language === 'ur' ? 'ماہر ڈاکٹرز کی ڈائریکٹری اور اوقات' : 'Specialist Doctors Directory & OPD Schedules'}
        description="Search and filter fictional demo specialist doctors at Noor Medical Centre Lahore by specialty, availability day, gender, and PKR consultation fee."
      />

      <Breadcrumbs
        items={[{ label: language === 'ur' ? 'ماہر ڈاکٹرز' : 'Doctors directory' }]}
      />

      {/* Editorial Directory Header (no heavy dark banner box) */}
      <div className="mt-2 pb-6 border-b border-ink flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-[28px] sm:text-[36px] font-bold text-ink tracking-[-0.02em] leading-[1.12]">
            {language === 'ur'
              ? 'ماہر ڈاکٹرز اور ہفتہ وار او پی ڈی شیڈول'
              : 'Doctors & weekly OPD schedules'}
          </h1>
          <p className="text-[15px] text-ink-2">
            {language === 'ur'
              ? 'شعبہ، دن، یا ڈاکٹر کے نام سے تلاش کریں۔ تمام اسناد اور DEMO-PMDC نمبرز فرضی ڈیمو ڈیٹا ہیں۔'
              : 'Compare outpatient days (Mon–Sat), rooms, languages, and PKR consultation fees. All profiles and DEMO-PMDC numbers are fictional.'}
          </p>
        </div>

        <Link
          to={selectedDept !== 'all' ? `/appointment?department=${selectedDept}` : '/appointment'}
          className="inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold shrink-0 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>{language === 'ur' ? 'اپائنٹمنٹ فارم' : 'Open appointment form'}</span>
        </Link>
      </div>

      {/* Compact Filter Strip */}
      <section
        aria-label="Doctor directory filters"
        className="mt-6 bg-surface border border-rule-strong rounded-md p-4 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-4">
            <label htmlFor="doctor-search-input" className="block text-[13px] font-semibold text-ink mb-1">
              {language === 'ur' ? 'نام، شعبہ یا مرض تلاش کریں' : 'Search by Name, Specialty, or Condition'}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-ink-3 absolute top-3.5 start-3 pointer-events-none" />
              <input
                id="doctor-search-input"
                type="search"
                value={query}
                onChange={(e) => updateParam('q', e.target.value)}
                placeholder={
                  language === 'ur' ? 'عائشہ، کارڈیالوجی، شوگر...' : 'e.g. Ayesha, Cardiology, Diabetes...'
                }
                className="w-full min-h-[42px] rounded border border-rule-strong bg-paper ps-9 pe-3 py-2 text-[14px] text-ink"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <label htmlFor="doctor-dept-filter" className="block text-[13px] font-semibold text-ink mb-1">
              {language === 'ur' ? 'طبی شعبہ' : 'Department / Specialty'}
            </label>
            <select
              id="doctor-dept-filter"
              value={selectedDept}
              onChange={(e) => updateParam('department', e.target.value)}
              className="w-full min-h-[42px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
            >
              <option value="all">{language === 'ur' ? 'تمام شعبہ جات (۸)' : 'All departments (8)'}</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.slug} value={dept.slug}>
                  {t(dept.name)}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="doctor-day-filter" className="block text-[13px] font-semibold text-ink mb-1">
              {language === 'ur' ? 'دستیابی کا دن' : 'Availability Day'}
            </label>
            <select
              id="doctor-day-filter"
              value={selectedDay}
              onChange={(e) => updateParam('day', e.target.value)}
              className="w-full min-h-[42px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
            >
              <option value="all">{language === 'ur' ? 'کوئی بھی دن' : 'Any day'}</option>
              <option value="today">{language === 'ur' ? 'آج کلینک میں' : 'In clinic today'}</option>
              <option value="Monday">{language === 'ur' ? 'پیر' : 'Monday'}</option>
              <option value="Tuesday">{language === 'ur' ? 'منگل' : 'Tuesday'}</option>
              <option value="Wednesday">{language === 'ur' ? 'بدھ' : 'Wednesday'}</option>
              <option value="Thursday">{language === 'ur' ? 'جمعرات' : 'Thursday'}</option>
              <option value="Friday">{language === 'ur' ? 'جمعہ' : 'Friday'}</option>
              <option value="Saturday">{language === 'ur' ? 'ہفتہ' : 'Saturday'}</option>
            </select>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="doctor-gender-filter" className="block text-[13px] font-semibold text-ink mb-1">
              {language === 'ur' ? 'ڈاکٹر' : 'Gender'}
            </label>
            <select
              id="doctor-gender-filter"
              value={selectedGender}
              onChange={(e) => updateParam('gender', e.target.value)}
              className="w-full min-h-[42px] rounded border border-rule-strong bg-paper px-2 py-2 text-[14px] text-ink"
            >
              <option value="all">{language === 'ur' ? 'سب' : 'All'}</option>
              <option value="Female">{language === 'ur' ? 'خاتون' : 'Female'}</option>
              <option value="Male">{language === 'ur' ? 'مرد' : 'Male'}</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="doctor-sort-select" className="block text-[13px] font-semibold text-ink mb-1">
              {language === 'ur' ? 'ترتیب' : 'Sort By'}
            </label>
            <select
              id="doctor-sort-select"
              value={sortBy}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="w-full min-h-[42px] rounded border border-rule-strong bg-paper px-3 py-2 text-[14px] text-ink"
            >
              <option value="recommended">{language === 'ur' ? 'تجویز کردہ' : 'Recommended'}</option>
              <option value="fee-asc">{language === 'ur' ? 'فیس: کم سے زیادہ' : 'Fee: Low to high'}</option>
              <option value="fee-desc">{language === 'ur' ? 'فیس: زیادہ سے کم' : 'Fee: High to low'}</option>
              <option value="exp-desc">{language === 'ur' ? 'تجربہ: سب سے زیادہ' : 'Most senior'}</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-rule flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-ink-2 font-medium tabular-nums" role="status" aria-live="polite">
            {language === 'ur'
              ? `کل ${DOCTORS.length} میں سے ${filteredDoctors.length} ماہر ڈاکٹرز دکھائے جا رہے ہیں`
              : `Showing ${filteredDoctors.length} of ${DOCTORS.length} demo specialist consultants`}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-action hover:underline underline-offset-4"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'تمام فلٹرز ختم کریں' : 'Clear all filters'}</span>
            </button>
          )}
        </div>
      </section>

      {/* Roster Sheet or Empty State */}
      {filteredDoctors.length === 0 ? (
        <div className="mt-8 bg-surface rounded-md border border-rule-strong p-8 sm:p-10 text-center max-w-xl mx-auto space-y-4">
          <UserX className="w-7 h-7 text-ink-3 mx-auto" />
          <h2 className="text-[20px] font-bold text-ink">
            {language === 'ur'
              ? 'اس فلٹر کے مطابق کوئی ڈاکٹر نہیں ملا'
              : 'No specialist doctors match your current filter'}
          </h2>
          <p className="text-[14px] text-ink-2">
            {language === 'ur'
              ? 'تلاش کے الفاظ تبدیل کریں یا تمام فلٹرز ری سیٹ کر کے تمام ۱۲ کنسلٹنٹ ڈاکٹرز دیکھیں۔'
              : 'Broaden your search keyword, choose "Any day", or reset filters to view all 12 demo consultants.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded bg-action text-surface text-[14px] font-semibold hover:bg-action-hover"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'ur' ? 'تمام فلٹرز صاف کریں' : 'Reset All Filters'}</span>
            </button>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded border border-ink text-[14px] font-semibold text-ink hover:bg-tint"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'ur' ? 'جنرل اپائنٹمنٹ فارم' : 'Request general appointment'}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 border border-rule-strong rounded-md overflow-hidden bg-surface">
          {/* Desktop Roster Column Header */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 px-5 py-2.5 bg-tint border-b border-rule-strong text-[13px] font-semibold text-ink-2">
            <div className="lg:col-span-5">
              {language === 'ur' ? 'ڈاکٹر اور قابلیت' : 'Consultant & credentials'}
            </div>
            <div className="lg:col-span-4">
              {language === 'ur' ? 'ہفتہ وار او پی ڈی (پیر تا ہفتہ) اور اگلا وقت' : 'Weekly OPD (Mon–Sat) & next session'}
            </div>
            <div className="lg:col-span-3 text-end">
              {language === 'ur' ? 'فیس (PKR) اور بکنگ' : 'Fee (PKR) & booking'}
            </div>
          </div>

          <div>
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
