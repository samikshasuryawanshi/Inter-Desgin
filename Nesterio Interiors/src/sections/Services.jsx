import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Home, Lightbulb, PenTool, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const SERVICES = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Bespoke living environments tailored to your lifestyle. We curate every detail from heritage restoration to ultra-modern penthouses.',
    features: ['Custom Millwork', 'Furniture Sourcing', 'Color Psychology']
  },
  {
    icon: Layers,
    title: 'Commercial Spaces',
    description: 'Strategic environments designed to boost productivity and broadcast your brand identity to every client who walks through the door.',
    features: ['Brand Integration', 'Spatial Efficiency', 'Acoustic Design']
  },
  {
    icon: PenTool,
    title: 'Space Planning',
    description: 'Architectural flow optimization. We treat every square inch as a premium asset, ensuring harmony between movement and stillness.',
    features: ['Zoning Analysis', 'Traffic Flow', 'Ergonomic Audits']
  },
  {
    icon: Lightbulb,
    title: '3D Visualization',
    description: 'Eliminate uncertainty with hyper-realistic renders. Walk through your future space in high-fidelity before a single brick is laid.',
    features: ['VR Walkthroughs', 'Material Physics', 'Solar Studies']
  }
];

export default function EnhancedServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother Spring-based parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const floatY1 = useTransform(smoothProgress, [0, 1], [-100, 100]);
  const floatY2 = useTransform(smoothProgress, [0, 1], [50, -150]);
  const rotateSlower = useTransform(smoothProgress, [0, 1], [0, 25]);
  const scaleBlur = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-[#FAF9F6] relative overflow-hidden">
      
      {/* --- Advanced Floating Illustrations --- */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Large Decorative Circle */}
        <motion.div 
          style={{ y: floatY1, rotate: rotateSlower, scale: scaleBlur }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] border border-neutral-200/60 rounded-full opacity-40"
        />
        
        {/* Modern Geometric Line Work */}
        <motion.div 
          style={{ y: floatY2, x: 50 }}
          className="absolute top-1/2 right-[-5%] w-96 h-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent rotate-[120deg]"
        />
        
        {/* Soft Gold Glow */}
        <motion.div 
          style={{ y: floatY1 }}
          className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#C5A059]/5 blur-[120px] rounded-full"
        />

        {/* Abstract "Blueprint" Square */}
        <motion.div 
          style={{ y: floatY2, rotate: -15 }}
          className="absolute bottom-10 left-10 w-40 h-40 border border-[#C5A059]/20 rounded-2xl opacity-40"
        />
      </div>

      <div className="container relative mx-auto px-6 z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1 }}
            className="text-[#C5A059] uppercase text-xs font-bold mb-4"
          >
            Curated Expertise
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-serif text-neutral-900 text-center"
          >
            Our Services
          </motion.h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px bg-[#C5A059] my-8"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-neutral-500 text-center max-w-xl text-lg font-light leading-relaxed"
          >
            We don't just design rooms; we choreograph the interplay of <span className="text-neutral-900 font-medium italic">light</span>, <span className="text-neutral-900 font-medium italic">texture</span>, and <span className="text-neutral-900 font-medium italic">space</span>.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-neutral-100 p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]"
            >
              {/* Card Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/0 to-[#C5A059]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10 relative">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-900 transition-all duration-500 group-hover:bg-neutral-900 group-hover:text-white">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  {/* Subtle Sparkle Decor */}
                  <Sparkles className="absolute -top-2 -right-2 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100" size={16} />
                </div>
                
                <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-4">{service.title}</h3>
                
                <p className="text-neutral-500 text-[15px] leading-relaxed mb-8 flex-grow opacity-90 group-hover:opacity-100">
                  {service.description}
                </p>

                <div className="space-y-3 mb-10">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-[1px] w-3 bg-[#C5A059]/40 group-hover:w-5 transition-all duration-500" />
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-600 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <a href="#contact" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] group/link">
                  <span className="mr-2">Explore</span>
                  <div className="relative flex items-center">
                    <motion.div 
                      className="transition-transform duration-300 group-hover/link:translate-x-2"
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}