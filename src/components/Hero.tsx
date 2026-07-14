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

        {/* Masterfully Crafted Rotating Gold Mandala SVG */}
        <motion.div
          variants={mandalaVariants}
          className="mb-8 relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center"
        >
          {/* Outer continuous rotating circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-full h-full"
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-yellow-500/75 glow-gold"
            >
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="25%" stopColor="#fcf6ba" />
                  <stop offset="50%" stopColor="#b8860b" />
                  <stop offset="75%" stopColor="#fcf6ba" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <filter id="royalGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Decorative Lace Circles */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3, 3" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="6, 4" />
              <circle cx="100" cy="100" r="68" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="45" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />

              {/* Traditional Paisley-style Rays */}
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 45 * Math.cos(rad);
                const y1 = 100 + 45 * Math.sin(rad);
                const x2 = 100 + 68 * Math.cos(rad);
                const y2 = 100 + 68 * Math.sin(rad);
                const x3 = 100 + 80 * Math.cos(rad);
                const y3 = 100 + 80 * Math.sin(rad);
                
                return (
                  <g key={i}>
                    {/* Radial Ray lines */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#goldGrad)" strokeWidth="1.5" />
                    {/* Small outer dot gems */}
                    <circle cx={x3} cy={y3} r="2.5" fill="url(#goldGrad)" />
                  </g>
                );
              })}

              {/* Inner Petals */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <path
                    key={i}
                    d="M100,100 C92,75 108,75 100,100"
                    transform={`rotate(${angle} 100 100)`}
                    fill="none"
                    stroke="url(#goldGrad)"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Outer Petals */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 360) / 16;
                return (
                  <path
                    key={i}
                    d="M100,100 C80,50 120,50 100,100"
                    transform={`rotate(${angle} 100 100)`}
                    fill="none"
                    stroke="url(#goldGrad)"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                );
              })}

              <circle cx="100" cy="100" r="10" fill="url(#goldGrad)" filter="url(#royalGlow)" />
            </svg>
          </motion.div>
          
          {/* Core Central Icon overlay (non-rotating center logo for wedding) */}
          <div className="absolute text-yellow-300 font-bold text-lg select-none text-shadow-royal">
            ॐ
          </div>
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
