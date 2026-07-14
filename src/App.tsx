import React from 'react';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Events from './components/Events';
import Venue from './components/Venue';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen text-stone-100 font-sans selection:bg-[#d4af37]/30 selection:text-[#fcf6ba]">
      
      {/* Scroll depth indicator progress bar at the very top */}
      <ScrollProgressBar />
      
      {/* Background Interactive Rose Petals & Golden Shimmers */}
      <BackgroundEffects />

      {/* Floating Cinematic Audio Player & Visualizer */}
      <MusicPlayer />

      {/* Hero Section with Auspicious Names, SVG Mandala, and Countdown */}
      <Hero />

      {/* Groom & Bride Biographies and Family Lineage */}
      <Couple />

      {/* Royal Wedding Customary Timeline (Itinerary) */}
      <Events />

      {/* Wedding Destination Maps & Helper Coordinates */}
      <Venue />

      {/* Organizer Dashboard (Password Protected) */}
      <AdminPanel />

      {/* Wedding Acknowledgments & Coordination Helpline Contacts */}
      <Footer />

    </div>
  );
}
