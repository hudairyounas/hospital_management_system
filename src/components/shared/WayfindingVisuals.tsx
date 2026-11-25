import React from 'react';
import { Doctor } from '../../types';
import { WING_META, getDoctorInitials, getDoctorRoomShort } from '../../lib/schedule';

interface DoctorPlaqueProps {
  doctor: Doctor;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Architectural door-plaque monogram replacing cartoon avatars.
 * Displays consultant initials on their clinical wing's colour bar alongside their room code.
 */
export const DoctorMonogramPlaque: React.FC<DoctorPlaqueProps> = ({ doctor, size = 'md' }) => {
  const wing = WING_META[doctor.departmentSlug];
  const initials = getDoctorInitials(doctor.name.en);
  const room = getDoctorRoomShort(doctor.schedule[0]?.roomNumber || '');

  const sizeClasses =
    size === 'sm'
      ? 'w-11 h-11 text-sm'
      : size === 'lg'
      ? 'w-24 h-24 text-2xl'
      : 'w-14 h-14 text-base';

  return (
    <div
      className={`${sizeClasses} shrink-0 rounded bg-surface border border-rule flex flex-col justify-between overflow-hidden select-none`}
      aria-hidden="true"
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: wing.color }} />
      <div className="flex-1 flex items-center justify-center font-bold tracking-tight text-ink">
        {initials}
      </div>
      {size !== 'sm' && (
        <div
          className="text-[11px] leading-none py-1 text-center font-semibold tabular-nums border-t border-rule"
          style={{ backgroundColor: wing.softBg, color: wing.color }}
        >
          {room}
        </div>
      )}
    </div>
  );
};

/**
 * Technical architectural cross-section of the 2-storey Gulberg III demo building.
 * Communicates actual spatial wayfinding: which clinics sit on Ground Floor vs First Floor,
 * step-free ramp entry, lift access, and 8:00 AM lab entry.
 */
export const BuildingCrossSectionSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div dir="ltr" className="w-full">
    <svg
      viewBox="0 0 640 310"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Architectural floor-plan cross-section of Noor Medical Centre: Ground Floor houses Internal Medicine, Pediatrics, Step-Free Orthopedics, and the 8 AM Diagnostic Lab; First Floor houses Cardiology, All-Female Gynecology South Wing, Dental Suites, and Dermatology."
    className={`w-full h-auto block ${className}`}
  >
    <rect width="640" height="310" fill="#FFFFFF" />
    {/* Subtle drafting grid */}
    <path d="M0 30H640M0 155H640M0 280H640" stroke="#ECEFE9" strokeWidth="1" />

    {/* Outer building frame */}
    <rect x="24" y="24" width="592" height="248" stroke="#11181C" strokeWidth="1.5" fill="#F5F6F3" />

    {/* First Floor Band */}
    <text x="38" y="47" fill="#59676D" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">
      FIRST FLOOR (LIFT &amp; STAIRS)
    </text>
    <line x1="24" y1="56" x2="616" y2="56" stroke="#D7DDD9" strokeWidth="1" />

    {/* 1F Rooms */}
    <g>
      <rect x="36" y="66" width="132" height="76" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="36" y="66" width="132" height="4" fill="#9B2C2C" />
      <text x="46" y="88" fill="#9B2C2C" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">101–104</text>
      <text x="46" y="106" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Cardiology</text>
      <text x="46" y="123" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">ECG &amp; Echo Suite</text>

      <rect x="178" y="66" width="150" height="76" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="178" y="66" width="150" height="4" fill="#74427B" />
      <text x="188" y="88" fill="#74427B" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">108–111</text>
      <text x="188" y="106" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Gynecology</text>
      <text x="188" y="123" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">All-Female South Wing</text>

      <rect x="338" y="66" width="134" height="76" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="338" y="66" width="134" height="4" fill="#2B6CB0" />
      <text x="348" y="88" fill="#2B6CB0" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">D-1 – D-4</text>
      <text x="348" y="106" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Dental Suite</text>
      <text x="348" y="123" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">Class-B Sterilized</text>

      <rect x="482" y="66" width="122" height="76" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="482" y="66" width="122" height="4" fill="#8C5A3C" />
      <text x="492" y="88" fill="#8C5A3C" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">114–115</text>
      <text x="492" y="106" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Dermatology</text>
      <text x="492" y="123" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">Skin &amp; Hair OPD</text>
    </g>

    {/* Floor Slab */}
    <rect x="24" y="152" width="592" height="8" fill="#11181C" />

    {/* Ground Floor Band */}
    <text x="38" y="178" fill="#59676D" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">
      GROUND FLOOR (STEP-FREE RAMP ENTRY FROM MAIN BOULEVARD)
    </text>
    <line x1="24" y1="186" x2="616" y2="186" stroke="#D7DDD9" strokeWidth="1" />

    {/* GF Rooms */}
    <g>
      <rect x="36" y="196" width="132" height="66" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="36" y="196" width="132" height="4" fill="#1B5E5A" />
      <text x="46" y="217" fill="#1B5E5A" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">G-01–G-04</text>
      <text x="46" y="235" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Internal Medicine</text>
      <text x="46" y="250" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">East Courtyard</text>

      <rect x="178" y="196" width="132" height="66" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="178" y="196" width="132" height="4" fill="#B7791F" />
      <text x="188" y="217" fill="#B7791F" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">G-06–G-08</text>
      <text x="188" y="235" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Pediatrics</text>
      <text x="188" y="250" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">Separate Child Lounge</text>

      <rect x="320" y="196" width="136" height="66" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="320" y="196" width="136" height="4" fill="#4A5568" />
      <text x="330" y="217" fill="#4A5568" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">G-10–G-12</text>
      <text x="330" y="235" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Orthopedics</text>
      <text x="330" y="250" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">Wheelchair Rehab</text>

      <rect x="466" y="196" width="138" height="66" fill="#FFFFFF" stroke="#D7DDD9" />
      <rect x="466" y="196" width="138" height="4" fill="#2F5D50" />
      <text x="476" y="217" fill="#2F5D50" fontSize="11" fontWeight="700" fontFamily="Archivo, sans-serif">WEST LAB · 8 AM</text>
      <text x="476" y="235" fill="#11181C" fontSize="12" fontWeight="600" fontFamily="Archivo, sans-serif">Diagnostics</text>
      <text x="476" y="250" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">Blood Draw &amp; Ultrasound</text>
    </g>

    {/* Ground baseline & caption */}
    <line x1="12" y1="272" x2="628" y2="272" stroke="#11181C" strokeWidth="2" />
    <text x="24" y="295" fill="#59676D" fontSize="10.5" fontFamily="Archivo, sans-serif">
      Schematic wayfinding diagram · Fictional demo campus (Plot 42-B, Main Boulevard, Gulberg III, Lahore)
    </text>
    </svg>
  </div>
);

