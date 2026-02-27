// App data for the 12 ecology applications
export interface EcoApp {
  id: string;
  name: string;
  creator: string;
  precision: number;
  mainUse: string;
  description: string;
  category: "ciencia" | "flora" | "monitoreo";
  icon: string;
  color: string;
}

export const ecoApps: EcoApp[] = [
  {
    id: "inaturalist",
    name: "iNaturalist",
    creator: "California Academy of Sciences & National Geographic",
    precision: 95,
    mainUse: "Identificación comunitaria de especies con IA y validación científica",
    description: "Red social para naturalistas. Usa visión computacional para sugerir identificaciones y cuenta con millones de observaciones verificadas.",
    category: "ciencia",
    icon: "🦎",
    color: "160 70% 40%",
  },
  {
    id: "ebird",
    name: "eBird",
    creator: "Cornell Lab of Ornithology",
    precision: 92,
    mainUse: "Registro y monitoreo global de observaciones de aves",
    description: "Base de datos mundial de avistamientos. Genera mapas de distribución en tiempo real y alertas de especies raras.",
    category: "ciencia",
    icon: "🐦",
    color: "200 70% 45%",
  },
  {
    id: "seek",
    name: "Seek",
    creator: "iNaturalist (Versión simplificada)",
    precision: 88,
    mainUse: "Identificación instantánea con cámara para principiantes",
    description: "Gamifica la exploración de la naturaleza con logros y retos. Ideal para educación ambiental con niños y jóvenes.",
    category: "ciencia",
    icon: "🔍",
    color: "140 65% 45%",
  },
  {
    id: "gbif",
    name: "GBIF",
    creator: "Global Biodiversity Information Facility",
    precision: 97,
    mainUse: "Infraestructura global de datos de biodiversidad abiertos",
    description: "El Google de la biodiversidad. Agrega datos de miles de instituciones para investigación macro-ecológica.",
    category: "ciencia",
    icon: "🌐",
    color: "180 60% 40%",
  },
  {
    id: "plantnet",
    name: "Pl@ntNet",
    creator: "CIRAD, INRIA, IRD, INRAE (Francia)",
    precision: 91,
    mainUse: "Identificación de plantas mediante fotografía y deep learning",
    description: "Entrena su IA con millones de fotos de la comunidad. Especializado en flora tropical y mediterránea.",
    category: "flora",
    icon: "🌿",
    color: "120 60% 40%",
  },
  {
    id: "arbolapp",
    name: "Arbolapp",
    creator: "CSIC & Real Jardín Botánico (España)",
    precision: 85,
    mainUse: "Identificación de árboles ibéricos con claves dicotómicas",
    description: "Funciona offline. Combina claves botánicas tradicionales con fotografías de alta resolución.",
    category: "flora",
    icon: "🌳",
    color: "100 55% 35%",
  },
  {
    id: "picturethis",
    name: "PictureThis",
    creator: "Glority Global Group Ltd.",
    precision: 93,
    mainUse: "Diagnóstico de enfermedades de plantas y jardinería inteligente",
    description: "Identifica más de 17,000 especies. Incluye diagnóstico de plagas y recomendaciones de cuidado.",
    category: "flora",
    icon: "📸",
    color: "80 55% 45%",
  },
  {
    id: "floraincognita",
    name: "Flora Incognita",
    creator: "TU Ilmenau & Max Planck Institute",
    precision: 90,
    mainUse: "Investigación en ecología de plantas con datos ciudadanos",
    description: "Proyecto científico alemán. Cada identificación alimenta modelos de distribución de especies.",
    category: "flora",
    icon: "🌺",
    color: "330 50% 50%",
  },
  {
    id: "merlin",
    name: "Merlin Bird ID",
    creator: "Cornell Lab of Ornithology",
    precision: 94,
    mainUse: "Identificación de aves por foto, sonido y descripción",
    description: "Reconoce cantos de aves en tiempo real. Cubre más de 10,000 especies con paquetes regionales.",
    category: "monitoreo",
    icon: "🎵",
    color: "210 65% 50%",
  },
  {
    id: "birdnet",
    name: "BirdNET",
    creator: "Cornell Lab & Chemnitz University of Technology",
    precision: 89,
    mainUse: "Monitoreo acústico pasivo de aves con deep learning",
    description: "Analiza paisajes sonoros completos. Usado en estaciones de monitoreo automático 24/7.",
    category: "monitoreo",
    icon: "🔊",
    color: "250 55% 55%",
  },
  {
    id: "amazonia",
    name: "Amazonía Guía",
    creator: "Iniciativa Regional Amazónica",
    precision: 82,
    mainUse: "Guía especializada para ecosistemas amazónicos",
    description: "Enfocada en la mega-diversidad amazónica. Incluye datos etnobotánicos y usos tradicionales.",
    category: "monitoreo",
    icon: "🌴",
    color: "150 70% 35%",
  },
  {
    id: "viewleaf",
    name: "ViewLeaf",
    creator: "ViewLeaf Technologies",
    precision: 87,
    mainUse: "Análisis foliar y monitoreo de salud vegetal por teledetección",
    description: "Usa análisis espectral de hojas para detectar estrés hídrico, deficiencias nutricionales y patógenos.",
    category: "monitoreo",
    icon: "🍃",
    color: "130 60% 40%",
  },
];

export const categories = {
  ciencia: { label: "Ciencia Ciudadana", emoji: "🔬", color: "var(--neon-cyan)" },
  flora: { label: "Identificadores de Flora", emoji: "🌱", color: "var(--neon-green)" },
  monitoreo: { label: "Monitoreo Especializado", emoji: "📡", color: "var(--neon-blue)" },
};

export const conclusions = [
  "La IA no reemplaza al biólogo, potencia su visión",
  "12 apps, un ecosistema de conocimiento colectivo",
  "Ciencia ciudadana: cada observación cuenta",
  "El futuro de la ecología es móvil, accesible y colaborativo",
  "Deep Learning + Biodiversidad = Revolución científica",
  "De la selfie al dato científico: democratización de la biología",
];

export const quizQuestions = [
  {
    question: "¿Qué app usa inteligencia artificial para identificar cantos de aves en tiempo real?",
    options: ["PictureThis", "Merlin Bird ID", "Seek", "GBIF"],
    correct: 1,
  },
  {
    question: "¿Cuál es la precisión aproximada de iNaturalist?",
    options: ["75%", "85%", "95%", "65%"],
    correct: 2,
  },
  {
    question: "¿Qué app funciona completamente offline con claves dicotómicas?",
    options: ["Pl@ntNet", "Arbolapp", "Flora Incognita", "ViewLeaf"],
    correct: 1,
  },
  {
    question: "¿Qué institución creó BirdNET?",
    options: ["Google", "MIT", "Cornell Lab", "NASA"],
    correct: 2,
  },
  {
    question: "¿Qué app analiza el estrés hídrico de las plantas?",
    options: ["Amazonía Guía", "ViewLeaf", "PictureThis", "eBird"],
    correct: 1,
  },
  {
    question: "¿Cuántas especies puede identificar PictureThis?",
    options: ["5,000", "10,000", "17,000", "25,000"],
    correct: 2,
  },
];
