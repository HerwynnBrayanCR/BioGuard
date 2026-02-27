import { motion } from "framer-motion";

interface DockNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sections = [
  { id: "apps", icon: "🧬", label: "Apps" },
  { id: "sorteo", icon: "🎰", label: "Sorteo" },
  { id: "quiz", icon: "🧠", label: "Quiz" },
  { id: "voting", icon: "📊", label: "Votos" },
  { id: "conclusions", icon: "💎", label: "Final" },
];

const DockNav = ({ activeSection, onNavigate }: DockNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="liquid-glass-strong rounded-full px-3 py-2 flex items-center gap-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`relative group flex flex-col items-center px-3 py-2 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-primary/20"
                : "hover:bg-primary/10"
            }`}
          >
            <span
              className={`text-2xl transition-transform duration-300 group-hover:scale-125 ${
                activeSection === section.id ? "scale-125" : ""
              }`}
            >
              {section.icon}
            </span>
            <span className="text-[10px] text-muted-foreground font-body mt-0.5">
              {section.label}
            </span>
            {activeSection === section.id && (
              <motion.div
                layoutId="dock-indicator"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary"
                style={{ boxShadow: "0 0 8px hsl(var(--neon-green))" }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default DockNav;
