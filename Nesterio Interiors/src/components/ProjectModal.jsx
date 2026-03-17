import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-neutral-900 md:text-white md:bg-neutral-900/50 hover:bg-white hover:text-neutral-900 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image Side */}
          <div className="w-full md:w-3/5 h-[40vh] md:h-auto min-h-[300px] relative">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Details Side */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-4 inline-block">
              {project.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-6 leading-tight">
              {project.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed mb-8">
              {project.description}
            </p>
            
            <div className="space-y-4 mb-10">
               <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="text-sm text-neutral-500 uppercase tracking-wide">Client</span>
                  <span className="text-sm font-medium text-neutral-900">Private Residence</span>
               </div>
               <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="text-sm text-neutral-500 uppercase tracking-wide">Year</span>
                  <span className="text-sm font-medium text-neutral-900">2023</span>
               </div>
               <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="text-sm text-neutral-500 uppercase tracking-wide">Location</span>
                  <span className="text-sm font-medium text-neutral-900">New York, NY</span>
               </div>
            </div>

            <button
              onClick={onClose}
              className="w-full px-6 py-4 bg-neutral-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-neutral-800 transition-colors"
            >
              Close Story
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
