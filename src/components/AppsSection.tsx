import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ecoApps, categories, type EcoApp } from "@/data/appData";
import MagneticButton from "./MagneticButton";

const AppCard = ({ app, onClick }: { app: EcoApp; onClick: () => void }) => (
  <motion.div
    layout
    whileHover={{ scale: 1.05, y: -8 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="glass-sphere rounded-3xl p-6 cursor-pointer group"
    style={{
      animationDelay: `${Math.random() * 2}s`,
    }}
  >
    <div className="text-center">
      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {app.icon}
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm mb-1">
        {app.name}
      </h3>
      <div className="flex items-center justify-center gap-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: `hsl(${app.color})` }}
        />
        <span className="text-[10px] text-muted-foreground font-body">
          {app.precision}% precisión
        </span>
      </div>
    </div>
  </motion.div>
);

const ExpandedCard = ({ app, onClose }: { app: EcoApp; onClose: () => void }) => {
  const [simulating, setSimulating] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative liquid-glass-strong rounded-3xl p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="text-7xl mb-4">{app.icon}</div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-1">
            {app.name}
          </h2>
          <p className="text-sm text-muted-foreground font-body">{app.creator}</p>
        </div>

        {/* Precision bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground font-body">Precisión IA</span>
            <span className="text-primary font-display font-bold">{app.precision}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${app.precision}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, hsl(${app.color}), hsl(${app.color} / 0.6))`,
                boxShadow: `0 0 12px hsl(${app.color} / 0.5)`,
              }}
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="liquid-glass rounded-xl p-3">
            <p className="text-xs text-muted-foreground font-body mb-1">Uso Principal</p>
            <p className="text-sm text-foreground font-body">{app.mainUse}</p>
          </div>
          <div className="liquid-glass rounded-xl p-3">
            <p className="text-xs text-muted-foreground font-body mb-1">Descripción</p>
            <p className="text-sm text-foreground font-body">{app.description}</p>
          </div>
        </div>

        <MagneticButton
          onClick={() => {
            setSimulating(true);
            setTimeout(() => setSimulating(false), 3000);
          }}
          className="w-full"
        >
          <div
            className="w-full py-3 rounded-2xl font-display font-semibold text-sm transition-all duration-300"
            style={{
              background: simulating
                ? `linear-gradient(135deg, hsl(${app.color}), hsl(${app.color} / 0.5))`
                : `linear-gradient(135deg, hsl(${app.color} / 0.2), hsl(${app.color} / 0.1))`,
              color: simulating ? "hsl(var(--background))" : `hsl(${app.color})`,
              border: `1px solid hsl(${app.color} / 0.3)`,
              boxShadow: simulating ? `0 0 30px hsl(${app.color} / 0.4)` : "none",
            }}
          >
            {simulating ? "⟳ Escaneando especie..." : "🔬 Simular Escaneo"}
          </div>
        </MagneticButton>

        {simulating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 liquid-glass rounded-xl p-4 text-center"
          >
            <p className="text-primary font-display text-sm neon-text-green animate-pulse-neon">
              ✓ Especie identificada: <em>Quercus robur</em>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Confianza: {app.precision}%</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const AppsSection = () => {
  const [selectedApp, setSelectedApp] = useState<EcoApp | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? ecoApps
    : ecoApps.filter((a) => a.category === activeCategory);

  return (
    <section id="apps" className="min-h-screen py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            El Ecosistema <span className="text-primary neon-text-green">Digital</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            12 aplicaciones impulsadas por IA que transforman la investigación ecológica
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`liquid-glass rounded-full px-5 py-2 text-sm font-body transition-all ${
              activeCategory === "all" ? "neon-glow-green text-primary" : "text-muted-foreground"
            }`}
          >
            Todas
          </button>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`liquid-glass rounded-full px-5 py-2 text-sm font-body transition-all ${
                activeCategory === key ? "neon-glow-green text-primary" : "text-muted-foreground"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedApp && (
          <ExpandedCard app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AppsSection;
