import React from 'react';
import { motion } from 'motion/react';
import { Heart, Landmark } from 'lucide-react';

export default function Couple() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="couple-section" className="relative min-h-screen py-24 px-4 flex flex-col justify-center items-center z-10 overflow-hidden">
      {/* Decorative Traditional Indian Mandala Side Accents */}
      <div className="absolute top-0 left-0 w-44 h-44 opacity-5 pointer-events-none text-[#d4af37] transform -translate-x-1/3 -translate-y-1/3">
        {/* Simple mandala pattern or layout */}
      </div>

      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-16 relative"
        >
          <span className="font-script text-3xl md:text-4xl text-[#d4af37]">The Divine Union of</span>
          <h2 className="font-royal text-3xl md:text-5xl font-bold tracking-wider gold-bright mt-2 mb-4 uppercase">
            Bride & Groom
          </h2>
          <div className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <Heart className="w-5 h-5 text-rose-500 mx-auto mt-2 animate-pulse" />
        </motion.div>

        {/* Groom & Bride Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch"
        >
          
          {/* Groom Card */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="royal-card rounded-3xl p-8 w-full max-w-md relative overflow-hidden flex flex-col h-full border border-[#d4af37]/30">
              
              {/* Corner Ornaments */}
              <div className="ornate-corner ornate-corner-tl" />
              <div className="ornate-corner ornate-corner-tr" />
              <div className="ornate-corner ornate-corner-bl" />
              <div className="ornate-corner ornate-corner-br" />

              {/* Decorative Peacock/Royal Border Circle */}
              <div className="relative w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-[#d4af37]/10 to-purple-900/20 p-1 border-2 border-[#d4af37]/45 mb-6 flex items-center justify-center glow-gold group">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#d4af37]/40 animate-spin" style={{ animationDuration: '40s' }} />
                
                {/* Visual Avatar / Icon representing Royal Groom */}
                <span className="text-6xl text-shadow-royal select-none">👑</span>
              </div>

              {/* Groom Details */}
              <div className="text-center flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4af37] uppercase">
                    The Groom
                  </span>
                  <h3 className="font-royal text-2xl sm:text-3xl font-bold text-yellow-100 mt-2 mb-3 tracking-wide uppercase">
                    Santhosh Kumar
                  </h3>
                  <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-4" />
                </div>

                <div className="space-y-3 font-serif text-stone-300">
                  <p className="text-sm italic">
                    "A gentleman of gentle character, high values, and infinite kindness, embarked on a lifetime of togetherness."
                  </p>
                  
                  {/* Family Lineage */}
                  <div className="pt-4 mt-4 border-t border-[#d4af37]/15 text-xs sm:text-sm">
                    <p className="text-[#d4af37]/80 uppercase tracking-widest font-sans text-[10px] mb-1.5">
                      Beloved Son of
                    </p>
                    <p className="font-semibold text-yellow-100/95 text-sm">
                      Mr. Ramu & Mrs. Appala Narayanamma
                    </p>
                    <p className="text-stone-400 text-xs mt-1">
                      Nuzvidu Family
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="royal-card rounded-3xl p-8 w-full max-w-md relative overflow-hidden flex flex-col h-full border border-[#d4af37]/30">
              
              {/* Corner Ornaments */}
              <div className="ornate-corner ornate-corner-tl" />
              <div className="ornate-corner ornate-corner-tr" />
              <div className="ornate-corner ornate-corner-bl" />
              <div className="ornate-corner ornate-corner-br" />

              {/* Decorative Peacock/Royal Border Circle */}
              <div className="relative w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-[#d4af37]/10 to-purple-900/20 p-1 border-2 border-[#d4af37]/45 mb-6 flex items-center justify-center glow-gold group">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#d4af37]/40 animate-spin" style={{ animationDuration: '40s' }} />
                
                {/* Visual Avatar / Icon representing Royal Bride */}
                <span className="text-6xl text-shadow-royal select-none">🦚</span>
              </div>

              {/* Bride Details */}
              <div className="text-center flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4af37] uppercase">
                    The Bride
                  </span>
                  <h3 className="font-royal text-2xl sm:text-3xl font-bold text-yellow-100 mt-2 mb-3 tracking-wide uppercase">
                    Ramani
                  </h3>
                  <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-4" />
                </div>

                <div className="space-y-3 font-serif text-stone-300">
                  <p className="text-sm italic">
                    "An elegant lady of grace, wisdom, and beautiful spirit, stepping into a magical journey of eternal devotion."
                  </p>
                  
                  {/* Family Lineage */}
                  <div className="pt-4 mt-4 border-t border-[#d4af37]/15 text-xs sm:text-sm">
                    <p className="text-[#d4af37]/80 uppercase tracking-widest font-sans text-[10px] mb-1.5">
                      Beloved Daughter of
                    </p>
                    <p className="font-semibold text-yellow-100/95 text-sm">
                      Late Mr. Thavudu & Mrs. Lakshmi
                    </p>
                    <p className="text-stone-400 text-xs mt-1">
                      Medapalli/Vizianagaram Lineage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Elegant Union Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto mt-16 px-4 py-6 border border-dashed border-[#d4af37]/20 bg-purple-950/5 rounded-2xl"
        >
          <Landmark className="w-6 h-6 text-[#d4af37] mx-auto mb-3" />
          <p className="font-serif text-sm sm:text-base text-purple-100/90 italic leading-relaxed">
            "With the blessings of our ancestors and family, we invite you to stand beside us as we take our seven sacred vows (Saptapadi) and unite our paths forever."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
