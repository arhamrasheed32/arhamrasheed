'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'C'],
  },
  {
    title: 'AI/ML & Data Science',
    items: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'MLflow', 'Exploratory Data Analysis (EDA)', 'Data Visualization', 'Tableau'],
  },
  {
    title: 'Backend Development',
    items: ['FastAPI', 'REST APIs'],
  },
  {
    title: 'Frontend Development',
    items: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'Database Design', 'SQL Query Optimization', 'Relational Database Management Systems (RDBMS)'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions'],
  },
  {
    title: 'Monitoring & Observability',
    items: ['Prometheus', 'Grafana'],
  },
  {
    title: 'Computer Science Fundamentals',
    items: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Database Management Systems (DBMS)', 'Operating Systems', 'Computer Architecture'],
  },
  {
    title: 'Developer Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Figma'],
  },
]

function SkillCard({ category, idx }: { category: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const stopColor = isHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.82, filter: 'blur(16px)', y: 50 }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
      whileHover={{
        scale: 1.015,
        borderColor: 'rgba(125, 211, 252, 0.35)',
        boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className="relative rounded-3xl border border-white/10 p-6 md:p-8 overflow-hidden flex flex-col gap-4 transition-colors duration-300"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(24px)' }}
    >
      {/* Dynamic Glowing Border Beam SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
        <defs>
          <linearGradient id={`silver-gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stopColorEdge} />
            <stop offset="30%" stopColor={stopColor} />
            <stop offset="50%" stopColor={stopColor} />
            <stop offset="100%" stopColor={stopColorEdge} />
          </linearGradient>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          rx="23"
          ry="23"
          fill="none"
          stroke={`url(#silver-gradient-${idx})`}
          strokeWidth="1.5"
          className="transition-all duration-300"
          style={{
            strokeDasharray: isHovered ? "200 450" : "140 520",
            animation: isHovered ? "borderBeam 4s linear infinite" : "borderBeam 7s linear infinite",
            opacity: isHovered ? 0.8 : 0.4
          }}
        />
      </svg>

      {/* Dynamic Cursor Spotlight (Silvery Light Circle) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.07), transparent 75%)`,
        }}
      />

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent relative z-10" />

      <h3 className="text-xl md:text-2xl font-medium text-white/90 leading-tight tracking-tight relative z-10">
        {category.title}
      </h3>

      <div className="flex flex-wrap gap-2 mt-2 relative z-10">
        {category.items.map((item: string) => (
          <motion.span
            key={item}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.35)',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              transition: { duration: 0.2 }
            }}
            className="px-3.5 py-1.5 rounded-full text-sm font-normal text-white/70 bg-white/5 border border-white/10 transition-all cursor-default"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function TechSkills() {
  return (
    <section className="w-full py-20">
      {/* Section heading — Zoom in & blur reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-transparent bg-clip-text pb-1"
          style={{
            backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 8s linear infinite',
          }}
        >
          Technical Skills
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Grid of skill categories — Zoom in entrance matching Education card style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {SKILL_CATEGORIES.map((category, idx) => (
          <SkillCard key={category.title} category={category} idx={idx} />
        ))}
      </div>
    </section>
  )
}
