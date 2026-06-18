import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, X, ChevronDown,
  Calendar, Code2, Cpu, Database, Globe, Terminal, Layers,
  Download, Menu, MapPin, Award, BookOpen, ArrowUpRight, 
  Target, Lightbulb, CheckCircle, Flag, TrendingUp, Settings
} from "lucide-react";
import "./App.css";

// ─── PHOTO (embedded) ────────────────────────────────────────────────────────
const PHOTO_SRC = "me.jpeg";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "aqms",
    title: "AI-Powered Air Quality Monitoring System",
    subtitle: "ISRO Project Internship",
    date: "Nov 2025 – Present",
    tags: ["ISRO", "Ongoing", "Edge AI"],
    category: "Systems Engineering",
    description:
      "Contributing in a Systems Engineering role as a Project Intern to develop a next-generation edge-computing AQMS for ISRO, combining LSTM-based forecasting with a deterministic Chemical Transport Model and ESP32-S3 microcontrollers.",
    problem:
      "ISRO needed a smarter air quality monitoring system that could predict real-time pollution levels at the edge — existing solutions lacked temporal forecasting and relied on legacy physics models.",
    solution:
      "Built a hybrid pipeline: a deterministic Chemical Transport Model (CTM) using operator splitting produces physics-validated outputs that feed a temporal LSTM network. An ESP32-S3 microcontroller with I²C/UART bridges ensures non-blocking sensor data delivery.",
    features: [
      "Hybrid LSTM + Chemical Transport Model for atmospheric prediction",
      "Operator-splitting approach for cleaner atmospheric data simulation",
      "ESP32-S3 microcontroller with I²C/UART expansion bridges",
      "Zero-loss, non-blocking sensor data pipeline",
    ],
    challenges: [
      "Migrating from a legacy PINN to a deterministic CTM while preserving accuracy",
      "Integrating embedded hardware with ML pipeline reliably at the edge",
    ],
    impact: "Contributing to ISRO's national air-quality initiative, enabling edge-level pollution forecasting for smart city integration.",
    tech: ["Python", "LSTM", "PyTorch", "SciPy", "ESP32-S3", "C++", "I2C/UART"],
    github: "https://github.com/SukumarBV",
    live: null,
    featured: true,
  },
  {
    id: "traffic-mlops",
    title: "Automated Traffic Congestion MLOps",
    subtitle: "Production ML System",
    date: "Jan 2026",
    tags: ["MLOps", "FastAPI", "Deployed"],
    category: "MLOps",
    description:
      "End-to-end MLOps pipeline for real-time Bengaluru traffic congestion prediction — stateless REST inference, simulated event-time replay, a live monitoring dashboard, and independent cloud deployment.",
    problem:
      "Traffic congestion prediction systems typically lack production-grade infrastructure: no drift detection, no model versioning, and no monitoring. A raw model without an MLOps shell is not deployable.",
    solution:
      "Designed a FastAPI inference service with replayed historical data simulating live event streams. Built a Streamlit monitoring dashboard tracking rolling predicted vs observed trends, deployed independently on Hugging Face Spaces.",
    features: [
      "Stateless FastAPI REST API for low-latency ML inference",
      "Simulated live traffic pipeline with event-time replay",
      "Streamlit production monitoring dashboard",
      "Independent cloud microservice architecture",
    ],
    challenges: [
      "Simulating realistic event-time streams from historical batch data",
      "Balancing inference latency with model complexity in a free-tier environment",
    ],
    impact: "Deployed live — demonstrates real-world MLOps architecture with separated inference and monitoring services.",
    tech: ["FastAPI", "Pandas", "Streamlit", "Docker", "Hugging Face", "Scikit-learn"],
    github: "https://github.com/SukumarBV/bengaluru-traffic-mlops",
    live: "https://bengaluru-traffic-mlops.onrender.com",
    featured: true,
  },
  {
    id: "nlp-query-engine",
    title: "AI-Powered NLP Query Engine",
    subtitle: "Text-to-SQL Platform",
    date: "Oct 2025",
    tags: ["LLM", "Full-Stack", "Docker"],
    category: "Full-Stack AI",
    description:
      "A full-stack Text-to-SQL platform powered by Gemini with dynamic schema discovery and hybrid semantic + keyword search. Fully containerized with Docker Compose.",
    problem:
      "Non-technical users can't query databases directly. Natural language interfaces exist, but most hardcode the schema, breaking on schema drift and limiting multi-table reasoning.",
    solution:
      "Built a dynamic schema discovery module that introspects the DB at runtime and injects the schema into Gemini prompts. Combined keyword search with semantic vector search for query disambiguation.",
    features: [
      "Gemini-powered natural language to SQL conversion",
      "Dynamic schema discovery — no hardcoded table definitions",
      "Hybrid semantic + keyword search for query disambiguation",
      "React frontend for natural query building",
    ],
    challenges: [
      "Handling schema drift and multi-table joins in LLM prompts",
      "Preventing SQL injection while allowing flexible query generation",
    ],
    impact: "Enables any user to query relational databases in plain English — applicable across analytics, BI, and internal tools.",
    tech: ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Gemini AI"],
    github: "https://github.com/SukumarBV/NLPQueryEngine",
    live: null,
    featured: true,
  },
  {
    id: "recommendation-app",
    title: "Product Recommendation App",
    subtitle: "Collaborative Filtering System",
    date: "Nov 2025",
    tags: ["ML", "Flask", "Deployed"],
    category: "AI/ML",
    description:
      "A Flask app comparing content-based and collaborative filtering recommender systems, using TF-IDF + cosine similarity for item recommendations and KNN for user-behavior-based suggestions.",
    problem:
      "E-commerce recommendation systems are often black boxes. This project makes the tradeoffs between content-based and collaborative filtering visible and interactive.",
    solution:
      "Built two recommendation engines side-by-side: a content-based system using TF-IDF + cosine similarity on product descriptions, and a collaborative system using a user-item matrix + KNN.",
    features: [
      "Side-by-side content-based vs collaborative filtering comparison",
      "TF-IDF with cosine similarity for product metadata",
      "KNN user-item matrix for behavior-based suggestions",
      "Interactive Flask web interface",
    ],
    challenges: [
      "Sparse user-item matrices degrading recommendation quality",
      "Addressing the cold-start problem for new users",
    ],
    impact: "Demonstrates recommendation system tradeoffs clearly — useful as both a learning resource and a deployable microservice.",
    tech: ["Python", "Flask", "Scikit-learn", "TF-IDF", "KNN", "Pandas"],
    github: "https://github.com/SukumarBV/product-recommendation-app",
    live: null,
    featured: false,
  },
];

