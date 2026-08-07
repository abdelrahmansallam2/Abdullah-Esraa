import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import OpeningScreen, { hasOpenedInvitation } from '@/components/OpeningScreen';
import HeroSection from '@/components/HeroSection';
import CoupleSection from '@/components/CoupleSection';
import GallerySection from '@/components/GallerySection';
import EventInfo from '@/components/EventInfo';
import Countdown from '@/components/Countdown';
import CalendarSection from '@/components/CalendarSection';
import RSVPForm from '@/components/RSVPForm';
import MapSection from '@/components/MapSection';
import DressCode from '@/components/DressCode';
import Timeline from '@/components/Timeline';
import Guestbook from '@/components/Guestbook';
import MusicButton from '@/components/MusicButton';
import FlowerDivider from '@/components/FlowerDivider';
import Footer from '@/components/Footer';

const queryClient = new QueryClient();

function Home() {
  const [isOpen, setIsOpen] = useState(() => hasOpenedInvitation());
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>{!isOpen && <OpeningScreen onOpen={() => setIsOpen(true)} />}</AnimatePresence>
      {isOpen && (
        <motion.main
          className="min-h-screen overflow-hidden bg-[#faf7f0] text-[#1a3460]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
          <CoupleSection />
          <GallerySection />
          <EventInfo />
          <Countdown />
          <CalendarSection />
          <RSVPForm />
          <MapSection />
          <DressCode />
          <Timeline />
          <Guestbook />
          <section className="bg-[#faf7f0] px-6 py-20 text-center" data-testid="section-final-message">
            <div className="invite-shell">
              <FlowerDivider />
              <p className="mx-auto mt-8 max-w-md font-display text-3xl leading-tight text-[#1a3460] sm:text-4xl">
                Your presence would be the greatest gift we could receive.
              </p>
              <p className="mt-6 font-display text-2xl italic text-[#c9a84c]">Shady &amp; Maryam</p>
            </div>
          </section>
          <Footer />
          <MusicButton />
          <AnimatePresence>
            {showTop && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                data-testid="button-scroll-to-top"
                className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/40 bg-[#f5efe0] text-[#1a3460] shadow-lg"
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.main>
      )}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
