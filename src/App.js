import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Calendar } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

/* ---------------- MAIN APP ---------------- */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/traffic-mlops" element={<TrafficProject />} />
        <Route path="/projects/nlp-query-engine" element={<NLPProject />} />
        <Route path="/projects/recommendation-app" element={<RecommendationProject />} />
        <Route path="/projects/lung-cancer" element={<LungCancerProject />} />
      </Routes>
    </Router>
  );
}

/* ---------------- HOME PAGE ---------------- */
function Home() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <NextBuild />
      <Contact />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent blur-3xl" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8 z-10"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl font-bold">
          SB
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 relative z-10"
      >
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Sukumar BV
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-indigo-300 mb-4 relative z-10"
      >
        Aspiring Software Engineer · AI & ML Specialist
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-slate-400 max-w-2xl mb-10 relative z-10"
      >
        Third-year engineering student specializing in AI & ML with hands-on experience 
        in developing fullstack applications. Proficient in NLP and Computer Vision, 
        creating intelligent, data-driven systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-4 flex-wrap justify-center relative z-10"
      >
        <a
          href="https://github.com/SukumarBV"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30 cursor-pointer"
        >
          <Github size={20} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sukumarbv05"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl border border-slate-600 hover:border-indigo-400 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Linkedin size={20} />
          LinkedIn
        </a>
        <a
          href="mailto:sukumarbv27@gmail.com"
          className="px-6 py-3 rounded-xl border border-slate-600 hover:border-indigo-400 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Mail size={20} />
          Email
        </a>
      </motion.div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed text-lg">
              I'm a <b className="text-indigo-400">third-year AI & Machine Learning engineering student</b> passionate 
              about building production-ready AI systems. My expertise spans <b>NLP, Computer Vision, 
              and Recommendation Systems</b>, with a strong focus on MLOps, automation, and scalable deployment.
            </p>
            <p className="text-slate-300 leading-relaxed">
              I don't just build models — I create complete, data-driven systems with robust pipelines, 
              monitoring, and cloud-optimized deployments. Currently seeking internship opportunities 
              to apply my skills in real-world environments.
            </p>
          </div>
          <div className="space-y-3">
            <InfoItem icon="📍" label="Location" value="Mysuru, Karnataka, India" />
            <InfoItem icon="📧" label="Email" value="sukumarbv27@gmail.com" />
            <InfoItem icon="📱" label="Phone" value="+91 9380964393" />
            <InfoItem icon="🎓" label="Status" value="3rd Year Engineering Student" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 transition-colors">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
        <div className="text-slate-300">{value}</div>
      </div>
    </div>
  );
}

