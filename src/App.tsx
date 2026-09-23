import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { FilmGrain } from './components/common/FilmGrain';
import { CustomCursor } from './components/common/CustomCursor';
import { OrderModal } from './components/common/OrderModal';
import { Preloader } from './components/sections/Preloader';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { MarqueeStrip } from './components/sections/MarqueeStrip';
import { StoryManifesto } from './components/sections/StoryManifesto';
import { SignatureProcess } from './components/sections/SignatureProcess';
import { MenuShowcase } from './components/sections/MenuShowcase';
import { BurgerFeature } from './components/sections/BurgerFeature';
import { GallerySection } from './components/sections/GallerySection';
import { LocationsSection } from './components/sections/LocationsSection';
import { Footer } from './components/sections/Footer';

export default function App() {
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<string>('Quarter Broast (Injected)');

  const handleOpenOrder = (itemName?: string) => {
    if (itemName) {
      setSelectedOrderItem(itemName);
    }
    setOrderModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F6EEE1] overflow-x-hidden selection:bg-[#E01B24] selection:text-[#F6EEE1]">
      {/* Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Lagging Custom Cursor with VIEW state & magnetic reaction */}
      <CustomCursor />

      {/* Award-level Opening Preloader */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* Fixed Navigation Bar */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* Main Experience */}
      <main>
        {/* 4.3 Hero Section */}
        <Hero
          onOpenOrder={handleOpenOrder}
          preloaderFinished={preloaderFinished}
        />

        {/* 4.4 Marquee Velocity Strip */}
        <MarqueeStrip />

        {/* 4.5 Story / Manifesto (Pinned scrub) */}
        <StoryManifesto />

        {/* 4.6 Signature Injection Process (Horizontal pinned track) */}
        <SignatureProcess />

        {/* 4.7 Menu Showcase */}
        <MenuShowcase onSelectItem={handleOpenOrder} />

        {/* 4.8 Burger Feature (Split cream contrast section) */}
        <BurgerFeature onOpenOrder={handleOpenOrder} />

        {/* 4.9 Masonry Parallax Gallery */}
        <GallerySection />

        {/* 4.10 Locations & Channel CTA */}
        <LocationsSection onOpenOrder={handleOpenOrder} />
      </main>

      {/* 4.11 Footer */}
      <Footer />

      {/* Direct Order Drawer / Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        selectedItem={selectedOrderItem}
      />
    </div>
  );
}
