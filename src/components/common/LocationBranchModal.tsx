import React, { useEffect, useState } from 'react';
import { Bike, MapPin, ShoppingBag, Utensils, X } from 'lucide-react';
import { JumboLogo } from './JumboLogo';
import { MagneticButton } from './MagneticButton';

export type BranchId = 'gulberg' | 'dha' | 'f7';
export type FulfillmentType = 'delivery' | 'takeaway' | 'dinein';

export interface LocationChoice {
  branch: BranchId;
  orderType: FulfillmentType;
}

interface LocationBranchModalProps {
  isOpen: boolean;
  onConfirm: (choice: LocationChoice) => void;
  onSkip: () => void;
}

const BRANCHES: { id: BranchId; city: string; name: string; detail: string }[] = [
  {
    id: 'gulberg',
    city: 'Lahore',
    name: 'Gulberg III',
    detail: 'Main Boulevard',
  },
  {
    id: 'dha',
    city: 'Karachi',
    name: 'DHA Phase 6',
    detail: 'Khayaban-e-Shahbaz',
  },
  {
    id: 'f7',
    city: 'Islamabad',
    name: 'F-7 Markaz',
    detail: 'Jinnah Super',
  },
];

const ORDER_TYPES: {
  id: FulfillmentType;
  label: string;
  desc: string;
  icon: typeof Bike;
}[] = [
  {
    id: 'delivery',
    label: 'Delivery',
    desc: 'Hot to your door',
    icon: Bike,
  },
  {
    id: 'takeaway',
    label: 'Takeaway',
    desc: 'Pickup fresh',
    icon: ShoppingBag,
  },
  {
    id: 'dinein',
    label: 'Dine-In',
    desc: 'Eat with us',
    icon: Utensils,
  },
];

export const LocationBranchModal: React.FC<LocationBranchModalProps> = ({
  isOpen,
  onConfirm,
  onSkip,
}) => {
  const [branch, setBranch] = useState<BranchId>('gulberg');
  const [orderType, setOrderType] = useState<FulfillmentType>('delivery');

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
      className="fixed inset-0 z-[10030] flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/55 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg bg-white text-[#0A0A0A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#0A0A0A]/08">
        <button
          type="button"
          onClick={onSkip}
          aria-label="Skip location selection"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F6EEE1] border border-[#0A0A0A]/10 flex items-center justify-center text-[#0A0A0A] hover:border-[#E01B24] hover:text-[#E01B24] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2 pr-10">
          <div className="w-11 h-11 rounded-xl bg-[#E01B24] flex items-center justify-center p-1.5">
            <JumboLogo className="w-8 h-auto" fill="#FFFFFF" showSkewer={true} />
          </div>
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-[#E01B24]">
              Welcome to Jumbo
            </p>
            <h2
              id="location-modal-title"
              className="font-display text-2xl sm:text-3xl uppercase tracking-tight"
            >
              Choose Your Spot
            </h2>
          </div>
        </div>
        <p className="text-sm text-[#5C564E] font-body mb-6 max-w-md">
          Pick a branch and how you want your broast — we&apos;ll set your order defaults.
        </p>

        <div className="mb-5">
          <p className="mb-2 font-display text-[11px] uppercase tracking-wider text-[#8C857C]">
            Branch Location
          </p>
          <div className="space-y-2">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBranch(b.id)}
                className={`w-full flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all cursor-pointer ${
                  branch === b.id
                    ? 'border-[#E01B24] bg-[#E01B24]/06 shadow-sm'
                    : 'border-[#0A0A0A]/10 bg-[#FAFAF8] hover:border-[#E01B24]/40'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    branch === b.id ? 'bg-[#E01B24] text-white' : 'bg-[#F6EEE1] text-[#E01B24]'
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-display text-sm uppercase tracking-wide text-[#0A0A0A]">
                    {b.city} · {b.name}
                  </p>
                  <p className="text-xs text-[#8C857C] font-body mt-0.5">{b.detail}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7">
          <p className="mb-2 font-display text-[11px] uppercase tracking-wider text-[#8C857C]">
            Order Type
          </p>
          <div className="grid grid-cols-3 gap-2">
            {ORDER_TYPES.map((t) => {
              const Icon = t.icon;
              const active = orderType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setOrderType(t.id)}
                  className={`rounded-2xl border px-2 py-3.5 text-center transition-all cursor-pointer ${
                    active
                      ? 'border-[#E01B24] bg-[#E01B24] text-white'
                      : 'border-[#0A0A0A]/10 bg-[#F6EEE1] text-[#0A0A0A] hover:border-[#E01B24]/40'
                  }`}
                >
                  <Icon className={`mx-auto mb-1.5 h-5 w-5 ${active ? 'text-[#F2B441]' : 'text-[#E01B24]'}`} />
                  <p className="font-display text-[11px] uppercase tracking-wider">{t.label}</p>
                  <p className={`text-[10px] font-body mt-0.5 ${active ? 'text-white/80' : 'text-[#8C857C]'}`}>
                    {t.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <MagneticButton
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => onConfirm({ branch, orderType })}
          >
            Continue
          </MagneticButton>
          <MagneticButton variant="outlineDark" size="md" className="flex-1" onClick={onSkip}>
            Browse First
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
