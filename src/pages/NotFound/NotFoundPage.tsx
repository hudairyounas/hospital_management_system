import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SEOHead } from '../../components/shared/SEOHead';

export const NotFoundPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 space-y-6">
      <SEOHead
        title={language === 'ur' ? 'صفحہ نہیں ملا (404)' : 'Page Not Found (404)'}
        description="The requested page could not be found on the Noor Medical & Diagnostic Centre demonstration website."
      />

      <p className="text-[14px] font-bold text-ink-3 tabular-nums">404</p>
      <h1 className="text-[28px] sm:text-[34px] font-bold text-ink tracking-[-0.02em] leading-tight">
        {language === 'ur'
          ? 'مطلوبہ صفحہ موجود نہیں ہے'
          : 'We could not find the page you were looking for'}
      </h1>
      <p className="text-[15px] text-ink-2 leading-relaxed">
        {language === 'ur'
          ? 'ممکن ہے لنک تبدیل ہو گیا ہو۔ آپ نیچے دیے گئے لنکس سے سرورق، ڈاکٹرز ڈائریکٹری یا اپائنٹمنٹ فارم پر جا سکتے ہیں۔'
          : 'The address may be outdated or mistyped. Use the links below to return to the clinic directory.'}
      </p>

      <div className="pt-2 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center px-5 min-h-[46px] rounded bg-action hover:bg-action-hover text-surface text-[14px] font-semibold"
        >
          {language === 'ur' ? 'سرورق پر واپس جائیں' : 'Return to homepage'}
        </Link>
        <Link
          to="/doctors"
          className="inline-flex items-center px-5 min-h-[46px] rounded border border-ink hover:bg-tint text-ink text-[14px] font-semibold"
        >
          {language === 'ur' ? 'ڈاکٹرز کی ڈائریکٹری' : 'Doctors directory'}
        </Link>
        <Link
          to="/departments"
          className="inline-flex items-center px-5 min-h-[46px] rounded border border-rule-strong hover:bg-tint text-ink text-[14px] font-semibold"
        >
          {language === 'ur' ? 'طبی شعبہ جات' : 'Departments & fees'}
        </Link>
        <Link
          to="/appointment"
          className="inline-flex items-center px-5 min-h-[46px] rounded border border-rule-strong hover:bg-tint text-ink text-[14px] font-semibold"
        >
          {language === 'ur' ? 'اپائنٹمنٹ فارم' : 'Request appointment'}
        </Link>
      </div>
    </div>
  );
};
