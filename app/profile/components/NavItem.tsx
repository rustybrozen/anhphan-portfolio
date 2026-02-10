import type { ElementType } from 'react';

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: ElementType;
  label: string;
}

export default function NavItem({
  active,
  onClick,
  icon: Icon,
  label,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
        active
          ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
