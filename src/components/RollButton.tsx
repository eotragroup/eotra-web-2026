import { ArrowRight } from 'lucide-react';

interface RollButtonProps {
  label: string;
  variant?: 'dark' | 'orange';
  size?: 'nav' | 'hero';
  onClick?: () => void;
  className?: string;
}

export function RollButton({
  label,
  variant = 'orange',
  size = 'hero',
  onClick,
  className = '',
}: RollButtonProps) {
  const isNav = size === 'nav';
  const bgClasses =
    variant === 'dark'
      ? 'bg-gray-900 hover:bg-gray-800 text-white'
      : 'bg-[#0400F5] hover:bg-[#0300cc] text-white';

  const paddingClasses = isNav
    ? 'pl-5 pr-2 py-2 text-[13px]'
    : 'pl-5 sm:pl-6 pr-2 py-2 text-[13px] sm:text-[14px]';

  const circleClasses = isNav
    ? 'w-6 h-6'
    : 'w-7 h-7 sm:w-8 sm:h-8';

  const arrowColor =
    variant === 'dark' ? 'text-gray-900' : 'text-[#0400F5]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full font-medium transition-colors duration-300 cursor-pointer shrink-0 whitespace-nowrap ${bgClasses} ${paddingClasses} ${className}`}
    >
      <span className="h-[20px] overflow-hidden inline-block">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span className="h-[20px] leading-[20px] whitespace-nowrap">
            {label}
          </span>
          <span
            className="h-[20px] leading-[20px] whitespace-nowrap select-none"
            aria-hidden="true"
          >
            {label}
          </span>
        </span>
      </span>
      <span
        className={`${circleClasses} rounded-full bg-white flex items-center justify-center shrink-0`}
      >
        <ArrowRight
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${arrowColor} transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45`}
        />
      </span>
    </button>
  );
}
