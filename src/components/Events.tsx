import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { WeddingEvent } from '../types';

const weddingEvents: WeddingEvent[] = [
  {
    id: 'muhurtham',
    name: 'The Auspicious Muhurtham',
    hindiName: 'शुभ विवाह लग्न',
    date: 'Wednesday, August 26, 2026',
    time: '10:16 PM Sharp',
    venue: 'Union Office Hall',
    address: 'Beside Indian Oil Petrol Bunk, Tiruvur Road, Nuzvidu',
    icon: '💍',
    description: 'The sacred sacrament where we take our seven wedding vows (Saptapadi), exchange garlands, and bind our souls for eternity.',
    mapEmbedUrl: '',
  },
  {
    id: 'reception',
    name: 'Grand Royal Reception',
    hindiName: 'वर-वधू स्वागत समारोह',
    date: 'Thursday, August 27, 2026',
    time: '7:00 PM onwards',
    venue: 'Union Office Gardens',
    address: 'Beside Indian Oil Petrol Bunk, Tiruvur Road, Nuzvidu',
    icon: '👑',
    description: 'Join us for a grand banquet dinner, formal photo opportunities, and celebration as we make our first appearance as husband and wife.',
    mapEmbedUrl: '',
  },
];

export default function Events() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="events-section" className="relative min-h-screen py-24 px-4 flex flex-col justify-center items-center z-10 overflow-hidden">
      
      <div className="max-w-5xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="font-script text-3xl md:text-4xl text-[#d4af37]">The Auspicious Schedule</span>
          <h2 className="font-royal text-3xl md:text-5xl font-bold tracking-wider gold-bright mt-2 mb-4 uppercase">
            Wedding Itinerary
          </h2>
          <div className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <p className="text-purple-300/80 text-xs sm:text-sm font-sans mt-3 uppercase tracking-widest">
            A celebration of traditional ceremonies and customs
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-4xl mx-auto pl-4 sm:pl-10 md:pl-24"
        >
          {/* Vertical central path line */}
          <div className="absolute left-[23px] sm:left-[39px] md:left-[55px] top-4 bottom-12 w-[1.5px] bg-gradient-to-b from-[#d4af37] via-[#d4af37]/40 to-transparent dashed opacity-70" />

          <div className="space-y-12">
            {weddingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="relative flex flex-col sm:flex-row gap-6 md:gap-10"
              >
                {/* Timeline Icon Badge */}
                <div className="absolute -left-[32px] sm:-left-[48px] md:-left-[64px] z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-950/90 border-2 border-[#d4af37]/60 shadow-lg shadow-black/80 text-lg sm:text-xl transform select-none glow-gold">
                  {event.icon}
                </div>

                {/* Event Invitation Card */}
                <div className="royal-card rounded-2xl p-6 sm:p-8 w-full border border-[#d4af37]/20 relative group hover:scale-[1.01] transition-all duration-300">
                  
                  {/* Subtle inside corner design highlights */}
                  <div className="absolute top-4 right-4 text-[#d4af37]/10 text-4xl select-none font-bold">
                    0{index + 1}
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <span className="text-[#d4af37]/80 font-sans font-medium text-[10px] tracking-widest uppercase">
                      {event.hindiName}
                    </span>
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-yellow-100 mt-0.5">
                      {event.name}
                    </h3>
                  </div>

                  {/* Body details */}
                  <p className="font-serif text-sm text-purple-200/85 mb-6 leading-relaxed italic">
                    "{event.description}"
                  </p>

                  {/* Information Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-[#d4af37]/15 font-serif text-xs sm:text-sm text-stone-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-1">
                      <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="truncate text-stone-300" title={`${event.venue}, ${event.address}`}>
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
