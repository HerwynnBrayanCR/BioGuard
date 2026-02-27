import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const SorteoSection = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(1300);
  const [displayNum, setDisplayNum] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);

  const spin = useCallback(() => {
    setSpinning(true);
    setResult(null);
    setShowMatrix(true);

    const target = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    let count = 0;
    const totalTicks = 40;

    const interval = setInterval(() => {
      count++;
      setDisplayNum(Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
      if (count >= totalTicks) {
        clearInterval(interval);
        setDisplayNum(target);
        setResult(target);
        setSpinning(false);
        setTimeout(() => setShowMatrix(false), 2000);
      }
    }, 60 + count * 3);
  }, [minRange, maxRange]);

  // Matrix rain characters
  const [matrixChars, setMatrixChars] = useState<{ x: number; char: string; delay: number }[]>([]);

  useEffect(() => {
    if (showMatrix) {
      const chars = Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 100,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        delay: Math.random() * 2,
      }));
      setMatrixChars(chars);
    }
  }, [showMatrix]);

  return (
    <section id="sorteo" className="min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Matrix Rain */}
      <AnimatePresence>
        {showMatrix && matrixChars.map((c, i) => (
          <motion.div
            key={i}
            initial={{ y: "-10%", opacity: 0.8 }}
            animate={{ y: "110%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 + c.delay, ease: "linear" }}
            className="absolute text-primary font-mono text-sm pointer-events-none z-0"
            style={{ left: `${c.x}%` }}
          >
            {c.char}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Bio-<span className="text-primary neon-text-green">Sorteo</span>
          </h2>
          <p className="text-muted-foreground font-body">
            La máquina de cristal líquido elige al ganador
          </p>
        </motion.div>

        {/* Range inputs */}
        <div className="flex gap-4 justify-center mb-8">
          <div className="liquid-glass rounded-2xl px-4 py-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-body">Desde</span>
            <input
              type="number"
              value={minRange}
              onChange={(e) => setMinRange(Number(e.target.value))}
              className="w-20 bg-transparent text-foreground text-center font-display font-bold text-lg outline-none"
            />
          </div>
          <div className="liquid-glass rounded-2xl px-4 py-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-body">Hasta</span>
            <input
              type="number"
              value={maxRange}
              onChange={(e) => setMaxRange(Number(e.target.value))}
              className="w-20 bg-transparent text-foreground text-center font-display font-bold text-lg outline-none"
            />
          </div>
        </div>

        {/* Slot Machine Display */}
        <div className="liquid-glass-strong rounded-3xl p-8 text-center mb-8">
          <motion.div
            animate={spinning ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.3 }}
            className="relative"
          >
            <div
              className="text-7xl md:text-9xl font-display font-black tabular-nums"
              style={{
                color: result ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                textShadow: result
                  ? "0 0 40px hsl(var(--neon-green) / 0.6), 0 0 80px hsl(var(--neon-green) / 0.3)"
                  : "none",
              }}
            >
              {spinning || result !== null ? displayNum : "???"}
            </div>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <p className="text-primary font-display text-xl neon-text-green">
                  🎉 ¡GANADOR! 🎉
                </p>
                <p className="text-muted-foreground text-sm font-body mt-1">
                  Ticket #{result}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Spin Button */}
        <div className="text-center">
          <MagneticButton onClick={spin} className="inline-block">
            <div
              className={`liquid-glass rounded-full px-12 py-4 font-display font-bold text-lg transition-all duration-300 ${
                spinning
                  ? "opacity-50 pointer-events-none"
                  : "neon-glow-green hover:scale-105 cursor-pointer text-primary"
              }`}
            >
              {spinning ? "⟳ Girando..." : "🎰 Activar Sorteo"}
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default SorteoSection;
