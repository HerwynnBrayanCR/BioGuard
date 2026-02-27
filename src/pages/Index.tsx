import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import DockNav from "@/components/DockNav";
import AppsSection from "@/components/AppsSection";
import SorteoSection from "@/components/SorteoSection";
import QuizSection from "@/components/QuizSection";
import VotingSection from "@/components/VotingSection";
import ConclusionsSection from "@/components/ConclusionsSection";
import cloudForestBg from "@/assets/cloud-forest-bg.jpg";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("apps");
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Persistent background */}
      <div className="fixed inset-0 z-0">
        <img
          src={cloudForestBg}
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div key="hero" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }}>
            <HeroSection onEnter={() => setEntered(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            ref={mainRef}
            className="relative z-10"
          >
            <AppsSection />
            <SorteoSection />
            <QuizSection />
            <VotingSection />
            <ConclusionsSection />
            <div className="h-24" /> {/* Space for dock */}
            <DockNav activeSection={activeSection} onNavigate={scrollTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
