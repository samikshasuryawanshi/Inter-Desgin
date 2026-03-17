import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectModal from '../components/ProjectModal';
import { PROJECTS } from '../data/mockData';

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Office'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Floating background animations
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeCategory);

  // Staggered text variants
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="portfolio" ref={containerRef} className="py-24 md:py-40 bg-[#FAF9F6] relative overflow-hidden">
      
      {/* --- Advanced Floating Illustrations --- */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <motion.div 
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-20 right-10 w-[500px] h-[500px] border border-neutral-200/60 rounded-full opacity-40"
        />
        <motion.div 
          style={{ y: y2, rotate: rotate2 }}
          className="absolute bottom-40 left-[-5%] w-[800px] h-[800px] border border-[#C5A059]/10 rounded-full opacity-60"
        />
        {/* Soft Gold Glow */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C5A059]/5 blur-[120px] rounded-full"
        />
      </div>
      
      <div className="container relative mx-auto px-6 md:px-12 mb-20 z-10">
        <motion.div 
          Variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-neutral-200/60 pb-10"
        >
          <motion.div variants={textItem} className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1 }}
              className="text-[#C5A059] uppercase text-xs font-bold mb-4"
            >
              Selected Works
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-serif text-neutral-900"
            >
              Our Portfolio
            </motion.h2>
          </motion.div>
          
          {/* Filters */}
          <motion.div variants={textItem} className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group border ${
                  activeCategory === category 
                    ? 'text-white border-neutral-900' 
                    : 'text-neutral-500 border-neutral-200 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {/* Active Indicator Background */}
                {activeCategory === category && (
                   <motion.div
                     layoutId="activeCategoryBg"
                     className="absolute inset-0 bg-neutral-900 z-0"
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="container relative mx-auto px-6 md:px-12 z-10">
         <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            <AnimatePresence mode="popLayout">
               {filteredProjects.map((project, index) => (
                  <motion.div
                     layout
                     key={project.id}
                     initial={{ opacity: 0, scale: 0.8, y: 50 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.8, y: -50 }}
                     transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                     className="group relative aspect-square md:aspect-[4/5] overflow-hidden cursor-pointer bg-neutral-100 w-full hover:shadow-2xl transition-shadow duration-500"
                     onClick={() => setSelectedProject(project)}
                  >
                     <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                     />
                     
                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[0.16,1,0.3,1] space-y-4">
                           <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 text-white/90 text-xs uppercase tracking-[0.2em]">
                              {project.category}
                           </span>
                           <h4 className="text-white text-3xl font-serif font-medium drop-shadow-lg">
                              {project.title}
                           </h4>
                        </div>
                     </div>
                     
                     {/* Floating Plus Button */}
                     <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[0.6s] ease-[0.16,1,0.3,1] delay-100 shadow-xl">
                        <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </motion.div>
      </div>

      <ProjectModal 
         isOpen={!!selectedProject} 
         project={selectedProject} 
         onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
