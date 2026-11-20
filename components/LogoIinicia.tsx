import Link from 'next/link';

interface LogoProps {
  badgeText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LogoIinicia({ badgeText, size = 'md' }: LogoProps) {
  const heights = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <img
        src="/logo-iinicia.png"
        alt="IINICIA - Instituto de Innovación y Ciencias Aplicadas"
        className={`${heights[size]} w-auto object-contain transition-transform group-hover:scale-105`}
      />
      {badgeText && (
        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0066FF] border border-blue-200 rounded-md">
          {badgeText}
        </span>
      )}
    </Link>
  );
}