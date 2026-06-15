'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    title: 'Optimizing Data Transmission Latency in Cloud–Edge–Fog Architecture for Metaverse Applications',
    category: 'Research & Distributed Systems',
    bullets: [
      'Researched Cloud–Edge–Fog architectures to minimize latency and improve real-time data processing for Metaverse environments.',
      'Analyzed distributed computing and resource management strategies to enhance scalability, responsiveness, and user experience.'
    ]
  },
  {
    title: 'AWS Organizational Unit & Control Tower Automation with DevOps Portal',
    category: 'DevOps & Cloud Infrastructure',
    bullets: [
      'Automated AWS organizational setup and governance using Terraform, Ansible, and AWS Control Tower.',
      'Developed a full-stack DevOps portal with CI/CD automation, deployment tracking, and observability using GitHub Actions, Prometheus, and Grafana.'
    ]
  },
  {
    title: 'Customer Relationship Management (CRM) Dashboard',
    category: 'Machine Learning & DevOps',
    bullets: [
      'Built a CRM analytics platform for customer segmentation, transaction analysis, and value prediction.',
      'Implemented machine learning lifecycle management with MLflow and automated deployment pipelines using Jenkins.'
    ]
  },
  {
    title: 'Advanced Stock Prediction with Sentiment Analysis',
    category: 'Financial AI & Machine Learning',
    bullets: [
      'Developed a stock forecasting platform combining machine learning models with real-time market data analysis.',
      'Improved prediction performance through sentiment analysis of financial news and interactive visualization dashboards.'
    ]
  },
  {
    title: 'Smart Parking Management System',
    category: 'Full-Stack & Databases',
    bullets: [
      'Designed and developed a web-based parking management system for slot allocation and booking operations.',
      'Created a relational database architecture for efficient transaction handling and real-time parking availability tracking.'
    ]
  }
]

function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const stopColor = isHovered ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isHovered ? 'rgba(125, 211, 252, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
      whileHover={{
        scale: 1.015,
        borderColor: 'rgba(125, 211, 252, 0.35)',
        boxShadow: '0 0 35px rgba(125, 211, 252, 0.06)',
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className="relative rounded-3xl border border-white/10 p-6 md:p-8 overflow-hidden transition-colors duration-300 flex flex-col justify-between h-full"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(24px)' }}
    >
      {/* Dynamic Glowing Border Beam SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
        <defs>
          <linearGradient id={`silver-gradient-proj-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#silver-gradient-proj-${idx})`}
          strokeWidth="1.5"
          className="transition-all duration-300"
          style={{
            strokeDasharray: isHovered ? "200 500" : "150 550",
            animation: isHovered ? "borderBeam 4s linear infinite" : "borderBeam 8s linear infinite",
            opacity: isHovered ? 0.8 : 0.4
          }}
        />
      </svg>

      <div>
        <span className="text-xs font-mono tracking-widest text-[#7DD3FC]/80 uppercase block mb-3">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-medium text-white/95 leading-snug tracking-tight mb-4 text-left">
          {project.title}
        </h3>
        <ul className="space-y-3 text-sm md:text-base text-white/60 font-light leading-relaxed list-none pl-0 text-left">
          {project.bullets.map((bullet: string, i: number) => (
            <li key={i} className="relative pl-5">
              <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-white/25" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section className="w-full py-20">
      {/* Section heading */}
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
          Key Projects
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 md:px-0">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className={idx === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={project} idx={idx} />
          </div>
        ))}
      </div>
    </section>
  )
}
