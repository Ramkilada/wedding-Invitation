import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Leaf } from 'lucide-react';

interface Petal {
  x: number;
  y: number;
  r: number; // radius
  d: number; // density/weight
  color: string; // color (rose, marigold, gold)
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swing: number;
  swingSpeed: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  useEffect(() => {
    if (!particlesEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Colors: Rich Gold, deep purple, lavender, and marigold
    const petalColors = [
      'rgba(212, 175, 55, 0.85)',  // Rich Gold (#d4af37)
      'rgba(168, 85, 247, 0.75)',  // Purple/Amethyst
      'rgba(192, 132, 252, 0.75)', // Lavender
      'rgba(245, 158, 11, 0.75)',  // Amber/Marigold
    ];

    const petals: Petal[] = [];
    const maxPetals = 45;

    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    function createPetal(randomY = false): Petal {
      const size = Math.random() * 12 + 6;
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -20,
        r: size,
        d: Math.random() * 1.5 + 0.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        speedY: Math.random() * 1.5 + 1.0,
        speedX: Math.random() * 1.0 - 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 2 - 1) * 1.5,
        swing: Math.random() * 30,
        swingSpeed: Math.random() * 0.02 + 0.005,
      };
    }

    let tick = 0;

    function draw() {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw each petal
      petals.forEach((petal, index) => {
        ctx.save();
        
        // Calculate swing / horizontal sway
        const sway = Math.sin(tick * petal.swingSpeed) * petal.swing * 0.2;
        ctx.translate(petal.x + sway, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);

        ctx.fillStyle = petal.color;
        ctx.beginPath();

        // Let's draw realistic organic shapes based on color
        if (petal.color.includes('218, 165, 32')) {
          // Gold dust/sparkle - draw a small sparkling star or diamond
          ctx.moveTo(0, -petal.r / 2);
          ctx.lineTo(petal.r / 4, -petal.r / 4);
          ctx.lineTo(petal.r / 2, 0);
          ctx.lineTo(petal.r / 4, petal.r / 4);
          ctx.lineTo(0, petal.r / 2);
          ctx.lineTo(-petal.r / 4, petal.r / 4);
          ctx.lineTo(-petal.r / 2, 0);
          ctx.lineTo(-petal.r / 4, -petal.r / 4);
        } else if (petal.color.includes('245, 158, 11')) {
          // Marigold petal - round fan shape
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-petal.r, -petal.r, petal.r, -petal.r, 0, petal.r);
        } else {
          // Rose petal - organic leaf/heart shape
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-petal.r, -petal.r * 1.5, -petal.r * 1.5, petal.r * 0.5, 0, petal.r * 1.5);
          ctx.bezierCurveTo(petal.r * 1.5, petal.r * 0.5, petal.r, -petal.r * 1.5, 0, 0);
        }

        ctx.closePath();
        ctx.fill();

        // Add a subtle golden border to rose/marigold petals
        if (!petal.color.includes('218, 165, 32')) {
          ctx.strokeStyle = 'rgba(251, 245, 183, 0.3)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.restore();

        // Update positions
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotation += petal.rotationSpeed;

        // Reset offscreen petals
        if (petal.y > height + 20 || petal.x < -20 || petal.x > width + 20) {
          petals[index] = createPetal(false);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particlesEnabled]);

  return (
    <>
      {/* Background Deep Royal Canvas Gradient */}
      <div className="fixed inset-0 bg-[#0a0514] z-0 pointer-events-none" />

      {/* Subtle Background Texture */}
      <div 
        className="fixed inset-0 opacity-[0.04] pointer-events-none z-[1]" 
        style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}
      />

      {/* Royal Subtle Indian Patterns / Mandalas in Background */}
      <div className="fixed inset-0 opacity-5 mix-blend-overlay pointer-events-none z-[1]">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37] via-transparent to-transparent opacity-30" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37] via-transparent to-transparent opacity-30" />
      </div>

      {/* Bokeh lights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2] opacity-40">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-900/15 blur-[120px] -top-40 -left-40 animate-pulse duration-[8000ms]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-950/10 blur-[150px] top-1/3 -right-60" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-[#d4af37]/5 blur-[100px] bottom-10 left-1/4 animate-pulse duration-[6000ms]" />
      </div>

      {/* Canvas for Falling Petals and Stars */}
      {particlesEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-10"
        />
      )}

      {/* Controls to toggle falling particles (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setParticlesEnabled(!particlesEnabled)}
          className="p-3 bg-black/40 hover:bg-black/60 border border-yellow-600/30 text-yellow-500 rounded-full hover:border-yellow-500/80 hover:text-yellow-400 transition-all duration-300 backdrop-blur-md flex items-center justify-center shadow-lg group"
          title={particlesEnabled ? "Disable Falling Petals" : "Enable Falling Petals"}
          id="btn-toggle-particles"
        >
          {particlesEnabled ? (
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          ) : (
            <Leaf className="w-5 h-5" />
          )}
          <span className="max-w-0 overflow-hidden group-hover:max-w-28 group-hover:ml-2 transition-all duration-300 text-xs font-sans font-medium tracking-wide">
            {particlesEnabled ? "Quiet Mode" : "Festive Mode"}
          </span>
        </button>
      </div>
    </>
  );
}
