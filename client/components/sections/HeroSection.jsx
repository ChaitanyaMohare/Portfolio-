'use client';

import { useEffect, useState } from 'react';
import HeroCanvas from '../3d/HeroCanvas';
import { fetchStats } from '@/lib/api';
import { ArrowDownRight, Satellite, Orbit } from 'lucide-react';

export default function HeroSection() {
  const [stats, setStats] = useState({
    eventsHosted: 12,
    projectsBuilt: 20,
    activeUsers: 1200,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      if (data) {
        setStats({
          eventsHosted: data.eventsHosted || 12,
          projectsBuilt: data.projectsBuilt || 20,
          activeUsers: data.activeUsers || 1200,
        });
      }
    }
    loadStats();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full pt-16 flex flex-col justify-between overflow-hidden bg-[#F8F9FA] select-none"
    >
      {/* Subtle Dot-Matrix Grids in Corners */}
      <div className="absolute top-16 left-0 w-64 h-64 bg-dot-matrix opacity-25 pointer-events-none"></div>
      <div className="absolute top-16 right-0 w-64 h-64 bg-dot-matrix opacity-25 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-48 bg-dot-matrix opacity-20 pointer-events-none"></div>

      {/* Top Banner Tag: Futuristic Satellite Orbit Status */}
      <div className="relative z-30 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-electric border-2 border-ink text-ink rounded-full text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_#111111]">
          <Satellite className="w-4 h-4 text-ink" />
          <span>SATELLITE ORBITAL SYSTEM // SKILL REVELATION ACTIVE</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full text-xs font-bold text-ink shadow-[2px_2px_0px_#111111]">
          <Orbit className="w-3.5 h-3.5 text-sky" />
          <span className="text-[11px] uppercase tracking-wide">
            1 Orbit = 1 New Skill Discovered 🛰️
          </span>
        </div>
      </div>

      {/* ================= MAIN CENTER STAGE ================= */}
      <div className="relative flex-1 flex items-center justify-center min-h-[580px] sm:min-h-[640px] px-4">
        
        {/* LAYER 1: Central Identity Name Typography (Visual Center of Attention) */}
        <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <h1 className="font-display text-[15vw] sm:text-[13vw] lg:text-[11vw] leading-[0.82] tracking-tighter text-ink uppercase opacity-95">
            CHAITANYA
          </h1>
          <h1 className="font-display text-[15vw] sm:text-[13vw] lg:text-[11vw] leading-[0.82] tracking-tighter text-ink uppercase opacity-95">
            MOHARE
          </h1>

          <p className="mt-4 font-serif italic text-xl sm:text-2xl md:text-3xl text-ink/80 tracking-tight max-w-2xl text-center px-4">
            Systems Architect & Full-Stack Developer bridging scalable web platforms with embedded hardware
          </p>
        </div>

        {/* LAYER 2: 3D Orbiting Satellite Canvas & Emerging Technology Badges */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-auto">
          <div className="w-full h-full max-w-6xl max-h-[700px]">
            <HeroCanvas />
          </div>
        </div>

      </div>

      {/* LAYER 3: Bottom Left & Right Live Stat Callouts */}
      <div className="relative z-30 pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* Left Stat Card */}
        <div className="brutal-card bg-white p-4 max-w-sm">
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-display text-4xl text-ink">
              {stats.activeUsers.toLocaleString()}+
            </span>
            <span className="text-[11px] font-black uppercase px-2 py-0.5 bg-sky text-white border border-ink">
              Production Users
            </span>
          </div>
          <p className="text-xs font-semibold text-ink/80 leading-relaxed">
            Active users served across <strong className="text-ink">Pravesh Mitra</strong> platform & live deployed campus systems.
          </p>
        </div>

        {/* Center Quick Nav Pill */}
        <div className="hidden lg:flex justify-center pb-2">
          <a
            href="#about"
            className="brutal-btn inline-flex items-center gap-2 px-5 py-2.5 bg-electric text-ink text-sm uppercase tracking-wider font-extrabold"
          >
            <span>Dive Into The Work</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right Stat Card */}
        <div className="brutal-card bg-white p-4 max-w-sm sm:justify-self-end w-full">
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-display text-4xl text-ink">
              {stats.eventsHosted}+
            </span>
            <span className="text-[11px] font-black uppercase px-2 py-0.5 bg-electric text-ink border border-ink">
              Events & Hackathons
            </span>
          </div>
          <p className="text-xs font-semibold text-ink/80 leading-relaxed">
            Co-organizer of <strong className="text-ink">Build for Bharat 2026</strong> & technical symposiums mentoring 980+ developers.
          </p>
        </div>
      </div>
    </section>
  );
}