const SKILLS = [
  {
    category: "Languages",
    icon: <Code2 size={24} />,
    items: ["Python", "JavaScript", "Java", "SQL"],
  },
  {
    category: "AI & Machine Learning",
    icon: <Cpu size={24} />,
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "NLP", "Computer Vision", "LSTM", "Text-to-SQL"],
  },
  {
    category: "Frontend",
    icon: <Globe size={24} />,
    items: ["React", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
  },
  {
    category: "Backend & APIs",
    icon: <Terminal size={24} />,
    items: ["FastAPI", "Flask", "SQLAlchemy", "REST APIs"],
  },
  {
    category: "Databases",
    icon: <Database size={24} />,
    items: ["PostgreSQL", "Vector DBs", "SQL"],
  },
  {
    category: "DevOps & Cloud",
    icon: <Layers size={24} />,
    items: ["Docker", "Docker Compose", "GitHub Actions", "Hugging Face Spaces"],
  },
];

const CERTIFICATIONS = [
  {
    title: "Artificial Intelligence: Knowledge Representation and Reasoning",
    issuer: "NPTEL",
    icon: <Award size={24} />,
  },
  {
    title: "Gen AI Powered Data Analytics Job Simulation",
    issuer: "TATA iQ · Forage",
    icon: <Award size={24} />,
  },
  {
    title: "Computer Graphics",
    issuer: "NPTEL",
    icon: <Award size={24} />,
  },
];

// ─── AMBIENT BACKGROUND ELEMENTS (PIXEL ART) ──────────────────────────────────

// Pre-compute static particles so they don't re-render and jump on scroll
const STATIC_PARTICLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  left: `${Math.floor(Math.random() * 100)}%`,
  top: `${Math.floor(Math.random() * 100)}%`,
  delay: `-${Math.floor(Math.random() * 20)}s`,
  duration: `${15 + Math.floor(Math.random() * 20)}s`
}));

