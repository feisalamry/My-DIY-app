import { ChevronRight, Loader2 } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

export function CategoriesView() {
  const { categories, loading, error } = useCategories();

  return (
    <div
      className="w-full bg-black overflow-y-auto scrollbar-hide"
      style={{ height: '100dvh' }}
    >
      <div className="pt-[max(1.25rem,env(safe-area-inset-top))] pb-[calc(5rem+env(safe-area-inset-bottom))] px-4">
        <div className="mb-6">
          <h1 className="text-white text-2xl font-black tracking-tight">Categories</h1>
          <p className="text-white/40 text-sm mt-1">Browse by project type</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="text-white/40 animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-white/40 text-sm text-center py-20">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className="relative overflow-hidden rounded-2xl p-5 text-left active:scale-95 transition-transform duration-150"
                style={{ backgroundColor: category.color + '22', border: `1px solid ${category.color}44` }}
              >
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 blur-xl"
                  style={{ backgroundColor: category.color }}
                />

                <span className="text-3xl block mb-3">{category.icon}</span>
                <span className="text-white font-bold text-base block leading-tight">
                  {category.name}
                </span>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-white/40 text-xs font-medium">View projects</span>
                  <ChevronRight size={12} className="text-white/30" />
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
          <p className="text-white/30 text-sm">More categories coming soon</p>
        </div>
      </div>
    </div>
  );
}
