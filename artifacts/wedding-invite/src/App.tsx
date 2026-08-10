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
import ChildhoodMemories from '@/components/ChildhoodMemories';
import EventInfo from '@/components/EventInfo';
import Countdown from '@/components/Countdown';
import CalendarSection from '@/components/CalendarSection';
import MapSection from '@/components/MapSection';
import DressCode from '@/components/DressCode';
import Timeline from '@/components/Timeline';
import Guestbook from '@/components/Guestbook';
import MusicButton from '@/components/MusicButton';
import SectionDivider from '@/components/SectionDivider';
import SideBorder from '@/components/SideBorder';
import CornerFlower from '@/components/CornerFlower';
import { weddingConfig } from '@/data/weddingConfig';
import backgroundImage from '@references/background.jpg';

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
          className="invitation-background min-h-screen overflow-hidden text-[#1a3460]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <SideBorder />
          <HeroSection />
          <CoupleSection />
          <ChildhoodMemories />
          <EventInfo />
          <Countdown />
          <CalendarSection />
          <MapSection />
          <DressCode />
          <Timeline />
          <Guestbook />
          <section className="relative px-6 py-20 text-center" data-testid="section-final-message">
            <div className="invite-shell">
              <SectionDivider />
              <p className="mx-auto mt-8 max-w-md font-display text-3xl leading-tight text-[#1a3460] sm:text-4xl">
                {weddingConfig.invitationMessages.finalMessage}
              </p>
              <div className="mt-9">
                <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#8a7845]">
                  {weddingConfig.invitationMessages.signatureIntro}
                </p>
                <p
                  className="mt-2 font-ruqaa text-3xl leading-[1.5] text-[#c9a84c]"
                  data-testid="text-final-names"
                  dir="rtl"
                  lang="ar"
                >
                  {weddingConfig.groomNameArabic} &amp; {weddingConfig.brideNameArabic}
                </p>
                <p className="mt-1 font-display italic text-lg text-[#1a3460]/70">
                  {weddingConfig.invitationMessages.signatureDate}
                </p>
              </div>
            </div>
            <CornerFlower
              placement="bottom-right"
              className="-z-10 bottom-0 right-0 h-32 w-32 sm:h-48 sm:w-48"
            />
          </section>
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
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
