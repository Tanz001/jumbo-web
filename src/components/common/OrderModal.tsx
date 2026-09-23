import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Flame, ShoppingBag } from 'lucide-react';
import { JumboLogo } from './JumboLogo';
import { MagneticButton } from './MagneticButton';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: string;
  defaultBranch?: string;
  defaultOrderType?: 'delivery' | 'takeaway' | 'dinein';
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedItem = 'Quarter Broast (Injected)',
  defaultBranch = 'gulberg',
  defaultOrderType = 'delivery',
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>(defaultOrderType);
  const [spiceLevel, setSpiceLevel] = useState<'regular' | 'hot' | 'inferno'>('hot');
  const [branch, setBranch] = useState(defaultBranch);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setOrderType(defaultOrderType);
    setBranch(defaultBranch);
    setIsSubmitted(false);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultBranch, defaultOrderType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const inputClass =
    'w-full bg-[#FAFAF8] border border-[#0A0A0A]/12 rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder-[#8C857C] focus:outline-none focus:border-[#E01B24] focus:ring-2 focus:ring-[#E01B24]/15';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/50 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white border border-[#0A0A0A]/08 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#0A0A0A]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Order Modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F6EEE1] border border-[#0A0A0A]/10 flex items-center justify-center text-[#0A0A0A] hover:border-[#E01B24] hover:text-[#E01B24] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E01B24]/10 border border-[#E01B24]/30 text-[#E01B24] mb-1">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-[#0A0A0A] uppercase tracking-wide">
              Order Received
            </h3>
            <p className="text-sm font-body text-[#5C564E] max-w-md mx-auto">
              Order{' '}
              <span className="font-display text-[#E01B24] tracking-wider text-base">
                #JB-{Math.floor(1000 + Math.random() * 9000)}
              </span>{' '}
              is confirmed. Your chicken is being deep-injected fresh.
            </p>
            <div className="p-4 rounded-2xl bg-[#F6EEE1] border border-[#0A0A0A]/08 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-[#5C564E]">
                <span>Selection</span>
                <span className="text-[#0A0A0A] font-medium">{selectedItem}</span>
              </div>
              <div className="flex justify-between text-[#5C564E]">
                <span>Heat Level</span>
                <span className="text-[#E01B24] font-semibold uppercase">{spiceLevel}</span>
              </div>
              <div className="flex justify-between text-[#5C564E]">
                <span>Fulfillment</span>
                <span className="text-[#0A0A0A] capitalize">{orderType}</span>
              </div>
            </div>
            <MagneticButton variant="primary" onClick={handleReset} className="w-full">
              Back to Menu
            </MagneticButton>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6 pr-10">
              <div className="w-11 h-11 rounded-xl bg-[#E01B24] flex items-center justify-center p-1.5 shrink-0">
                <JumboLogo className="w-8 h-auto" fill="#FFFFFF" showSkewer={true} />
              </div>
              <div>
                <h2
                  id="order-modal-title"
                  className="font-display text-2xl uppercase tracking-wider text-[#0A0A0A]"
                >
                  Place Your Order
                </h2>
                <p className="text-xs text-[#8C857C] font-body">
                  Freshly broasted & injected on demand
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 bg-[#F6EEE1] rounded-xl border border-[#0A0A0A]/08 mb-5">
              {(['delivery', 'takeaway', 'dinein'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-2.5 text-xs font-display uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    orderType === type
                      ? 'bg-[#E01B24] text-white shadow-md'
                      : 'text-[#5C564E] hover:text-[#0A0A0A]'
                  }`}
                >
                  {type === 'dinein' ? 'Dine-In' : type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-body">
              <div className="p-3.5 rounded-xl bg-[#F6EEE1] border border-[#0A0A0A]/08 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShoppingBag className="w-4 h-4 text-[#E01B24] shrink-0" />
                  <span className="font-medium text-sm text-[#0A0A0A] truncate">{selectedItem}</span>
                </div>
                <span className="font-display text-sm text-[#E01B24] shrink-0">Fresh</span>
              </div>

              <div>
                <label className="block text-[11px] text-[#8C857C] mb-2 uppercase font-display tracking-wider">
                  Injection Heat
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'regular', label: 'Classic', desc: 'Savory' },
                    { key: 'hot', label: 'Fiery', desc: 'Signature' },
                    { key: 'inferno', label: 'Ghost', desc: 'Max heat' },
                  ].map((level) => (
                    <button
                      key={level.key}
                      type="button"
                      onClick={() => setSpiceLevel(level.key as typeof spiceLevel)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        spiceLevel === level.key
                          ? 'border-[#E01B24] bg-[#E01B24]/08 text-[#0A0A0A]'
                          : 'border-[#0A0A0A]/10 bg-[#FAFAF8] text-[#5C564E] hover:border-[#E01B24]/40'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-display text-xs text-[#0A0A0A]">
                        <Flame
                          className={`w-3.5 h-3.5 ${
                            spiceLevel === level.key ? 'text-[#E01B24]' : 'text-[#8C857C]'
                          }`}
                        />
                        <span>{level.label}</span>
                      </div>
                      <div className="text-[10px] text-[#8C857C] mt-0.5">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#8C857C] mb-1.5 uppercase font-display tracking-wider">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className={inputClass}
                >
                  <option value="gulberg">Lahore — Gulberg III</option>
                  <option value="dha">Karachi — DHA Phase 6</option>
                  <option value="f7">Islamabad — F-7 Markaz</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#8C857C] mb-1.5 uppercase font-display tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8C857C] mb-1.5 uppercase font-display tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX-XXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-[11px] text-[#8C857C] mb-1.5 uppercase font-display tracking-wider">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House / Apt, Street, Area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              <MagneticButton type="submit" variant="primary" size="md" className="w-full mt-2">
                Confirm Order
              </MagneticButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