/* ---------------- SKILLS ---------------- */
function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "Java", "JavaScript", "SQL"],
      icon: "💻"
    },
    {
      title: "AI / Machine Learning",
      skills: ["Natural Language Processing (NLP)", "Text-to-SQL", "Computer Vision", "Scikit-learn", "CVZone"],
      icon: "🤖"
    },
    {
      title: "Frameworks & Libraries",
      skills: ["FastAPI", "React", "SQLAlchemy", "OpenCV", "PyAutoGUI"],
      icon: "⚡"
    },
    {
      title: "Databases & DevOps",
      skills: ["PostgreSQL", "Docker", "DockerCompose", "Git & GitHub", "VS Code"],
      icon: "🗄️"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-indigo-300">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function Projects() {
  const projects = [
    {
      title: "AI-Powered NLP Query Engine",
      date: "Oct 2025",
      description: "Built a text-to-SQL platform featuring a Gemini-powered chatbot with dynamic schema discovery, hybrid semantic search, and full containerization with Docker.",
      technologies: ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Gemini AI"],
      highlights: [
        "Dynamic schema discovery module",
        "Hybrid search with semantic vector capabilities",
        "Containerized full-stack application"
      ],
      link: "/projects/nlp-query-engine",
      featured: true
    },
    {
      title: "Product Recommendation App",
      date: "Nov 2025",
      description: "Constructed collaborative filtering recommender systems demonstrating item similarity and user behavior patterns on recommendation results.",
      technologies: ["Python", "Scikit-learn", "K-Nearest Neighbors"],
      highlights: [
        "Item similarity analysis",
        "User behavior modeling",
        "Textual metadata recommendations"
      ],
      link: "/projects/recommendation-app",
      featured: false
    },
    {
      title: "Smart City Traffic Congestion Prediction (MLOps)",
      date: "Jan 2026",
      description: "Built an end-to-end MLOps pipeline for Bengaluru traffic prediction with automated drift detection, retraining, MLflow tracking, and CI/CD cloud deployment.",
      technologies: ["FastAPI", "Scikit-learn", "MLflow", "Docker", "GitHub Actions"],
      highlights: [
        "Automated drift detection & retraining",
        "MLflow experiment tracking",
        "CI/CD with GitHub Actions",
        "Cloud-optimized lightweight models"
      ],
      link: "/projects/traffic-mlops",
      featured: true,
      liveDemo: "https://bengaluru-traffic-mlops.onrender.com"
    },
    {
      title: "Lung Cancer Prediction",
      date: "Jul 2025",
      description: "Developed a lung cancer risk prediction pipeline using multiple classification algorithms with comprehensive model evaluation and medical indicator analysis.",
      technologies: ["Python", "Scikit-learn", "Random Forest", "Logistic Regression", "SVM"],
      highlights: [
        "Multiple algorithm comparison",
        "Medical indicator cross-validation",
        "Exploratory data analysis & visualizations"
      ],
      link: "/projects/lung-cancer",
      featured: false
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                project.featured
                  ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                  : 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-indigo-500/30'
              }`}
            >
              {project.featured && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs text-indigo-300 bg-indigo-500/20 rounded-full border border-indigo-500/50">
                  FEATURED
                </span>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-200">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar size={14} />
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Key Highlights:</h4>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-slate-800/80 text-slate-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  to={project.link}
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
                >
                  View Details <ArrowRight size={16} />
                </Link>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- NEXT BUILD ---------------- */
function NextBuild() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30"
      >
        <h2 className="text-3xl font-bold mb-4 text-purple-300">What I'm Building Next</h2>
        <p className="text-slate-300 leading-relaxed text-lg">
          I'm currently developing a <b className="text-indigo-400">local AI assistant</b> focused on intent
          recognition, voice-based command execution, and automation — without
          relying on cloud LLMs. This project combines my interests in NLP, edge computing, 
          and creating privacy-focused AI solutions.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section className="text-center py-24 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
          I'm actively seeking internship opportunities in AI/ML and software engineering. 
          Feel free to reach out if you'd like to collaborate or discuss opportunities!
        </p>
        <div className="flex justify-center gap-8 text-slate-300">
          <motion.a
            whileHover={{ scale: 1.2, y: -5 }}
            href="https://github.com/SukumarBV"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            <Github size={32} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, y: -5 }}
            href="https://www.linkedin.com/in/sukumarbv05"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            <Linkedin size={32} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, y: -5 }}
            href="mailto:sukumarbv27@gmail.com"
            className="hover:text-indigo-400 transition"
          >
            <Mail size={32} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECT DETAIL PAGES ---------------- */
function TrafficProject() {
  return (
    <ProjectDetail
      title="Smart City Traffic Congestion Prediction (MLOps)"
      date="Jan 2026"
      description="This project implements a production-grade MLOps pipeline for traffic congestion prediction in Bengaluru. It showcases end-to-end ML lifecycle management with automated monitoring, retraining, and deployment."
      technologies={["FastAPI", "Scikit-learn", "MLflow", "Docker", "GitHub Actions", "PostgreSQL"]}
      features={[
        "Live FastAPI inference service with RESTful endpoints",
        "Automated data drift and concept drift detection",
        "MLflow experiment tracking and model registry",
        "GitHub Actions CI/CD pipeline for automated deployment",
        "Cloud-optimized lightweight models for real-time inference",
        "Comprehensive logging and monitoring system",
        "Automated model retraining triggers based on performance degradation"
      ]}
      challenges={[
        "Implementing robust drift detection in production",
        "Balancing model accuracy with inference latency",
        "Designing efficient retraining pipelines",
        "Managing model versioning and rollback strategies"
      ]}
      learnings={[
        "Production MLOps best practices",
        "Automated CI/CD for ML systems",
        "Performance monitoring and alerting",
        "Cloud infrastructure optimization"
      ]}
    />
  );
}

function NLPProject() {
  return (
    <ProjectDetail
      title="AI-Powered NLP Query Engine"
      date="Oct 2025"
      description="A sophisticated text-to-SQL platform that leverages Google's Gemini LLM for natural language database queries. The system features dynamic schema discovery and hybrid search capabilities."
      technologies={["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Gemini AI", "Semantic Search"]}
      features={[
        "Natural language to SQL query conversion using Gemini",
        "Dynamic database schema discovery and adaptation",
        "Hybrid search combining keyword and semantic vector search",
        "Full-stack containerized architecture with Docker",
        "Interactive React frontend for query building",
        "Real-time query optimization and validation",
        "Support for complex multi-table joins and aggregations"
      ]}
      challenges={[
        "Handling ambiguous natural language queries",
        "Optimizing semantic search performance",
        "Managing context for multi-turn conversations",
        "Ensuring SQL injection prevention"
      ]}
      learnings={[
        "LLM integration and prompt engineering",
        "Vector embeddings and semantic search",
        "Full-stack application architecture",
        "Database schema introspection techniques"
      ]}
    />
  );
}

function RecommendationProject() {
  return (
    <ProjectDetail
      title="Product Recommendation App"
      date="Nov 2025"
      description="A collaborative filtering recommendation system that analyzes item similarity and user behavior patterns to provide personalized product suggestions."
      technologies={["Python", "Scikit-learn", "K-Nearest Neighbors", "Pandas", "NumPy"]}
      features={[
        "Item-based collaborative filtering",
        "User behavior pattern analysis",
        "K-Nearest Neighbors implementation for similarity computation",
        "Textual metadata-based recommendations",
        "User rating prediction algorithms",
        "Cold start problem mitigation strategies"
      ]}
      challenges={[
        "Handling sparse user-item matrices",
        "Scaling similarity computations efficiently",
        "Balancing precision and recall",
        "Addressing the cold start problem"
      ]}
      learnings={[
        "Collaborative filtering algorithms",
        "Similarity metrics and their applications",
        "Recommendation system evaluation metrics",
        "Matrix factorization techniques"
      ]}
    />
  );
}

function LungCancerProject() {
  return (
    <ProjectDetail
      title="Lung Cancer Prediction"
      date="Jul 2025"
      description="A comprehensive machine learning pipeline for lung cancer risk prediction using multiple classification algorithms, with extensive model evaluation and medical indicator analysis."
      technologies={["Python", "Scikit-learn", "Random Forest", "Logistic Regression", "SVM", "KNN", "Naive Bayes", "Decision Trees"]}
      features={[
        "Multiple algorithm comparison (Random Forest, Logistic Regression, SVM, KNN, Naive Bayes, Decision Trees)",
        "Medical indicator cross-validation and feature importance analysis",
        "Exploratory data analysis with comprehensive visualizations",
        "Model performance metrics and evaluation",
        "Feature engineering for medical indicators",
        "Hyperparameter tuning for optimal performance"
      ]}
      challenges={[
        "Handling imbalanced medical datasets",
        "Interpreting model predictions for clinical use",
        "Feature selection from numerous medical indicators",
        "Ensuring model reliability for healthcare applications"
      ]}
      learnings={[
        "Medical data preprocessing techniques",
        "Ensemble methods for classification",
        "Model interpretability in healthcare",
        "Cross-validation strategies for reliable evaluation"
      ]}
    />
  );
}

function ProjectDetail({ title, date, description, technologies, features, challenges, learnings }) {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition mb-8">
          ← Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-indigo-400" size={20} />
            <span className="text-slate-400">{date}</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            {description}
          </p>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">Key Features</h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="text-slate-300 flex items-start gap-3">
                    <span className="text-indigo-400 font-bold mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Challenges & Solutions</h3>
              <ul className="space-y-3">
                {challenges.map((challenge, i) => (
                  <li key={i} className="text-slate-300 flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">⚡</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xl font-semibold mb-4 text-pink-300">Key Learnings</h3>
              <ul className="space-y-3">
                {learnings.map((learning, i) => (
                  <li key={i} className="text-slate-300 flex items-start gap-3">
                    <span className="text-pink-400 font-bold mt-1">📚</span>
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}