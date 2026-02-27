import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/appData";
import MagneticButton from "./MagneticButton";

const QuizSection = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "result">("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [cracked, setCracked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const startGame = () => {
    setGameState("playing");
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(100);
    setCracked(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setCracked(true);
          setTimeout(() => {
            if (currentQ < quizQuestions.length - 1) {
              setCurrentQ((q) => q + 1);
              setTimeLeft(100);
              setCracked(false);
              setSelectedAnswer(null);
            } else {
              setGameState("result");
            }
          }, 1500);
          return 0;
        }
        return prev - 0.5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [gameState, currentQ]);

  const answer = useCallback(
    (idx: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(idx);
      const correct = idx === quizQuestions[currentQ].correct;
      if (correct) {
        setScore((s) => s + 1);
      } else {
        setCracked(true);
      }
      setTimeout(() => {
        if (currentQ < quizQuestions.length - 1) {
          setCurrentQ((q) => q + 1);
          setTimeLeft(100);
          setCracked(false);
          setSelectedAnswer(null);
        } else {
          setGameState("result");
        }
      }, 1500);
    },
    [currentQ, selectedAnswer]
  );

  const q = quizQuestions[currentQ];

  return (
    <section id="quiz" className="min-h-screen py-24 px-4 relative">
      {/* Crack overlay */}
      <AnimatePresence>
        {cracked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 crack-effect pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Eco-<span className="text-neon-blue neon-text-blue">Quiz</span>
          </h2>
          <p className="text-muted-foreground font-body">
            Pon a prueba tu conocimiento ecológico
          </p>
        </motion.div>

        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="liquid-glass-strong rounded-3xl p-12 mb-8">
              <div className="text-6xl mb-4">🧠</div>
              <p className="text-foreground font-display text-xl mb-2">
                {quizQuestions.length} preguntas
              </p>
              <p className="text-muted-foreground font-body text-sm">
                Barra de oxígeno decreciente. ¡No te quedes sin aire!
              </p>
            </div>
            <MagneticButton onClick={startGame}>
              <div className="liquid-glass rounded-full px-12 py-4 font-display font-bold neon-glow-blue text-neon-blue cursor-pointer hover:scale-105 transition-transform">
                🌿 Iniciar Quiz
              </div>
            </MagneticButton>
          </motion.div>
        )}

        {gameState === "playing" && q && (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Oxygen bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground font-body">🫁 Oxígeno</span>
                <span className="text-foreground font-display">
                  {currentQ + 1}/{quizQuestions.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${timeLeft}%`,
                    background:
                      timeLeft > 50
                        ? "linear-gradient(90deg, hsl(var(--neon-green)), hsl(var(--neon-cyan)))"
                        : timeLeft > 20
                        ? "linear-gradient(90deg, hsl(40, 100%, 50%), hsl(30, 100%, 50%))"
                        : "linear-gradient(90deg, hsl(var(--destructive)), hsl(0, 80%, 40%))",
                    boxShadow:
                      timeLeft > 50
                        ? "0 0 10px hsl(var(--neon-green) / 0.5)"
                        : "0 0 10px hsl(var(--destructive) / 0.5)",
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="liquid-glass-strong rounded-3xl p-8 mb-6">
              <p className="text-lg md:text-xl text-foreground font-display font-semibold text-center">
                {q.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === q.correct;
                const showResult = selectedAnswer !== null;

                return (
                  <motion.button
                    key={idx}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => answer(idx)}
                    className={`liquid-glass rounded-2xl p-4 text-left font-body transition-all duration-300 ${
                      showResult && isCorrect
                        ? "neon-glow-green border-primary/50"
                        : showResult && isSelected && !isCorrect
                        ? "border-destructive/50"
                        : "hover:neon-glow-green"
                    }`}
                    style={{
                      borderColor: showResult && isCorrect
                        ? "hsl(var(--primary) / 0.5)"
                        : showResult && isSelected
                        ? "hsl(var(--destructive) / 0.5)"
                        : undefined,
                    }}
                  >
                    <span className="text-muted-foreground mr-2 font-display">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className={showResult && isCorrect ? "text-primary" : "text-foreground"}>
                      {opt}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {gameState === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="liquid-glass-strong rounded-3xl p-12">
              <div className="text-6xl mb-4">
                {score >= quizQuestions.length * 0.8 ? "🏆" : score >= quizQuestions.length * 0.5 ? "🌟" : "🌱"}
              </div>
              <p className="text-5xl font-display font-black text-primary neon-text-green mb-2">
                {score}/{quizQuestions.length}
              </p>
              <p className="text-muted-foreground font-body mb-6">
                {score >= quizQuestions.length * 0.8
                  ? "¡Eres un maestro de la ecología digital!"
                  : score >= quizQuestions.length * 0.5
                  ? "¡Buen conocimiento! Sigue explorando."
                  : "La naturaleza tiene mucho que enseñarte 🌿"}
              </p>
              <MagneticButton onClick={startGame}>
                <div className="liquid-glass rounded-full px-8 py-3 font-display text-primary neon-glow-green cursor-pointer hover:scale-105 transition-transform">
                  🔄 Intentar de nuevo
                </div>
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;
