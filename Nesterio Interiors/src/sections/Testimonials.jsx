import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth parallax for background elements
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const floatY1 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const floatY2 = useTransform(smoothProgress, [0, 1], [-50, 150]);
  const rotateSlower = useTransform(smoothProgress, [0, 1], [0, -25]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)"
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = TESTIMONIALS.length - 1;
    if (newIndex >= TESTIMONIALS.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  return (
    <section id="testimonials" ref={containerRef} className="py-24 md:py-40 bg-[#FAF9F6] relative overflow-hidden">
      
      {/* --- Advanced Floating Illustrations --- */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <motion.div 
          style={{ y: floatY1, rotate: rotateSlower }}
          className="absolute top-10 left-10 w-[400px] h-[400px] border border-neutral-200/60 rounded-full opacity-40"
        />
        <motion.div 
          style={{ y: floatY2 }}
          className="absolute bottom-20 right-[-10%] w-[600px] h-[600px] border border-[#C5A059]/10 rounded-full opacity-60"
        />
        {/* Soft Gold Glow */}
        <motion.div 
          style={{ y: floatY1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="container relative mx-auto px-6 md:px-12 z-10">
        
        {/* Section Heading matching Services & Portfolio */}
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1 }}
            className="text-[#C5A059] uppercase text-xs font-bold mb-4"
          >
            Client Reviews
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-serif text-neutral-900 text-center"
          >
            What They Say
          </motion.h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px bg-[#C5A059] my-8"
          />
        </div>

        <div className="max-w-5xl mx-auto relative h-[450px] md:h-[350px] flex items-center justify-center">
             
          {/* Main Decorative Quote Icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-[#C5A059]/20 z-0">
             <Quote size={120} strokeWidth={0.5} />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full px-4 md:px-20 text-center flex flex-col items-center cursor-grab active:cursor-grabbing z-10"
            >
              <div className="flex justify-center mb-10 gap-2">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Star size={18} className="fill-[#C5A059] text-[#C5A059]" />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-2xl md:text-4xl font-serif text-neutral-900 leading-relaxed md:leading-normal mb-12">
                "{TESTIMONIALS[currentIndex].text}"
              </p>
              
              <div className="flex flex-col items-center">
                 <div className="w-12 h-px bg-neutral-300 mb-6" />
                 <h4 className="text-lg font-semibold tracking-wider uppercase text-neutral-900 mb-2">
                   {TESTIMONIALS[currentIndex].name}
                 </h4>
                 <p className="text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase">
                   {TESTIMONIALS[currentIndex].role}
                 </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-6 z-20">
             <button 
               onClick={() => paginate(-1)}
               className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-[#C5A059] hover:shadow-md transition-all duration-300 group"
             >
               <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
             </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-6 z-20">
             <button 
               onClick={() => paginate(1)}
               className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-[#C5A059] hover:shadow-md transition-all duration-300 group"
             >
               <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-16 relative z-10">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex ? 'bg-[#C5A059] w-8' : 'bg-neutral-300 w-2 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
