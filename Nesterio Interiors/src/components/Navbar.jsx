import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

const NAV_LINKS = [
  { name: 'Home', href: '#home', sectionId: 'home' },
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Services', href: '#services', sectionId: 'services' },
  { name: 'Portfolio', href: '#portfolio', sectionId: 'portfolio' },
  { name: 'Testimonials', href: '#testimonials', sectionId: 'testimonials' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active States
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach(link => {
      const element = document.getElementById(link.sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled || mobileMenuOpen
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-[#C5A059] origin-left z-50"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          className={cn(
            "text-2xl font-serif font-bold tracking-tight flex items-center gap-2 transition-all duration-300 relative z-50",
            (isScrolled || mobileMenuOpen) ? "text-neutral-900" : "text-white",
            isScrolled ? "scale-95" : "scale-100"
          )}
        >
          <span className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors duration-300",
            (isScrolled || mobileMenuOpen) ? "bg-neutral-900 text-[#FAF9F6]" : "bg-[#FAF9F6] text-neutral-900"
          )}>
            N
          </span>
          esterio.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors uppercase tracking-widest py-2 group",
                  isScrolled 
                    ? (isActive ? "text-[#C5A059]" : "text-neutral-500 hover:text-[#C5A059]") 
                    : (isActive ? "text-white" : "text-white/70 hover:text-white")
                )}
                whileHover="hover"
                initial="initial"
                animate={isActive ? "hover" : "initial"}
              >
                <span className="relative z-10">{link.name}</span>
                <motion.span 
                  className={cn(
                    "absolute left-0 bottom-0 w-full h-[2px] origin-left transform rounded-full",
                    isScrolled ? "bg-[#C5A059]" : "bg-white"
                  )}
                  variants={{
                    hover: { scaleX: 1, opacity: 1, transition: { duration: 0.3 } },
                    initial: { scaleX: 0, opacity: 0, transition: { duration: 0.3 } }
                  }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className={cn(
              "px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-none border",
              isScrolled 
                ? "bg-neutral-900 text-[#FAF9F6] border-neutral-900 hover:bg-neutral-800" 
                : "bg-white/10 text-white border-white/20 hover:bg-[#FAF9F6] hover:text-neutral-900 backdrop-blur-sm"
            )}
          >
            Get Consultation
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors duration-300 relative z-50 outline-none",
            (isScrolled || mobileMenuOpen) ? "text-neutral-900" : "text-white"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative flex items-center justify-center">
            <motion.span
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 0 : -4 }}
              className={cn("absolute w-6 h-[2px] bg-current transition-colors", mobileMenuOpen && "bg-neutral-900")}
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              className={cn("absolute w-6 h-[2px] bg-current transition-colors", mobileMenuOpen && "bg-neutral-900")}
            />
            <motion.span
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? 0 : 4 }}
              className={cn("absolute w-6 h-[2px] bg-current transition-colors", mobileMenuOpen && "bg-neutral-900")}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed top-0 left-0 right-0 bg-[#FAF9F6]/95 backdrop-blur-xl border-t border-neutral-200 shadow-2xl overflow-hidden flex flex-col pt-24 pb-8 px-6 z-40"
          >
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col flex-1"
            >
              {NAV_LINKS.map((link) => {
                 const isActive = activeSection === link.sectionId;
                 return (
                  <motion.div
                    key={link.name}
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 }
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "py-5 text-2xl font-serif border-b border-neutral-200 flex items-center justify-between group transition-colors",
                        isActive ? "text-[#C5A059]" : "text-neutral-500 hover:text-[#C5A059]"
                      )}
                    >
                      {link.name}
                      {isActive && <motion.span layoutId="mobileActive" className="w-2 h-2 rounded-full bg-[#C5A059]" />}
                    </a>
                  </motion.div>
                 );
              })}
              
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 }
                }}
                className="mt-auto pt-8"
              >
                <p className="text-neutral-500 text-sm uppercase tracking-widest mb-4">Start a Project</p>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 bg-neutral-900 text-[#FAF9F6] text-center text-sm font-medium tracking-widest uppercase hover:bg-neutral-800 transition-colors mb-8"
                >
                  Get Consultation
                </a>
                
                {/* Social Links Form Mobile */}
                <div className="flex gap-6 justify-center mt-6 pt-6 border-t border-neutral-100">
                  <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
