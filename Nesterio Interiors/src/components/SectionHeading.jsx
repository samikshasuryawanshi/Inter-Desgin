import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export default function SectionHeading({ title, subtitle, className, alignment = 'left' }) {
  return (
    <div className={cn('mb-16', alignment === 'center' ? 'text-center' : 'text-left', className)}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 mb-4"
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-4xl md:text-5xl font-serif text-neutral-900 font-medium"
      >
        {title}
      </motion.h2>
      {alignment === 'left' && (
         <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-px bg-neutral-300 w-24 mt-8 origin-left"
         />
      )}
      {alignment === 'center' && (
         <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-px bg-neutral-300 w-24 mt-8 mx-auto origin-center"
         />
      )}
    </div>
  );
}
