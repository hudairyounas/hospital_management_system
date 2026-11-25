import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, ALL_SERVICES } from '../../data/departments';
import { DOCTORS } from '../../data/doctors';
import { formatPKR } from '../../lib/validation';
import { WING_META } from '../../lib/schedule';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { SEOHead } from '../../components/shared/SEOHead';

export const DepartmentsPage: React.FC = () => {
  const { language, t } = useApp();
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const groundDepts = DEPARTMENTS.filter((d) => WING_META[d.slug].floor === 'Ground Floor');
  const firstDepts = DEPARTMENTS.filter((d) => WING_META[d.slug].floor === 'First Floor');

  const filteredServices = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    return ALL_SERVICES.filter((srv) => {
      if (selectedCategory !== 'all' && srv.category !== selectedCategory) {
        return false;
      }
      if (q) {
        const text = `${srv.name.en} ${srv.name.ur} ${srv.description.en} ${srv.description.ur}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [serviceSearch, selectedCategory]);

  const renderFloorSection = (title: string, subtitle: string, depts: typeof DEPARTMENTS) => (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2.5 border-b border-ink">
        <h2 className="text-[20px] font-bold text-ink">{title}</h2>
        <span className="text-[13px] text-ink-3 tabular-nums">{subtitle}</span>
      </div>

      <div className="border border-rule-strong rounded-md bg-surface divide-y divide-rule">
        {depts.map((dept) => {
          const wing = WING_META[dept.slug];
          const deptDoctors = DOCTORS.filter((d) => d.departmentSlug === dept.slug);
          return (
            <article
              key={dept.slug}
              className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
              style={{ borderInlineStart: `4px solid ${wing.color}` }}
            >
              <div className="lg:col-span-5 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-[12px] font-semibold px-2 py-0.5 rounded-sm tabular-nums"
                    style={{ backgroundColor: wing.softBg, color: wing.color }}
                  >
                    {wing.roomRange}
                  </span>
                  <span className="text-[13px] text-ink-3">{t(dept.floorLocation)}</span>
                </div>
                <h3 className="text-[19px] font-bold text-ink">
                  <Link
                    to={`/departments/${dept.slug}`}
                    className="hover:text-action hover:underline underline-offset-4"
                  >
                    {t(dept.name)}
                  </Link>
                </h3>
                <p className="text-[14px] text-ink-2 leading-relaxed">{t(dept.description)}</p>
                <p className="text-[13px] text-ink-3 pt-1">
                  <strong className="text-ink">{language === 'ur' ? 'ڈاکٹرز:' : 'Consultants:'}</strong>{' '}
                  {deptDoctors.map((d) => t(d.name)).join(' · ')}
                </p>
              </div>

              {/* Dotted-leader mini service list */}
              <div className="lg:col-span-5 space-y-2">
                <p className="text-[13px] font-semibold text-ink-2">
                  {language === 'ur' ? 'متوقع فیس (PKR):' : 'Indicative services (PKR):'}
                </p>
                <ul className="space-y-1.5 text-[14px]">
                  {dept.services.map((srv) => (
                    <li key={srv.id} className="flex items-baseline gap-2">
                      <span className="text-ink-2">{t(srv.name)}</span>
                      <span className="flex-1 tariff-leader h-3 min-w-[16px]" aria-hidden="true" />
                      <span className="font-semibold text-ink tabular-nums whitespace-nowrap">
                        {formatPKR(srv.feePKR)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2.5">
                <Link
                  to={`/appointment?department=${dept.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 min-h-[42px] rounded bg-action hover:bg-action-hover text-surface text-[13px] font-semibold transition-colors lg:w-full"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'بک کریں' : 'Book slot'}</span>
                </Link>
                <Link
                  to={`/departments/${dept.slug}`}
                  className="inline-flex items-center justify-center px-3 min-h-[40px] rounded border border-rule-strong hover:bg-tint text-ink text-[13px] font-semibold transition-colors lg:w-full"
                >
                  {language === 'ur' ? 'مکمل تفصیل' : 'Wing details'}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={language === 'ur' ? 'طبی شعبہ جات، سروسز اور فیس شیڈول' : 'Clinical Departments, Dental Suite & Diagnostic Services'}
        description="Explore 8 outpatient clinical departments, dental procedures, and diagnostic lab tests with transparent PKR pricing at Noor Medical Centre Lahore."
      />

      <Breadcrumbs items={[{ label: language === 'ur' ? 'شعبہ جات اور فیس' : 'Departments & fees' }]} />

      {/* Clean Editorial Page Header */}
      <div className="mt-2 pb-6 border-b border-ink flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-[28px] sm:text-[36px] font-bold text-ink tracking-[-0.02em] leading-[1.12]">
            {language === 'ur'
              ? 'طبی شعبہ جات، ڈینٹل سویٹ اور ڈائیگناسٹک فیس'
              : 'Clinical Departments, Dental Suite & Diagnostic Services'}
          </h1>
          <p className="text-[15px] text-ink-2">
            {language === 'ur'
              ? 'گراؤنڈ اور فرسٹ فلور کے ۸ شعبہ جات، متعلقہ ڈاکٹرز اور پاکستانی روپے (PKR) میں مکمل ٹیرف۔'
              : 'All eight departments grouped by floor, followed by a searchable PKR fee schedule for consultations, dental procedures, and lab tests.'}
          </p>
        </div>

        <a
          href="#tariff"
          className="text-[14px] font-semibold text-action hover:underline underline-offset-4 shrink-0"
        >
          {language === 'ur' ? 'نیچے مکمل فیس ٹیبل پر جائیں ↓' : 'Jump to fee lookup table ↓'}
        </a>
      </div>

      {/* Floor-grouped Department Directory */}
      <div className="mt-8 space-y-10">
        {renderFloorSection(
          language === 'ur' ? 'گراؤنڈ فلور (بغیر سیڑھیوں کے رسائی)' : 'Ground Floor · Step-free entry',
          'G-01 – G-12 · West Lab',
          groundDepts
        )}
        {renderFloorSection(
          language === 'ur' ? 'فرسٹ فلور (لفٹ اور سیڑھیاں)' : 'First Floor · Lift & stairs',
          '101 – 115 · Suites D-1 – D-4',
          firstDepts
        )}
      </div>

      {/* Searchable Tariff Schedule */}
      <section id="tariff" className="mt-14 scroll-mt-24 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-ink">
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-bold text-ink tracking-[-0.015em]">
              {language === 'ur'
                ? 'فیس اور تشخیصی ٹیسٹ ریٹ لسٹ (PKR)'
                : 'Consultation, Dental & Lab Fee Schedule (PKR)'}
            </h2>
            <p className="text-[14px] text-ink-2 mt-1">
              {language === 'ur'
                ? 'نام یا قسم کے ذریعے ٹیسٹ اور فیس تلاش کریں۔'
                : 'Search any procedure or diagnostic test to view indicative fees and preparation notes.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-ink-3 absolute top-3.5 start-3 pointer-events-none" />
              <input
                type="search"
                aria-label="Search procedures or lab tests"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder={language === 'ur' ? 'ای سی جی، روٹ کینال، سی بی سی...' : 'Search ECG, Root Canal, CBC...'}
                className="w-full sm:w-64 min-h-[42px] rounded border border-rule-strong bg-surface ps-9 pe-3 py-2 text-[14px] text-ink"
              />
            </div>

            <select
              aria-label="Filter services by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="min-h-[42px] rounded border border-rule-strong bg-surface px-3 py-2 text-[14px] text-ink"
            >
              <option value="all">{language === 'ur' ? 'تمام اقسام' : 'All categories'}</option>
              <option value="Consultation">{language === 'ur' ? 'مشاورت' : 'Consultations'}</option>
              <option value="Diagnostic">{language === 'ur' ? 'لیب و تشخیص' : 'Diagnostic & Lab'}</option>
              <option value="Dental">{language === 'ur' ? 'ڈینٹل' : 'Dental'}</option>
              <option value="Procedure">{language === 'ur' ? 'پروسیجرز' : 'Procedures'}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-surface border border-rule-strong rounded-md">
          <table className="w-full text-start border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-rule-strong bg-tint text-ink-2 text-[13px]">
                <th className="py-3 px-4 text-start font-semibold">
                  {language === 'ur' ? 'سروس / ٹیسٹ' : 'Service / test'}
                </th>
                <th className="py-3 px-4 text-start font-semibold">
                  {language === 'ur' ? 'شعبہ' : 'Department'}
                </th>
                <th className="py-3 px-4 text-start font-semibold">
                  {language === 'ur' ? 'دورانیہ اور تیاری' : 'Duration & prep'}
                </th>
                <th className="py-3 px-4 text-end font-semibold">
                  {language === 'ur' ? 'فیس (PKR)' : 'Fee (PKR)'}
                </th>
                <th className="py-3 px-4 text-end font-semibold">
                  {language === 'ur' ? 'بکنگ' : 'Action'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {filteredServices.map((srv) => {
                const parentDept = DEPARTMENTS.find((d) => d.slug === srv.departmentSlug);
                return (
                  <tr key={srv.id} className="hover:bg-paper/60">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-ink">{t(srv.name)}</p>
                      <p className="text-[13px] text-ink-3 mt-0.5">{t(srv.description)}</p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {parentDept && (
                        <Link
                          to={`/departments/${parentDept.slug}`}
                          className="text-[13px] font-semibold text-action hover:underline underline-offset-4"
                        >
                          {t(parentDept.shortName)}
                        </Link>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[13px] text-ink-2">
                      <span className="tabular-nums">~{srv.durationMinutes} min</span>
                      {srv.preparationNote && (
                        <p className="text-signal mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{t(srv.preparationNote)}</span>
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-end font-bold text-ink tabular-nums whitespace-nowrap">
                      {formatPKR(srv.feePKR)}
                    </td>
                    <td className="py-3.5 px-4 text-end whitespace-nowrap">
                      <Link
                        to={`/appointment?department=${srv.departmentSlug}`}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-action hover:underline underline-offset-4"
                      >
                        <span>{language === 'ur' ? 'بک کریں' : 'Request'}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
