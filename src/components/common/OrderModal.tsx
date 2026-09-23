import React, { useState } from 'react';
import { X, CheckCircle2, Flame, MapPin, Phone, Clock, ShoppingBag } from 'lucide-react';
import { JumboLogo } from './JumboLogo';
import { MagneticButton } from './MagneticButton';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedItem = 'Quarter Broast (Injected)',
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
  const [spiceLevel, setSpiceLevel] = useState<'regular' | 'hot' | 'inferno'>('hot');
  const [branch, setBranch] = useState('gulberg');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-xl bg-[#161413] border border-[#E01B24]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F6EEE1] overflow-hidden">
        {/* Glow backdrop */}
        <div
          className="absolute -top-24 -right-24 w-60 h-60 bg-[#E01B24]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Order Modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#0A0A0A] border border-[#F6EEE1]/20 flex items-center justify-center text-[#F6EEE1] hover:border-[#E01B24] hover:text-[#E01B24] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E01B24]/20 border border-[#E01B24] text-[#E01B24] mb-2 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F6EEE1] uppercase tracking-wide">
              ORDER RECEIVED
            </h3>
            <p className="text-sm font-body text-[#8C857C] max-w-md mx-auto">
              Order <span className="font-display text-[#F2B441] tracking-wider text-base">#JB-{Math.floor(1000 + Math.random() * 9000)}</span> is confirmed! The oil is bubbling, and your chicken is being deep-injected with our signature spices.
            </p>
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#F6EEE1]/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-[#8C857C]">
                <span>Selection:</span>
                <span className="text-[#F6EEE1] font-medium">{selectedItem}</span>
              </div>
              <div className="flex justify-between text-[#8C857C]">
                <span>Heat Level:</span>
                <span className="text-[#FF5A1F] font-semibold uppercase">{spiceLevel} Injection</span>
              </div>
              <div className="flex justify-between text-[#8C857C]">
                <span>Fulfillment:</span>
                <span className="text-[#F6EEE1] capitalize">{orderType}</span>
              </div>
            </div>
            <MagneticButton variant="primary" onClick={handleReset} className="w-full">
              Back to Experience
            </MagneticButton>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#E01B24] flex items-center justify-center p-1">
                <JumboLogo className="w-8 h-auto" fill="#FFFFFF" showSkewer={true} />
              </div>
              <div>
                <h2 id="order-modal-title" className="font-display text-2xl uppercase tracking-wider text-[#F6EEE1]">
                  DIRECT KITCHEN ORDER
                </h2>
                <p className="text-xs text-[#8C857C] font-body">
                  Freshly broasted & injected on demand
                </p>
              </div>
            </div>

            {/* Order Type Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#0A0A0A] rounded-xl border border-[#F6EEE1]/10 mb-5">
              {(['delivery', 'takeaway', 'dinein'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-2 text-xs font-display uppercase tracking-wider rounded-lg transition-all ${
                    orderType === type
                      ? 'bg-[#E01B24] text-[#F6EEE1] shadow-md'
                      : 'text-[#8C857C] hover:text-[#F6EEE1]'
                  }`}
                >
                  {type === 'dinein' ? 'Dine-In' : type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
              {/* Item Preselected */}
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#F6EEE1]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#F2B441]" />
                  <span className="font-medium text-[#F6EEE1]">{selectedItem}</span>
                </div>
                <span className="font-display text-sm text-[#F2B441]">Rs. ---</span>
              </div>

              {/* Spice Injection Level */}
              <div>
                <label className="block text-[#8C857C] mb-1.5 uppercase font-display tracking-wider">
                  Select Injection Heat
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'regular', label: 'Classic Blend', desc: 'Deep savory aroma' },
                    { key: 'hot', label: 'Fiery Injected', desc: 'Signature heat' },
                    { key: 'inferno', label: 'Ghost Broast', desc: 'Maximum street heat' },
                  ].map((level) => (
                    <button
                      key={level.key}
                      type="button"
                      onClick={() => setSpiceLevel(level.key as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        spiceLevel === level.key
                          ? 'border-[#FF5A1F] bg-[#4A0A10]/50 text-[#F6EEE1]'
                          : 'border-[#F6EEE1]/10 bg-[#0A0A0A] text-[#8C857C] hover:border-[#F6EEE1]/30'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-display text-xs text-[#F6EEE1]">
                        <Flame className={`w-3.5 h-3.5 ${spiceLevel === level.key ? 'text-[#FF5A1F]' : 'text-[#8C857C]'}`} />
                        <span>{level.label}</span>
                      </div>
                      <div className="text-[10px] text-[#8C857C] mt-0.5">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Selection */}
              <div>
                <label className="block text-[#8C857C] mb-1.5 uppercase font-display tracking-wider">
                  Select Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#F6EEE1]/15 rounded-xl px-3.5 py-2.5 text-[#F6EEE1] focus:outline-none focus:border-[#E01B24]"
                >
                  <option value="gulberg">Lahore — Main Boulevard, Gulberg III [Add branch details]</option>
                  <option value="dha">Karachi — Khayaban-e-Shahbaz, DHA Phase 6 [Add branch details]</option>
                  <option value="f7">Islamabad — Jinnah Super, Sector F-7 [Add branch details]</option>
                </select>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8C857C] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#F6EEE1]/15 rounded-xl px-3.5 py-2 text-[#F6EEE1] placeholder-[#8C857C]/60 focus:outline-none focus:border-[#E01B24]"
                  />
                </div>
                <div>
                  <label className="block text-[#8C857C] mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX-XXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#F6EEE1]/15 rounded-xl px-3.5 py-2 text-[#F6EEE1] placeholder-[#8C857C]/60 focus:outline-none focus:border-[#E01B24]"
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-[#8C857C] mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Apt, Street, Area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#F6EEE1]/15 rounded-xl px-3.5 py-2 text-[#F6EEE1] placeholder-[#8C857C]/60 focus:outline-none focus:border-[#E01B24]"
                  />
                </div>
              )}

              <MagneticButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-4"
              >
                Confirm Broast Order
              </MagneticButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
