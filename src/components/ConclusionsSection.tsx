import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { conclusions } from "@/data/appData";

const ConclusionsSection = () => {
  const [popped, setPopped] = useState<Set<number>>(new Set());

  const pop = (idx: number) => {
    setPopped((s) => new Set(s).add(idx));
  };

  return (
    <section id="conclusions" className="min-h-screen py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Conclusiones <span className="text-primary neon-text-green">Liquid</span>
          </h2>
          <p className="text-muted-foreground font-body">
            Toca las burbujas para revelar cada conclusión
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {conclusions.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring" }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {!popped.has(i) ? (
                  <motion.button
                    key="bubble"
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => pop(i)}
                    className="glass-sphere w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      animation: `bubble-float ${5 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  >
                    <span className="text-3xl">🫧</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="liquid-glass-strong rounded-2xl p-5 w-64 text-center"
                  >
                    <p className="text-sm text-foreground font-body leading-relaxed">
                      {text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <p className="text-muted-foreground font-body text-sm mb-2">
            BIO-SYSTEMS 2026 · Inteligencia Artificial × Ecología
          </p>
          <p className="text-primary/50 font-display text-xs tracking-widest uppercase">
            Desarrollado con Liquid Glass UI
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionsSection;
