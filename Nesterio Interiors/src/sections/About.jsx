import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Floating Backgrounds Parallax
  const floatY1 = useTransform(smoothProgress, [0, 1], [-100, 150]);
  const floatY2 = useTransform(smoothProgress, [0, 1], [50, -150]);
  const floatY3 = useTransform(smoothProgress, [0, 1], [0, 100]);

  // Image & Card Parallax
  const imageY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  // the card will parallax up more rapidly
  const cardY = useTransform(smoothProgress, [0, 1], ["30%", "-30%"]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-40 bg-[#FAF9F6] relative overflow-hidden">
      
      {/* Floating Background Effects */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <motion.div 
          style={{ y: floatY1 }}
          className="absolute top-10 left-[-5%] w-[500px] h-[500px] border border-neutral-200/60 rounded-full opacity-40 mix-blend-multiply"
        />
        <motion.div 
          style={{ y: floatY2 }}
          className="absolute bottom-20 right-[-10%] w-[600px] h-[600px] border border-[#C5A059]/20 rounded-full opacity-50"
        />
        <motion.div 
          style={{ y: floatY3 }}
          className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#C5A059]/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="container relative mx-auto px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="relative isolate group cursor-none">
            <motion.div
               initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
               whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
               viewport={{ once: true, margin: '-100px' }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="aspect-[4/5] overflow-hidden bg-neutral-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative"
            >
              <div className="absolute inset-0 bg-neutral-900/10 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <motion.img 
                style={{ y: imageY, scale: 1.15 }}
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80" 
                alt="Nesterio Interiors Design Studio" 
                className="w-full h-full object-cover origin-center"
              />
            </motion.div>
            
            <motion.div 
              style={{ y: cardY }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -left-8 md:-bottom-16 md:-left-16 bg-white p-10 md:p-12 hidden sm:block max-w-[320px] z-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-neutral-100"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="mb-6 opacity-30">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <p className="font-serif text-6xl text-neutral-900 mb-2 leading-none">200<span className="text-[#C5A059]">+</span></p>
                <div className="w-12 h-px bg-[#C5A059] my-6" />
                <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] leading-relaxed font-bold">Projects completed worldwide</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Text Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col justify-center lg:pl-10"
          >
            <motion.div variants={textVariants}>
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 1 }}
                className="text-[#C5A059] uppercase text-xs font-bold mb-4"
              >
                About Our Studio
              </motion.div>
          
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif text-neutral-900 mb-8 leading-tight"
              >
                Transforming Spaces, Elevating Experiences
              </motion.h2>

              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-px bg-[#C5A059] mb-12"
              />
            </motion.div>
            
            <motion.p variants={textVariants} className="text-neutral-500 text-lg leading-relaxed mb-6 font-light">
              At <strong className="text-neutral-900 font-medium italic">Nesterio Interiors</strong>, we believe that exceptional design is the foundation of a life well-lived. Our multidisciplinary firm approaches every project with a dedication to spatial harmony and material authenticity.
            </motion.p>
            
            <motion.p variants={textVariants} className="text-neutral-500 text-lg leading-relaxed mb-12 font-light">
              With a focus on minimal, timeless aesthetics and premium materials, our studio crafts tailored environments for residential and commercial clients worldwide. Every project is approached with a commitment to authenticity and understated luxury.
            </motion.p>
              
            <motion.div variants={textVariants} className="grid grid-cols-2 gap-10 mb-12 border-t border-neutral-200 pt-12">
              <div className="group cursor-default">
                <h4 className="text-neutral-900 font-bold mb-4 uppercase tracking-[0.15em] text-xs flex items-center gap-3">
                  <span className="w-6 h-px bg-neutral-300 group-hover:bg-[#C5A059] group-hover:w-10 transition-all duration-300" />
                  Philosophy
                </h4>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">Design should be both profoundly beautiful and exceptionally functional.</p>
              </div>
              <div className="group cursor-default">
                <h4 className="text-neutral-900 font-bold mb-4 uppercase tracking-[0.15em] text-xs flex items-center gap-3">
                  <span className="w-6 h-px bg-neutral-300 group-hover:bg-[#C5A059] group-hover:w-10 transition-all duration-300" />
                  Approach
                </h4>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">Collaborative, detail-oriented, and focused on sustainable materials.</p>
              </div>
            </motion.div>

            <motion.div variants={textVariants} className="flex items-center gap-8">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_placeholder.svg" 
                 className="h-10 opacity-40 mix-blend-multiply origin-left grayscale" 
                 alt="Signature" 
               />
               <div className="h-12 w-px bg-neutral-200" />
               <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:text-neutral-900 transition-colors group">
                 Our Story
                 <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
