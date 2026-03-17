import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effect for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Staggered text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  // Entering animation for the whole section (sliding boxes)
  const overlayVariants = {
    hidden: { scaleY: 1 },
    visible: { 
      scaleY: 0, 
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } 
    }
  };

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950">
      
      {/* Intro Reveal Box */}
      <motion.div 
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        originY={0}
        className="absolute inset-0 bg-[#F5F5F7] z-20 origin-top"
      />

      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 z-0 origin-center"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-neutral-900/40" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="overflow-hidden mb-6">
            <p className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base font-medium">
              Elevating Your Environment
            </p>
          </motion.div>
          
          <div className="overflow-hidden mb-10">
             <motion.h1
               variants={itemVariants}
               className="text-5xl md:text-7xl lg:text-8xl font-serif text-white max-w-5xl leading-tight"
             >
               Crafting Timeless <br className="hidden md:block" /> Architectural Interiors
             </motion.h1>
          </div>

          <motion.div
             variants={itemVariants}
             className="flex flex-col sm:flex-row gap-4 relative"
          >
            <motion.a
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              href="#portfolio"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-900 font-medium tracking-wide transition-colors z-10 overflow-hidden"
            >
              <motion.div
                variants={{
                  initial: { y: "100%" },
                  hover: { y: "0%" }
                }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                className="absolute inset-0 bg-neutral-950 z-0"
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
              <motion.span
                variants={{
                  initial: { x: -10, opacity: 0, width: 0 },
                  hover: { x: 0, opacity: 1, width: "auto" }
                }}
                className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300"
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.a>
            <motion.a
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 border border-white text-white font-medium tracking-wide transition-all duration-300 z-10 overflow-hidden hover:border-neutral-950"
            >
              <motion.div
                variants={{
                  initial: { scaleY: 0, originY: 1 },
                  hover: { scaleY: 1, originY: 1 }
                }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                className="absolute inset-0 bg-neutral-950 z-0"
              />
              <span className="relative z-10 transition-colors duration-300">Get Consultation</span>
              <motion.span
                variants={{
                  initial: { x: -10, opacity: 0, width: 0 },
                  hover: { x: 0, opacity: 1, width: "auto" }
                }}
                className="relative z-10 flex items-center"
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Floating Elements */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 mix-blend-difference z-10"
      >
         <span className="text-white/50 text-xs tracking-widest uppercase transform -rotate-90 origin-left translate-y-20">Est. 2008</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/30 overflow-hidden relative">
           <motion.div 
              animate={{ y: [0, 48, 48], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
           />
        </div>
      </motion.div>
    </section>
  );
}