// Wide, flat-bottomed pixel cloud
const PixelCloudA = ({ size, top, duration, delay, opacity, reverse }) => (
  <div className={`sky-element ${reverse ? 'sky-element--reverse' : ''}`} style={{ top, opacity, animationDuration: duration, animationDelay: delay, '--scale': size }}>
    <svg style={{ transform: reverse ? 'scaleX(-1)' : 'none' }} viewBox="0 0 120 60" width="120" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFFFFF" d="M40 10h30v10h20v10h10v20H20V40H10V30H0V20h20V10h20z"/>
      <path fill="#E2E8F0" d="M20 50h80v10H20z" opacity="0.8"/>
    </svg>
  </div>
);

// Smaller, puffy pixel cloud
const PixelCloudB = ({ size, top, duration, delay, opacity, reverse }) => (
  <div className={`sky-element ${reverse ? 'sky-element--reverse' : ''}`} style={{ top, opacity, animationDuration: duration, animationDelay: delay, '--scale': size }}>
    <svg style={{ transform: reverse ? 'scaleX(-1)' : 'none' }} viewBox="0 0 80 40" width="80" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFFFFF" d="M30 0h20v10h20v10h10v10H10V20H0V10h10V0h20z"/>
      <path fill="#E2E8F0" d="M10 30h60v10H10z" opacity="0.8"/>
    </svg>
  </div>
);

// Distant blocky bird silhouette
const PixelBird = ({ size, top, duration, delay, reverse }) => (
  <div className={`sky-element ${reverse ? 'sky-element--reverse' : ''}`} style={{ top, animationDuration: duration, animationDelay: delay, '--scale': size }}>
    <div className="sky-bird-inner" style={{ transform: reverse ? 'scaleX(-1)' : 'none' }}>
      <svg viewBox="0 0 24 12" width="24" height="12" fill="#64748B" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="4" height="4"/>
        <rect x="4" y="4" width="4" height="4"/>
        <rect x="8" y="8" width="8" height="4"/>
        <rect x="16" y="4" width="4" height="4"/>
        <rect x="20" y="0" width="4" height="4"/>
      </svg>
    </div>
  </div>
);

