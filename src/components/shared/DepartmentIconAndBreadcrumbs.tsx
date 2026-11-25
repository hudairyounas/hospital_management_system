import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  HeartPulse,
  Baby,
  Smile,
  ShieldCheck,
  Bone,
  Sparkles,
  Microscope,
  ChevronRight,
} from 'lucide-react';
import { Department } from '../../types';
import { useApp } from '../../context/AppContext';

export const DepartmentIcon: React.FC<{ name: Department['iconName']; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  switch (name) {
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Bone':
      return <Bone className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Microscope':
      return <Microscope className={className} />;
    default:
      return <Stethoscope className={className} />;
  }
};

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const { language } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="py-3 text-[13px] text-ink-3">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-ink hover:underline underline-offset-4">
            {language === 'ur' ? 'سرورق' : 'Home'}
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 opacity-60 rtl:rotate-180" aria-hidden="true" />
            {item.to ? (
              <Link to={item.to} className="hover:text-ink hover:underline underline-offset-4">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-ink" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
