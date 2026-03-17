import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#home" className="text-2xl font-serif font-bold tracking-tight text-white mb-6 block flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center text-lg">N</span>
              esterio.
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Crafting premium, tailored spaces that reflect your unique lifestyle and aesthetic. Minimal, timeless, and elegant interior design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-neutral-400 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Our Services</a></li>
              <li><a href="#portfolio" className="text-neutral-400 hover:text-white transition-colors text-sm">Portfolio</a></li>
              <li><a href="#testimonials" className="text-neutral-400 hover:text-white transition-colors text-sm">Testimonials</a></li>
              <li><a href="#contact" className="text-neutral-400 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Residential Design</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Commercial Design</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Space Planning</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">3D Visualization</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Custom Furniture</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-neutral-500 mt-0.5" />
                <span className="text-neutral-400 text-sm">123 Design Avenue, Suite 400<br />New York, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-neutral-500" />
                <a href="tel:+1234567890" className="text-neutral-400 hover:text-white transition-colors text-sm">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-neutral-500" />
                <a href="mailto:hello@nesterio.com" className="text-neutral-400 hover:text-white transition-colors text-sm">hello@nesterio.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} Nesterio Interiors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
