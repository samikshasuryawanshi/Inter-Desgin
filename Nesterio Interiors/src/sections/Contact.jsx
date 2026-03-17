import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { cn } from '../utils/cn';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.message.trim()) newErrors.message = 'Please tell us about your project';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = "w-full bg-neutral-50 border-b border-neutral-300 px-4 py-4 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all duration-300 placeholder:text-neutral-400";

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left Side: Info */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            subtitle="Get In Touch"
            title="Start Your Project"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 text-lg leading-relaxed mb-10 max-w-md"
          >
            We'd love to hear about your vision. Fill out the form, and a member of our design team will contact you within 24 hours to schedule an initial consultation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block w-px h-32 bg-neutral-300 origin-top"
          />
        </div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white"
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(inputClasses, errors.name && "border-red-500")}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 px-4">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(inputClasses, errors.email && "border-red-500")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 px-4">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={cn(inputClasses, "appearance-none bg-transparent cursor-pointer text-neutral-900 border-neutral-300", errors.projectType && "border-red-500", !formData.projectType && "text-neutral-400")}
                >
                  <option value="" disabled hidden>Select Project Type *</option>
                  <option value="residential">Residential Design</option>
                  <option value="commercial">Commercial / Office</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="other">Other</option>
                </select>
                {errors.projectType && <p className="text-red-500 text-xs mt-1 px-4">{errors.projectType}</p>}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project, timeline, and budget... *"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={cn(inputClasses, "resize-none mt-2", errors.message && "border-red-500")}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1 px-4">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neutral-900 text-white flex items-center justify-center py-5 uppercase tracking-widest text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </span>
              ) : (
                'Submit Inquiry'
              )}
            </button>

            {/* Success Message */}
            <motion.div
              initial={false}
              animate={{ height: isSuccess ? 'auto' : 0, opacity: isSuccess ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="bg-green-50 text-green-800 p-4 border border-green-200 flex items-center gap-3 mt-4">
                <CheckCircle2 className="text-green-600" size={20} />
                <p className="text-sm font-medium">Thank you! Your inquiry has been sent successfully.</p>
              </div>
            </motion.div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
