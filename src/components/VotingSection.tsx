import { useState } from "react";
import { motion } from "framer-motion";
import { ecoApps } from "@/data/appData";

const VotingSection = () => {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(ecoApps.map((a) => [a.id, Math.floor(Math.random() * 20)]))
  );
  const [voted, setVoted] = useState<string | null>(null);

  const maxVotes = Math.max(...Object.values(votes), 1);

  const handleVote = (id: string) => {
    if (voted) return;
    setVotes((v) => ({ ...v, [id]: (v[id] || 0) + 1 }));
    setVoted(id);
  };

  const sorted = [...ecoApps].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  return (
    <section id="voting" className="min-h-screen py-24 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Votación <span className="text-primary neon-text-green">en Vivo</span>
          </h2>
          <p className="text-muted-foreground font-body">
            ¿Cuál es tu app favorita? ¡Vota ahora!
          </p>
        </motion.div>

        <div className="space-y-3">
          {sorted.map((app, i) => {
            const count = votes[app.id] || 0;
            const pct = (count / maxVotes) * 100;

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`liquid-glass rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                  voted === app.id ? "neon-glow-green" : voted ? "opacity-70" : "hover:neon-glow-green"
                }`}
                onClick={() => handleVote(app.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{app.icon}</span>
                  <span className="font-display font-semibold text-foreground text-sm flex-1">
                    {app.name}
                  </span>
                  <span className="text-primary font-display font-bold">
                    {count}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(${app.color}), hsl(${app.color} / 0.4))`,
                      boxShadow: `0 0 8px hsl(${app.color} / 0.4)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {voted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-muted-foreground font-body text-sm"
          >
            ✓ Tu voto ha sido registrado
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default VotingSection;