function SkyBackground() {
  return (
    <div className="sky-background">
      {/* Subtle Atmospheric Particles */}
      <div className="sky-particles">
        {STATIC_PARTICLES.map(p => (
          <div key={p.id} className="sky-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>
      
      {/* Background Layer (Small, slow, low opacity) */}
      <PixelCloudB size={0.5} top="8%" duration="160s" delay="0s" opacity={0.3} />
      <PixelCloudB size={0.8} top="5%" duration="140s" delay="-110s" opacity={0.4} reverse />
      <PixelCloudA size={0.6} top="25%" duration="180s" delay="-40s" opacity={0.4} reverse />
      <PixelCloudB size={0.7} top="65%" duration="150s" delay="-80s" opacity={0.3} />
      <PixelCloudA size={0.9} top="80%" duration="130s" delay="-10s" opacity={0.5} reverse />
      
      {/* Midground Layer (Medium) */}
      <PixelCloudA size={1.0} top="15%" duration="120s" delay="-20s" opacity={0.6} />
      <PixelCloudB size={1.2} top="22%" duration="105s" delay="-75s" opacity={0.6} />
      <PixelCloudA size={1.4} top="38%" duration="90s" delay="-30s" opacity={0.75} />
      <PixelCloudB size={1.1} top="45%" duration="110s" delay="-60s" opacity={0.5} reverse />
      <PixelCloudA size={1.2} top="75%" duration="100s" delay="-85s" opacity={0.7} />
      
      {/* Foreground Layer (Large, faster, high opacity) */}
      <PixelCloudB size={1.6} top="30%" duration="80s" delay="-15s" opacity={0.9} />
      <PixelCloudA size={1.8} top="55%" duration="95s" delay="-50s" opacity={1} />
      <PixelCloudB size={1.5} top="85%" duration="85s" delay="-90s" opacity={0.8} reverse />

      {/* Birds */}
      <PixelBird size={0.9} top="12%" duration="60s" delay="-10s" />
      <PixelBird size={0.6} top="20%" duration="80s" delay="-50s" />
      <PixelBird size={1.2} top="28%" duration="45s" delay="-15s" reverse />
      <PixelBird size={0.7} top="40%" duration="70s" delay="-35s" reverse />
      <PixelBird size={1.0} top="50%" duration="55s" delay="-20s" reverse />
      <PixelBird size={1.1} top="70%" duration="50s" delay="-5s" />
      <PixelBird size={0.8} top="85%" duration="65s" delay="-40s" />
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "education", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo("home")}>
          <span className="navbar__logo-text">SB</span>
        </button>

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.id}>
              <button
                className={`navbar__link ${active === l.id ? "navbar__link--active" : ""}`}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a href="/Sukumar_BV_Resume.pdf" download className="btn btn--sm btn--primary" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <button className="navbar__hamburger" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map((l) => (
              <button
                key={l.id}
                className="navbar__drawer-link"
                onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__content container">
        <div className="hero__layout">
          <motion.div
            className="hero__text-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero__badge">
              <span className="hero__status-dot" /> Open to Opportunities
            </div>
            <h1 className="hero__name">
              <span className="hero__accent">Sukumar BV</span>
            </h1>
            <p className="hero__tagline">
              An AI & Machine Learning engineer building sophisticated, intelligent systems that bridge complex technology with real-world impact.
            </p>
            <p className="hero__sub">
              3rd-year B.E. student · CGPA 8.88 · Cambridge Institute of Technology
            </p>

            <div className="hero__ctas">
              <button className="btn btn--primary btn--lg" onClick={() => scrollTo("projects")}>
                View Work <ArrowUpRight size={18} />
              </button>
              <a href="https://github.com/SukumarBV" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
                <Github size={18} /> GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero__photo-wrapper">
              <div className="hero__photo-frame">
                <img src={PHOTO_SRC} alt="Sukumar BV" className="hero__photo" />
              </div>
              <div className="hero__photo-shadow" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Background" title="About Me" />
        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>Hi, I'm Sukumar.</p>
            <p>
              I'm an AI & Machine Learning engineering student who enjoys building intelligent systems that solve real-world problems. My interests span across Machine Learning, Natural Language Processing, Computer Vision, and MLOps, and I love turning ideas into working products—from training models and designing APIs to deploying scalable applications.
            </p>
            <p>
              Over the past few years, I've worked on projects ranging from AI-powered query engines and recommendation systems to real-time traffic analytics and air quality forecasting solutions. What excites me most about AI is its ability to bridge complex technology with practical impact.
            </p>
            <p>
              When I'm not building projects, you'll find me exploring new AI tools, learning about emerging technologies, and experimenting with ways to make machine learning systems more efficient and accessible.
            </p>
            <p>
              I'm always open to collaborating on interesting projects, learning from others, and contributing to innovative AI solutions.
            </p>

            <div className="about__info">
              <div className="about__info-item">
                <div className="about__info-icon"><MapPin size={18} /></div>
                <span>Bengaluru, India</span>
              </div>
              <div className="about__info-item">
                <div className="about__info-icon"><Mail size={18} /></div>
                <span>sukumarbv27@gmail.com</span>
              </div>
              <div className="about__info-item">
                <div className="about__info-icon"><BookOpen size={18} /></div>
                <span>B.E. AI & ML · 2023–2027</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader eyebrow="Toolkit" title="Technical Skills" />
        <div className="skills__grid">
          {SKILLS.map((cat, i) => (
            <motion.div
              key={i}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="skill-card__header">
                <div className="skill-card__icon">{cat.icon}</div>
                <h3 className="skill-card__title">{cat.category}</h3>
              </div>
              <div className="skill-card__tags">
                {cat.items.map((item, j) => (
                  <span key={j} className="skill-tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Work" title="Featured Projects" />
        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="project-card__inner">
        <div className="project-card__top">
          <span className="project-card__category">{project.category}</span>
          {project.featured && <span className="project-card__badge">Featured</span>}
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tech">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="tech-badge">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-badge tech-badge--more">+{project.tech.length - 4}</span>
          )}
        </div>

        <div className="project-card__footer">
          <span className="project-card__cta">
            Read Case Study <ArrowUpRight size={16} />
          </span>
          <div className="project-card__links" onClick={(e) => e.stopPropagation()}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link">
              <Github size={18} />
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="icon-link">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose}><X size={20} /></button>

        <div className="modal__header">
          <div className="modal__meta">
            <span className="modal__category">{project.category}</span>
            <span className="modal__date"><Calendar size={14} /> {project.date}</span>
          </div>
          <h2 className="modal__title">{project.title}</h2>
          <p className="modal__subtitle">{project.subtitle}</p>
        </div>

        <div className="modal__body">
          <ModalSection title="The Problem" icon={<Target size={20} />}>
            {project.problem}
          </ModalSection>
          
          <ModalSection title="The Solution" icon={<Lightbulb size={20} />}>
            {project.solution}
          </ModalSection>

          <div className="modal__two-col">
            <div className="modal__highlight-box">
              <h4 className="modal__section-title"><CheckCircle size={18} /> Key Features</h4>
              <ul className="modal__list">
                {project.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            <div className="modal__highlight-box">
              <h4 className="modal__section-title"><Flag size={18} /> Challenges</h4>
              <ul className="modal__list">
                {project.challenges.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          <ModalSection title="Impact & Outcomes" icon={<TrendingUp size={20} />}>
            {project.impact}
          </ModalSection>

          <div className="modal__tech">
            <h4 className="modal__section-title"><Settings size={18} /> Technologies Used</h4>
            <div className="modal__tech-tags">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-badge tech-badge--lg">{t}</span>
              ))}
            </div>
          </div>

          <div className="modal__actions">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <Github size={18} /> View Source Code
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModalSection({ title, icon, children }) {
  return (
    <div className="modal__section">
      <h4 className="modal__section-title">
        <span className="modal__section-icon">{icon}</span> {title}
      </h4>
      <p className="modal__text">{children}</p>
    </div>
  );
}

// ─── EDUCATION & CERTS ────────────────────────────────────────────────────────

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader eyebrow="Academic" title="Education & Learning" />
        
        <div className="edu-cert-grid">
          <motion.div
            className="edu-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="edu-card__icon">
              <BookOpen size={32} />
            </div>
            <div className="edu-card__body">
              <div className="edu-card__meta">
                <span className="edu-card__degree">Bachelor of Engineering</span>
                <span className="edu-card__gpa">CGPA: 8.88 / 10</span>
              </div>
              <h3 className="edu-card__major">Artificial Intelligence &amp; Machine Learning</h3>
              <p className="edu-card__school">Cambridge Institute of Technology · Bengaluru, India</p>
              <div className="edu-card__period">
                <Calendar size={14} /> 2023 – 2027
              </div>
            </div>
          </motion.div>

          <div className="certs__grid">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                className="cert-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="cert-card__icon-wrap">
                  {cert.icon}
                </div>
                <div>
                  <p className="cert-card__title">{cert.title}</p>
                  <p className="cert-card__issuer">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Get in touch" title="Let's Connect" />
        <div className="contact__grid">
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="contact__copy">
              I'm actively looking for opportunities in <strong>Software Engineering</strong>,{" "}
              <strong>Systems Engineering</strong>, <strong>Technical Projects</strong>, and{" "}
              <strong>Research</strong>. Whether you have an open role, an exciting technical project, or are looking to collaborate on emerging technology opportunities, I'd love to connect.
            </p>

            <div className="contact__links">
              <a href="mailto:sukumarbv27@gmail.com" target="_blank" rel="noopener noreferrer" className="contact__link">
                <div className="contact__link-icon"><Mail size={20} /></div>
                <span>sukumarbv27@gmail.com</span>
                <ArrowUpRight size={16} className="contact__link-arrow" />
              </a>
              <a href="https://github.com/SukumarBV" target="_blank" rel="noopener noreferrer" className="contact__link">
                <div className="contact__link-icon"><Github size={20} /></div>
                <span>github.com/SukumarBV</span>
                <ArrowUpRight size={16} className="contact__link-arrow" />
              </a>
              <a href="https://www.linkedin.com/in/sukumarbv05" target="_blank" rel="noopener noreferrer" className="contact__link">
                <div className="contact__link-icon"><Linkedin size={20} /></div>
                <span>linkedin.com/in/sukumarbv05</span>
                <ArrowUpRight size={16} className="contact__link-arrow" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact__card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="contact__card-inner">
              <div className="contact__card-icon">
                <Mail size={32} />
              </div>
              <p className="contact__card-label">Start a conversation</p>
              <p className="contact__card-email">sukumarbv27@gmail.com</p>
              <a href="mailto:sukumarbv27@gmail.com" className="btn btn--primary btn--lg" style={{ width: "100%" }}>
                Reach Out Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__left">
          <span className="footer__name">Sukumar BV</span>
          <span className="footer__copy">© {new Date().getFullYear()} · Built by Sukumar BV.</span>
        </div>
        <div className="footer__socials">
          <a href="https://github.com/SukumarBV" target="_blank" rel="noopener noreferrer" className="icon-link">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/sukumarbv05" target="_blank" rel="noopener noreferrer" className="icon-link">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <span className="section-header__eyebrow">{eyebrow}</span>
      <h2 className="section-header__title">{title}</h2>
    </motion.div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="app">
      <SkyBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}