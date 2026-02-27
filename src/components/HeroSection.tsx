import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import cloudForestBg from "@/assets/cloud-forest-bg.jpg";

interface HeroSectionProps {
  onEnter: () => void;
}

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      onEnter();
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={cloudForestBg}
          alt="Bosque nuboso cinematográfico"
          className="w-full h-full object-cover scale-110"
          style={{ animation: "float 30s ease-in-out infinite", animationDuration: "30s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsla(155,80%,40%,0.1)] to-[hsla(220,70%,25%,0.15)]" />
      </div>

      {/* Scanline effect */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1 z-30"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--neon-green)), transparent)",
              boxShadow: "0 0 30px hsl(var(--neon-green)), 0 0 60px hsl(var(--neon-green) / 0.5)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-sm font-body tracking-[0.4em] uppercase text-primary mb-6 neon-text-green">
            Inteligencia Artificial × Ecología
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 leading-none">
            <span
              className="text-clip-transparent bg-cover bg-center"
              style={{ backgroundImage: `url(${cloudForestBg})` }}
            >
              BIO-SYSTEMS
            </span>
            <br />
            <span className="text-primary neon-text-green">2026</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-12 font-light">
            12 aplicaciones que están revolucionando cómo entendemos, identificamos y protegemos la biodiversidad del planeta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <MagneticButton
            onClick={handleScan}
            className="relative group"
            strength={0.2}
          >
            <div className="liquid-glass rounded-full p-8 md:p-10 neon-glow-green cursor-pointer transition-all duration-500 hover:scale-110">
              <div className="text-4xl md:text-5xl mb-2">👆</div>
              <p className="text-xs text-primary font-display tracking-widest uppercase">
                {scanning ? "Escaneando..." : "Iniciar Acceso"}
              </p>
            </div>
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute -inset-4 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
