import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function Hero() {
  const weddingDateStr = '2026-08-26T22:16:00';
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingDateStr) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const mandalaVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden pt-28 pb-16 z-10 select-none">
      
      {/* Decorative Ornate Frame Borders around the entire Hero section */}
      <div className="absolute inset-x-8 inset-y-12 border border-[#d4af37]/25 pointer-events-none rounded-xl" />
      <div className="absolute inset-x-10 inset-y-14 border border-[#d4af37]/10 pointer-events-none rounded-xl" />
      <div className="ornate-corner ornate-corner-tl" />
      <div className="ornate-corner ornate-corner-tr" />
      <div className="ornate-corner ornate-corner-bl" />
      <div className="ornate-corner ornate-corner-br" />

      {/* Floating Shubh Vivah text in Hindi / Sanskrit calligraphy overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-20 text-[10vw] font-serif tracking-widest text-[#d4af37] font-extrabold select-none pointer-events-none"
      >
        शुभ विवाह
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl text-center flex flex-col items-center justify-center relative"
      >
        
        {/* Calligraphy Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-script text-3xl md:text-4xl text-yellow-300 tracking-wide mb-4 text-shadow-royal"
        >
          An Invitation to the Auspicious Wedding Celebration of
        </motion.p>

        {/* Divine Centerpiece Lord Ganesha Icon */}
        <motion.div
          variants={mandalaVariants}
          className="mb-8 relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center"
        >
          {/* Symmetrical glowing background aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 blur-xl opacity-75" />
          
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center select-none filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-yellow-300"
              fill="none"
              stroke="url(#ganeshaGoldGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="ganeshaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#fcf6ba" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>

              {/* Crown (Mukut) */}
              <path d="M50,4 L54,13 L46,13 Z" fill="currentColor" opacity="0.95" />
              <path d="M40,28 L50,11 L60,28" strokeWidth="2.4" />
              <path d="M43,23 L57,23" strokeWidth="1.8" />
              <path d="M46,17 L54,17" strokeWidth="1.5" />
              <path d="M36,28 C36,28 50,30.5 64,28" strokeWidth="2.6" />
              
              {/* Trishul/Tilak on Forehead */}
              <path d="M47,33 Q50,41 53,33" strokeWidth="1.6" />
              <line x1="50" y1="29" x2="50" y2="38" strokeWidth="2" />
              <circle cx="50" cy="34" r="1.8" fill="#fcf6ba" stroke="none" />

              {/* Eyes */}
              <path d="M40.5,38.5 C42.5,39.5 44.5,38.5 45.5,36.5" strokeWidth="1.8" />
              <path d="M59.5,38.5 C57.5,39.5 55.5,38.5 54.5,36.5" strokeWidth="1.8" />
              
              {/* Ears */}
              <path d="M36,28 C17,25 11,48 30,56 C32,57 35,55 35,52" strokeWidth="2.5" />
              <path d="M27,34 C17,32 16,44 27,47" strokeWidth="1.5" opacity="0.75" />
              
              <path d="M64,28 C83,25 89,48 70,56 C68,57 65,55 65,52" strokeWidth="2.5" />
              <path d="M73,34 C83,32 84,44 73,47" strokeWidth="1.5" opacity="0.75" />
              
              {/* Face and Majestic Trunk */}
              <path d="M35.5,33 C35.5,44 41,48 44.5,52" strokeWidth="2.2" />
              <path d="M64.5,33 C64.5,44 59,48 55.5,52" strokeWidth="2.2" />
              
              <path d="M44.5,52 C44.5,64 39.5,78 47.5,85 C54.5,91 68.5,90 72.5,79 C75.5,71 69.5,61 59.5,61 C52.5,61 47.5,67 50.5,74 C53.5,80 61.5,79 60.5,73 C59.5,69 54.5,69 54.5,73" strokeWidth="2.5" />
              
              {/* Single Tusk (Left) & Broken Tusk (Right) */}
              <path d="M41,50 L34,53 L40,54 Z" fill="currentColor" stroke="none" />
              <path d="M59,50 L64,52" strokeWidth="2" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Bride & Groom Royal Typography Section */}
        <motion.div variants={itemVariants} className="mb-6 flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6">
            <h1 className="font-royal text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider gold-text text-shadow-royal text-center uppercase">
              Santhosh Kumar
            </h1>
            <span className="font-script text-4xl md:text-6xl text-[#d4af37] my-1 md:my-0 glow-gold">
              &
            </span>
            <h1 className="font-royal text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider gold-text text-shadow-royal text-center uppercase">
              Ramani
            </h1>
          </div>
          
          {/* Traditional Separator Ribbon */}
          <div className="flex items-center gap-3 w-full justify-center mt-4">
            <div className="h-[1px] w-20 md:w-36 bg-gradient-to-r from-transparent to-[#d4af37]/70" />
            <div className="text-[#d4af37] text-xs">✨  तस्मे श्री गुरवे नमः  ✨</div>
            <div className="h-[1px] w-20 md:w-36 bg-gradient-to-l from-transparent to-[#d4af37]/70" />
          </div>
        </motion.div>

        {/* Date and Venue Snippet */}
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <p className="text-base sm:text-xl font-serif text-[#d4af37] tracking-widest flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-[#d4af37]" />
            WEDNESDAY, AUGUST 26, 2026
          </p>
          <p className="text-sm sm:text-base font-serif text-stone-300 tracking-wide flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-purple-400" />
            UNION OFFICE, NUZVIDU
          </p>
        </motion.div>

        {/* Beautiful traditional quote */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base text-purple-200/80 italic font-serif max-w-xl mx-auto leading-relaxed border-t border-b border-[#d4af37]/10 py-3 mb-8"
        >
          "Two lives, two hearts, joined together in friendship, united forever in love.
          We request the honor of your presence and blessings on our auspicious wedding day."
        </motion.p>

        {/* Dynamic Countdown Section */}
        <motion.div variants={itemVariants} className="w-full">
          {!timeLeft.isCompleted ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md md:max-w-xl mx-auto mb-8">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.minutes },
                { label: 'SECS', val: timeLeft.seconds },
              ].map((timeUnit, i) => (
                <div
                  key={i}
                  className="royal-card rounded-xl py-3 px-1 sm:px-4 flex flex-col items-center justify-center border border-[#d4af37]/20 backdrop-blur-md relative overflow-hidden"
                >
                  <span className="text-xl sm:text-3xl font-royal font-bold text-[#d4af37] tracking-tight">
                    {String(timeUnit.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-sans font-semibold tracking-widest text-stone-400 mt-1">
                    {timeUnit.label}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xl font-royal text-[#d4af37] mb-8 animate-pulse">
              🎉 The Auspicious Wedding Day has Arrived! 🎉
            </div>
          )}
        </motion.div>



      </motion.div>
    </section>
  );
}
