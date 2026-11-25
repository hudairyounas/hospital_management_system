import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_INFO, FACILITY_WINGS } from '../../data/clinic';
import { BuildingCrossSectionSVG } from '../../components/shared/WayfindingVisuals';
import { Breadcrumbs } from '../../components/shared/DepartmentIconAndBreadcrumbs';
import { SEOHead } from '../../components/shared/SEOHead';

export const AboutPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={language === 'ur' ? 'نور میڈیکل سینٹر کا تعارف اور سہولیات' : 'About Noor Medical Centre — Building, Care Standards & Demo Notice'}
        description="Learn about the fictional Noor Medical & Diagnostic Centre showcase in Gulberg III, Lahore: architectural floor layout, care standards, and portfolio demo disclosure."
      />

      <Breadcrumbs items={[{ label: language === 'ur' ? 'ہسپتال کا تعارف' : 'About the building' }]} />

      {/* Asymmetric Editorial Intro */}
      <section className="mt-2 pb-10 border-b border-ink grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 space-y-4">
          <p className="text-[13px] font-semibold text-ink-3">
            {language === 'ur' ? 'فرضی ڈیمو ادارہ · گلبرگ III، لاہور' : 'Fictional demonstration brand · Gulberg III, Lahore'}
          </p>
          <h1 className="text-[28px] sm:text-[38px] font-bold text-ink tracking-[-0.02em] leading-[1.1]">
            {language === 'ur'
              ? 'پاکستانی خاندانوں کے لیے ایک پرسکون، شفاف اور منظم آؤٹ پیشنٹ عمارت کا تصور۔'
              : 'Reimagining the private outpatient clinic experience for Pakistani families.'}
          </h1>
        </div>
        <div className="lg:col-span-5">
          <p className="text-[15px] text-ink-2 leading-relaxed">
            {language === 'ur'
              ? 'نور میڈیکل اینڈ ڈائیگناسٹک سینٹر ایک فرضی پورٹ فولیو ڈیمو ہے جو ظاہر کرتا ہے کہ واضح اوقاتِ کار، پیشگی فیس (PKR) اور منظم فلور وے فائنڈنگ سے مریضوں کے لیے کلینک وزٹ کیسے آسان بنایا جا سکتا ہے۔'
              : 'Noor Medical & Diagnostic Centre is a fictional demonstration brand built for the Pakistani private healthcare market—showing how clear room schedules, upfront PKR fees, and step-free spatial planning build trust without exaggerated claims.'}
          </p>
        </div>
      </section>

      {/* 3-Column Editorial Principles (no card boxes — ruled top borders) */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="pt-4 border-t-2 border-ink space-y-2">
          <h2 className="text-[18px] font-bold text-ink">
            {language === 'ur' ? 'ایک وقت میں ایک مریض' : 'One-patient-at-a-time privacy'}
          </h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            {language === 'ur'
              ? 'مشاورتی کمروں میں غیر متعلقہ افراد کے داخلے کی اجازت نہیں تاکہ خاندان اطمینان سے ڈاکٹر سے گفتگو کر سکیں۔'
              : 'Acoustic-private consultation rooms with a strict single-family entry rule so patients discuss concerns without hallway interruptions.'}
          </p>
        </div>

        <div className="pt-4 border-t-2 border-ink space-y-2">
          <h2 className="text-[18px] font-bold text-ink">
            {language === 'ur' ? 'ایک ہی چھت تلے تشخیص' : 'Integrated outpatient campus'}
          </h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            {language === 'ur'
              ? 'آٹھ طبی شعبہ جات، چار چیئر ڈینٹل سویٹ اور صبح ۸ بجے کھلنے والی لیبارٹری ایک ہی دو منزلہ عمارت میں۔'
              : 'Eight specialist clinics, a 4-chair Class-B sterilized dental suite, and an 8:00 AM fasting lab under one step-free roof.'}
          </p>
        </div>

        <div className="pt-4 border-t-2 border-ink space-y-2">
          <h2 className="text-[18px] font-bold text-ink">
            {language === 'ur' ? 'شفافیت اور اخلاقی معیار' : 'Ethical restraint & transparent fees'}
          </h2>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            {language === 'ur'
              ? 'ہر پروسیجر سے پہلے تحریری فیس کا تخمینہ، اور غیر ضروری ٹیسٹوں یا جعلی ایوارڈ دعوؤں سے اجتناب۔'
              : 'Written PKR cost estimates before dental or diagnostic procedures, and zero fabricated accreditations, awards, or cure guarantees.'}
          </p>
        </div>
      </section>

      {/* Architectural Cross-Section Diagram */}
      <section className="mt-12 bg-surface border border-rule-strong rounded-md p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[20px] font-bold text-ink">
            {language === 'ur' ? 'عمارت کا فلور کراس سیکشن' : 'Campus floor-plan cross-section'}
          </h2>
          <span className="text-[13px] text-ink-3">{t(CLINIC_INFO.address)}</span>
        </div>
        <BuildingCrossSectionSVG />
      </section>

      {/* Four Wings — Ruled 2x2 Directory */}
      <section className="mt-12 space-y-5">
        <h2 className="text-[22px] font-bold text-ink pb-2 border-b border-ink">
          {language === 'ur' ? 'عمارت کے چاروں کلینیکل ونگز' : 'Inside the four campus wings'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {FACILITY_WINGS.map((wing) => (
            <article key={wing.id} className="pb-6 border-b border-rule space-y-2.5">
              <p className="text-[13px] font-semibold text-action">{t(wing.floor)}</p>
              <h3 className="text-[18px] font-bold text-ink">{t(wing.name)}</h3>
              <p className="text-[14px] text-ink-2 leading-relaxed">{t(wing.summary)}</p>
              <ul className="pt-2 space-y-1 text-[14px] text-ink">
                {wing.features.map((feat, idx) => (
                  <li key={idx}>• {t(feat)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Fictional Brand Governance Disclosure */}
      <section className="mt-12 bg-tint border border-rule-strong rounded-md p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-signal shrink-0 mt-1" />
          <div className="space-y-2">
            <h2 className="text-[19px] font-bold text-ink">
              {language === 'ur'
                ? 'فرضی تاریخ اور پورٹ فولیو ڈیمو کی وضاحت'
                : 'Fictional Brand Background & Portfolio Demonstration Disclosure'}
            </h2>
            <p className="text-[14px] text-ink-2 leading-relaxed max-w-[78ch]">
              {language === 'ur'
                ? 'نور میڈیکل اینڈ ڈائیگناسٹک سینٹر ایک فرضی برانڈ ہے جو پاکستانی ہیلتھ کیئر مارکیٹ کے لیے بطور فرنٹ اینڈ پورٹ فولیو تیار کیا گیا ہے۔ یہاں درج تمام ڈاکٹرز، DEMO-PMDC نمبرز اور گلبرگ III لاہور کا پتہ فرضی ہے۔ ہم کسی قسم کے جعلی سرٹیفکیٹ، ایوارڈز یا فرضی مریضوں کے تبصرے پیش نہیں کرتے۔'
                : 'Noor Medical & Diagnostic Centre is a fictional demonstration brand created to showcase healthcare frontend design for the Pakistani market. All campus wings, doctors, DEMO-PMDC registration codes, and Gulberg III Lahore contact details are illustrative. This project intentionally avoids fabricated regulatory accreditations, invented awards, or unverifiable clinical outcomes.'}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-rule flex flex-wrap gap-3">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded border border-ink text-[14px] font-semibold text-ink hover:bg-surface"
          >
            <span>{language === 'ur' ? 'ڈاکٹرز کی ڈائریکٹری دیکھیں' : 'Browse demo consultants'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded bg-action text-surface text-[14px] font-semibold hover:bg-action-hover"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'ur' ? 'اپائنٹمنٹ سمولیٹر چلائیں' : 'Try appointment simulator'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
