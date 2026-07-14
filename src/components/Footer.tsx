import React from 'react';
import { motion } from 'motion/react';
import { Heart, Mail, Phone, Landmark, MessageSquare, Instagram, Facebook, Globe } from 'lucide-react';

export default function Footer() {
  const groomFamilyPhone = '+91 8712225502';
  const brideFamilyPhone = '+91 9177222506';
  const email = 'ramkiladi57@gmail.com';

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/ramkilada/?hl=en', label: 'Instagram' },
    { icon: <Facebook className="w-5 h-5" />, url: '#', label: 'Facebook' },
    { icon: <Globe className="w-5 h-5" />, url: '#', label: 'Wedding Web' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-transparent via-[#0a0514]/80 to-[#05020a] border-t border-[#d4af37]/15 py-16 px-4 select-none z-10 overflow-hidden">
      
      {/* Decorative Golden Corner Ribbon Accents */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay">
        {/* Repeating mandala motif background */}
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Visual Mandala Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border border-[#d4af37]/35 rounded-full flex items-center justify-center mb-6 text-[#d4af37] glow-gold"
        >
          <Landmark className="w-5 h-5" />
        </motion.div>

        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <span className="font-script text-3xl md:text-4xl text-[#d4af37]">Kilada & Madireddy</span>
          <h3 className="font-royal text-2xl sm:text-3xl font-bold tracking-wider gold-bright mt-1 mb-4 uppercase">
            With Warmest Gratitude
          </h3>
          <p className="font-serif text-sm sm:text-base text-stone-300 italic max-w-xl mx-auto leading-relaxed">
            "Your warm blessings, constant prayers, and loving support are our greatest wedding gifts. 
            We look forward to welcoming you to our auspicious celebrations and seeking your divine blessings."
          </p>
        </motion.div>

        {/* Quick Contacts Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-3 gap-4 w-full max-w-2xl mb-12"
        >
          {/* Contact 1 */}
          <div className="royal-card rounded-xl p-4 border border-[#d4af37]/15 backdrop-blur-md flex flex-col items-center">
            <Phone className="w-4 h-4 text-[#d4af37] mb-1.5" />
            <span className="text-[9px] font-sans text-stone-400 uppercase tracking-widest">Groom's Helpline</span>
            <a href={`tel:${groomFamilyPhone}`} className="text-xs font-semibold text-yellow-100 mt-1 hover:underline">
              {groomFamilyPhone}
            </a>
          </div>

          {/* Contact 2 */}
          <div className="royal-card rounded-xl p-4 border border-[#d4af37]/15 backdrop-blur-md flex flex-col items-center justify-center">
            <Mail className="w-4 h-4 text-[#d4af37] mb-1.5" />
            <span className="text-[9px] font-sans text-stone-400 uppercase tracking-widest">Auspicious Email</span>
            <a href={`mailto:${email}`} className="text-xs font-semibold text-yellow-100 mt-1 hover:underline">
              {email}
            </a>
          </div>

          {/* Contact 3 */}
          <div className="royal-card rounded-xl p-4 border border-[#d4af37]/15 backdrop-blur-md flex flex-col items-center">
            <Phone className="w-4 h-4 text-[#d4af37] mb-1.5" />
            <span className="text-[9px] font-sans text-stone-400 uppercase tracking-widest">Groom's Helpline</span>
            <a href={`tel:${brideFamilyPhone}`} className="text-xs font-semibold text-yellow-100 mt-1 hover:underline">
              {brideFamilyPhone}
            </a>
          </div>
        </motion.div>

        {/* Elegant Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-4 mb-10"
        >
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              whileHover={{ scale: 1.15, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-[#0a0514]/60 border border-[#d4af37]/25 text-[#d4af37] hover:text-[#fcf6ba] rounded-full transition-all duration-300 hover:border-[#d4af37]/60 shadow-lg"
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Traditional Footer line */}
        <div className="flex items-center gap-3 w-full justify-center mb-6">
          <div className="h-[1px] w-12 bg-[#d4af37]/15" />
          <span className="text-[10px] text-[#d4af37]/45 uppercase tracking-[0.25em] font-sans">
            MANGALAM SUTRA
          </span>
          <div className="h-[1px] w-12 bg-[#d4af37]/15" />
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-stone-500 text-[10px] sm:text-xs font-sans tracking-wide"
        >
          <p>
            © 2026 Wedding Celebration of Santhosh Kumar & Ramani.
          </p>
          <p className="mt-1 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 fill-rose-600 text-rose-600 animate-pulse" /> for their auspicious lifetime together.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