/**
 * Technical arrival street diagram for the Contact page.
 */
export const ArrivalMapSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div dir="ltr" className="w-full">
    <svg
      viewBox="0 0 480 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Fictional arrival map showing Noor Medical Centre at Plot 42-B on Main Boulevard, Gulberg III, Lahore, 400 metres from Liberty Roundabout Corridor"
    className={`w-full h-auto block ${className}`}
  >
    <rect width="480" height="260" fill="#ECEFE9" />
    {/* City blocks */}
    <rect x="18" y="18" width="152" height="92" fill="#E1E6DF" />
    <rect x="18" y="144" width="152" height="98" fill="#E1E6DF" />
    <rect x="224" y="18" width="238" height="92" fill="#E1E6DF" />
    <rect x="224" y="144" width="238" height="98" fill="#FFFFFF" stroke="#0B4F6C" strokeWidth="2" />

    {/* Roads */}
    <rect x="178" y="0" width="38" height="260" fill="#FFFFFF" />
    <line x1="197" y1="0" x2="197" y2="260" stroke="#9CA8A3" strokeWidth="1.5" strokeDasharray="6 6" />
    <rect x="0" y="116" width="480" height="22" fill="#FFFFFF" />

    {/* Road labels */}
    <text
      x="194"
      y="102"
      fill="#3F4C52"
      fontSize="9"
      fontWeight="700"
      fontFamily="Archivo, sans-serif"
      transform="rotate(-90 194 102)"
    >
      MAIN BOULEVARD
    </text>
    <text x="34" y="131" fill="#59676D" fontSize="9.5" fontWeight="600" fontFamily="Archivo, sans-serif">
      LIBERTY CORRIDOR (400m) →
    </text>

    {/* Campus footprint */}
    <rect x="238" y="158" width="146" height="54" fill="#0B4F6C" />
    <text x="248" y="181" fill="#FFFFFF" fontSize="11.5" fontWeight="700" fontFamily="Archivo, sans-serif">
      NOOR MEDICAL
    </text>
    <text x="248" y="198" fill="#D7E8F0" fontSize="10" fontFamily="Archivo, sans-serif">
      Plot 42-B (Fictional Demo)
    </text>

    {/* Parking & ramp tags */}
    <rect x="394" y="158" width="56" height="54" fill="#F5F6F3" stroke="#9CA8A3" />
    <text x="416" y="184" fill="#11181C" fontSize="13" fontWeight="700" fontFamily="Archivo, sans-serif">P</text>
    <text x="403" y="200" fill="#59676D" fontSize="9" fontFamily="Archivo, sans-serif">Drop-off</text>

    <text x="238" y="232" fill="#3F4C52" fontSize="10" fontFamily="Archivo, sans-serif">
      Step-free ramp entry · Gulberg III, Lahore
    </text>
    </svg>
  </div>
);
