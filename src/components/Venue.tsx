import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, ExternalLink, Calendar } from 'lucide-react';

export default function Venue() {
  const address = 'Union Office beside Indian Oil Petrol Bunk, Tiruvur Road, Nuzvidu, Andhra Pradesh 521201';
  const groomFamilyPhone = '+91 8712225502';
  const brideFamilyPhone = '+91 9177222506';
  const email = 'ramkiladi57@gmail.com'; // Personalized email
  
  // High-precision coordinates for Nuzvidu
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Union Office beside Indian Oil Petrol Bunk, Tiruvur Road, Nuzvidu')}`;
  
  // Real coordinates embed of Nuzvidu region
  const embedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15259.030635489813!2d80.8953155!3d16.7882205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f082e6ef30e5%3A0xc3f8e562725e2e9d!2sNuzividu%2C%20Andhra%20Pradesh%20521201!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <section id="venue-section" className="relative min-h-screen py-24 px-4 flex flex-col justify-center items-center z-10 overflow-hidden">
      <div className="max-w-5xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-script text-3xl md:text-4xl text-[#d4af37]">The Royal Destination</span>
          <h2 className="font-royal text-3xl md:text-5xl font-bold tracking-wider gold-bright mt-2 mb-4 uppercase">
            Wedding Venue
          </h2>
          <div className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <p className="text-purple-300/80 text-xs sm:text-sm font-sans mt-3 uppercase tracking-widest max-w-md mx-auto">
            Guidance and coordinates to our auspicious celebration hall
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="royal-card rounded-2xl p-6 sm:p-8 border border-[#d4af37]/20 flex-grow relative overflow-hidden flex flex-col justify-center">
              <div className="ornate-corner ornate-corner-tl" />
              <div className="ornate-corner ornate-corner-tr" />
              <div className="ornate-corner ornate-corner-bl" />
              <div className="ornate-corner ornate-corner-br" />

              <span className="text-[10px] font-sans font-bold tracking-widest text-[#d4af37] uppercase mb-2 block">
                MAIN VENUE HALL
              </span>
              <h3 className="font-royal text-2xl sm:text-3xl font-bold text-yellow-100 mb-6 tracking-wide uppercase">
                Union Office Hall
              </h3>

              <div className="space-y-6">
                {/* Address row */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/25 mt-1">
                    <MapPin className="text-[#d4af37] w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs tracking-wider text-[#d4af37] uppercase mb-1">
                      Address Details
                    </h4>
                    <p className="font-serif text-sm text-stone-300 leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Date Reminder row */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/25 mt-1">
                    <Calendar className="text-[#d4af37] w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs tracking-wider text-[#d4af37] uppercase mb-1">
                      Wedding Date
                    </h4>
                    <p className="font-serif text-sm text-stone-300 leading-relaxed">
                      Wednesday, August 26, 2026<br />
                      <span className="text-[#d4af37]/90 font-medium">Muhurtham: 10:16 PM onwards</span>
                    </p>
                  </div>
                </div>

                {/* Phone row */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/25 mt-1">
                    <Phone className="text-[#d4af37] w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs tracking-wider text-[#d4af37] uppercase mb-1">
                      Helpline & Coordination
                    </h4>
                    <div className="font-serif text-sm text-stone-300 space-y-1 mt-1">
                      <p className="flex justify-between gap-4">
                        <span>Groom's Family:</span>
                        <a href={`tel:${groomFamilyPhone}`} className="text-[#d4af37] hover:underline font-medium">
                          {groomFamilyPhone}
                        </a>
                      </p>
                      <p className="flex justify-between gap-4">
                        <span>Groom's Family:</span>
                        <a href={`tel:${brideFamilyPhone}`} className="text-[#d4af37] hover:underline font-medium">
                          {brideFamilyPhone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="mt-8">
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-br from-[#d4af37] to-[#b8860b] hover:brightness-110 text-black font-sans font-bold text-xs tracking-wider rounded-xl transition-all duration-300 glow-gold"
                  id="btn-get-directions"
                >
                  <Navigation className="w-4 h-4 fill-black text-black" />
                  GET NAVIGATION PATH
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Interactive Map Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="royal-card rounded-2xl p-2.5 border border-[#d4af37]/20 shadow-2xl h-full min-h-[400px] flex flex-col">
              <iframe
                title="Union Office Nuzvidu Map Location"
                width="100%"
                height="100%"
                className="rounded-xl flex-grow border-0 min-h-[380px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer"
                src={embedSrc}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
