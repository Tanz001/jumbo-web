import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { useCart } from './hooks/useCart';
import type { MenuProduct } from './data/menu';
import { FilmGrain } from './components/common/FilmGrain';
import { CustomCursor } from './components/common/CustomCursor';
import { OrderModal } from './components/common/OrderModal';
import {
  LocationBranchModal,
  type LocationChoice,
} from './components/common/LocationBranchModal';
import { ProductDetail } from './components/common/ProductDetail';
import { CartDrawer } from './components/common/CartDrawer';
import { Preloader } from './components/sections/Preloader';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { MarqueeStrip } from './components/sections/MarqueeStrip';
import { StoryManifesto } from './components/sections/StoryManifesto';
import { SignatureProcess } from './components/sections/SignatureProcess';
import { MenuShowcase } from './components/sections/MenuShowcase';
import { BurgerFeature } from './components/sections/BurgerFeature';
import { Testimonials } from './components/sections/Testimonials';
import { EventsSection } from './components/sections/EventsSection';
import { GallerySection } from './components/sections/GallerySection';
import { LocationsSection } from './components/sections/LocationsSection';
import { Footer } from './components/sections/Footer';

export default function App() {
  useLenis();

  const { items, addItem, updateQty, removeItem, totalQty, subtotal } = useCart();

  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationChoice, setLocationChoice] = useState<LocationChoice | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<string>('Quarter Broast (Injected)');
  const [detailProduct, setDetailProduct] = useState<MenuProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const handlePreloaderComplete = () => {
    setPreloaderFinished(true);
    // Small beat after intro so the location modal feels intentional
    window.setTimeout(() => setLocationModalOpen(true), 450);
  };

  const handleLocationConfirm = (choice: LocationChoice) => {
    setLocationChoice(choice);
    setLocationModalOpen(false);
  };

  const handleLocationSkip = () => {
    setLocationModalOpen(false);
  };

  const handleOpenOrder = (itemName?: string) => {
    if (itemName) {
      setSelectedOrderItem(itemName);
    }
    setOrderModalOpen(true);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    const first = items[0]?.product.name;
    handleOpenOrder(first);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F6EEE1] overflow-x-hidden selection:bg-[#E01B24] selection:text-[#F6EEE1]">
      <FilmGrain />
      <CustomCursor />

      {!preloaderFinished && <Preloader onComplete={handlePreloaderComplete} />}

      <Navbar
        onOpenOrder={handleOpenOrder}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalQty}
      />

      <main>
        <Hero
          onOpenOrder={handleOpenOrder}
          preloaderFinished={preloaderFinished}
        />

        <MenuShowcase
          onSelectProduct={setDetailProduct}
          preloaderFinished={preloaderFinished}
        />

        <MarqueeStrip />

        <StoryManifesto />

        <SignatureProcess />

        <BurgerFeature onOpenOrder={handleOpenOrder} />

        <EventsSection onOpenOrder={handleOpenOrder} />

        <Testimonials />

        <GallerySection />

        <LocationsSection onOpenOrder={handleOpenOrder} />
      </main>

      <Footer />

      <ProductDetail
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={(product, qty, heat) => addItem(product, qty, heat)}
        onOpenCart={() => {
          setDetailProduct(null);
          setCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        subtotal={subtotal}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />

      <LocationBranchModal
        isOpen={locationModalOpen}
        onConfirm={handleLocationConfirm}
        onSkip={handleLocationSkip}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        selectedItem={selectedOrderItem}
        defaultBranch={locationChoice?.branch ?? 'gulberg'}
        defaultOrderType={locationChoice?.orderType ?? 'delivery'}
      />
    </div>
  );
}
