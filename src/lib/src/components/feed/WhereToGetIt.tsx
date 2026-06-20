import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Store, Truck, Bot, Palette, Code, FileText, Image, ExternalLink, CircleDot, ShoppingBag, ArrowUpRight } from 'lucide-react';
import type { RetailerOption, AIToolOption } from '../../types';

interface WhereToGetItProps {
  retailers: RetailerOption[];
  aiTools: AIToolOption[];
  isAIToolCategory: boolean;
  categorySlug: string;
}

const AVAILABILITY_CONFIG = {
  in_stock: { label: 'In stock', color: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/30' },
  limited: { label: 'Limited', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' },
  check_availability: { label: 'Check availability', color: 'text-white/50', bg: 'bg-white/5', border: 'border-white/15' },
} as const;

const PRICING_CONFIG = {
  free: { label: 'Free', color: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/30' },
  freemium: { label: 'Freemium', color: 'text-sky-400', bg: 'bg-sky-500/15', border: 'border-sky-500/30' },
  paid: { label: 'Paid', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' },
} as const;

const RETAILER_ICONS: Record<string, typeof Store> = {
  store: Store,
  truck: Truck,
};

const AI_TOOL_ICONS: Record<string, typeof Bot> = {
  bot: Bot,
  palette: Palette,
  code: Code,
  file: FileText,
  image: Image,
};

function RetailerRow({ retailer }: { retailer: RetailerOption }) {
  const avail = AVAILABILITY_CONFIG[retailer.availability];
  const Icon = RETAILER_ICONS[retailer.icon] || Store;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-b-0">
      <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-white/50" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold">{retailer.name}</p>
        <p className="text-white/40 text-xs mt-0.5">{retailer.priceRange}</p>
      </div>
      <div className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${avail.bg} ${avail.border} ${avail.color}`}>
        {avail.label}
      </div>
    </div>
  );
}

function AIToolRow({ tool }: { tool: AIToolOption }) {
  const pricing = PRICING_CONFIG[tool.pricing];
  const Icon = AI_TOOL_ICONS[tool.icon] || Bot;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-b-0">
      <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-white/50" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold">{tool.name}</p>
        <div className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wider uppercase mt-1 ${pricing.bg} ${pricing.border} ${pricing.color}`}>
          {pricing.label}
        </div>
      </div>
      <button className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs font-semibold active:scale-95 transition-transform duration-150 hover:bg-white/15 flex items-center gap-1.5">
        <ExternalLink size={10} />
        {tool.action}
      </button>
    </div>
  );
}

const SECTION_LABELS: Record<string, { title: string; subtitle: (count: number) => string; icon: typeof MapPin; iconBg: string; iconBorder: string; iconColor: string }> = {
  software: {
    title: 'Open Tool',
    subtitle: (n) => `${n} tools available`,
    icon: ArrowUpRight,
    iconBg: 'bg-emerald-500/15',
    iconBorder: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  default: {
    title: 'Where to Buy',
    subtitle: (n) => `${n} retailers nearby`,
    icon: ShoppingBag,
    iconBg: 'bg-sky-500/15',
    iconBorder: 'border-sky-500/30',
    iconColor: 'text-sky-400',
  },
};

export function WhereToGetIt({ retailers, aiTools, isAIToolCategory, categorySlug }: WhereToGetItProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasRetailers = retailers.length > 0;
  const hasAITools = aiTools.length > 0;
  const totalOptions = retailers.length + aiTools.length;

  let resolvedRetailers = retailers;
  if (totalOptions === 0) {
    resolvedRetailers = [
      { id: 'fallback', name: 'Amazon', priceRange: 'Check prices', availability: 'check_availability' as const, convenience: 1, icon: 'truck' },
      { id: 'fallback2', name: 'eBay', priceRange: 'Check prices', availability: 'check_availability' as const, convenience: 2, icon: 'store' },
    ];
  }

  const labelConfig = SECTION_LABELS[isAIToolCategory ? 'software' : 'default'] || SECTION_LABELS.default;
  const SectionIcon = labelConfig.icon;
  const primaryCount = isAIToolCategory ? aiTools.length : resolvedRetailers.length;

  return (
    <div className="mt-2">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2.5 px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl active:scale-[0.98] transition-all duration-150 hover:bg-white/[0.06]"
      >
        <div className={`w-8 h-8 rounded-lg ${labelConfig.iconBg} ${labelConfig.iconBorder} border flex items-center justify-center flex-shrink-0`}>
          <SectionIcon size={15} className={labelConfig.iconColor} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-semibold">{labelConfig.title}</p>
          <p className="text-white/40 text-xs mt-0.5">
            {labelConfig.subtitle(primaryCount)}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-white/30 text-xs font-medium">{totalOptions || resolvedRetailers.length}</span>
          {isExpanded ? (
            <ChevronUp size={16} className="text-white/40" />
          ) : (
            <ChevronDown size={16} className="text-white/40" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl animate-in">
          {/* AI Tools section */}
          {hasAITools && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 pt-2 pb-1">
                <Bot size={12} className="text-white/40" />
                <span className="text-white/40 text-[10px] font-semibold tracking-widest uppercase">
                  AI Tools
                </span>
              </div>
              {aiTools.map((tool) => (
                <AIToolRow key={tool.id} tool={tool} />
              ))}
            </div>
          )}

          {/* Retailers section */}
          {hasRetailers && (
            <div>
              <div className="flex items-center gap-1.5 pt-2 pb-1">
                <Store size={12} className="text-white/40" />
                <span className="text-white/40 text-[10px] font-semibold tracking-widest uppercase">
                  Retailers
                </span>
              </div>
              {resolvedRetailers.map((retailer) => (
                <RetailerRow key={retailer.id} retailer={retailer} />
              ))}
            </div>
          )}

          {/* Fallback note */}
          <div className="flex items-center gap-1.5 pt-3 pb-1">
            <CircleDot size={10} className="text-white/20" />
            <p className="text-white/25 text-[10px] leading-relaxed">
              Availability and pricing may vary by location
            </p>
          </div>
        </div>
      )}
    </div>
  );
}