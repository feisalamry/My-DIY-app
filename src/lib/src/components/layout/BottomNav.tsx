import { ScanLine, Compass, LayoutGrid } from 'lucide-react';
import type { ActiveView } from '../../types';

interface BottomNavProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const navItems: { view: ActiveView; icon: typeof Compass; label: string }[] = [
  { view: 'scan', icon: ScanLine, label: 'Scan' },
  { view: 'explore', icon: Compass, label: 'Explore' },
  { view: 'categories', icon: LayoutGrid, label: 'Categories' },
];

export function BottomNav({ activeView, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch justify-around">
        {navItems.map(({ view, icon: Icon, label }) => {
          const isActive = activeView === view;

          return (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-3 relative transition-colors duration-200"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/40'}`}
              />
              <span
                className={`text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/40'}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
