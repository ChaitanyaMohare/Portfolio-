'use client';

import { ArrowUpRight, Code, Laptop, Sparkles, Award, Cpu } from 'lucide-react';

export default function AboutSection() {
  const techStack = [
    { name: 'Next.js / React', cat: 'Frontend' },
    { name: 'Node.js / Express', cat: 'Backend' },
    { name: 'MongoDB / Mongoose', cat: 'Database' },
    { name: 'Python & FastAPI', cat: 'AI & Algorithmic' },
    { name: 'Genetic Algorithms / CSP', cat: 'Algorithms' },
    { name: 'KiCad & PCB Design', cat: 'Hardware' },
    { name: '8051 / 8085 / ESP32', cat: 'Embedded' },
    { name: 'Tailwind CSS', cat: 'Styling' },
    { name: 'Docker & Microservices', cat: 'DevOps' },
    { name: 'Three.js / WebGL', cat: 'Creative Dev' },
  ];

  return (
    <section id="about" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-ink">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-electric border border-ink"></span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tight uppercase">
            ABOUT / PROFILE
          </h2>
        </div>
        <span className="font-mono text-xs uppercase font-bold text-ink/70">
          [ 01 // OVERVIEW ]
        </span>
      </div>

      {/* Split Color-Block Layout */}
      <div className="border-2 border-ink shadow-[6px_6px_0px_#111111] overflow-hidden bg-white">
        
        {/* Top Split Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* LEFT COLUMN: Sky Blue (#0088FF) with 3D/Tilted Showcase */}
          <div className="lg:col-span-5 bg-sky p-8 sm:p-10 flex flex-col justify-between relative border-b-2 lg:border-b-0 lg:border-r-2 border-ink overflow-hidden">
            {/* Background geometric accents */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-4 border-ink/20 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 text-white/20 font-display text-8xl pointer-events-none select-none">
              CM
            </div>

            {/* Top Floating Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-white text-ink text-xs font-black uppercase border-2 border-ink shadow-[2px_2px_0px_#111111]">
                FOUNDER & ENGINEER
              </span>
              <span className="text-white text-xs font-mono font-bold">
                MIT 2022-2026
              </span>
            </div>

            {/* Angled 3D/Tilted Profile Card */}
            <div className="relative z-10 my-8 flex justify-center">
              <div className="relative transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-full max-w-xs bg-white border-3 border-ink shadow-[6px_6px_0px_#111111] p-5">
                {/* Card Header bar */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-ink mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400 border border-ink"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 border border-ink"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 border border-ink"></span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-ink uppercase">
                    chaitanya_dev.sys
                  </span>
                </div>

                {/* Profile Portrait / Tech Illustration */}
                <div className="w-full h-44 bg-[#F8F9FA] border-2 border-ink relative overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-electric border-2 border-ink flex items-center justify-center font-display text-3xl text-ink shadow-[3px_3px_0px_#111111] mb-2">
                    CM
                  </div>
                  <h4 className="font-display text-lg text-ink uppercase tracking-wide">
                    Chaitanya Mohare
                  </h4>
                  <p className="text-[11px] font-bold text-ink/70">
                    B.Tech ECE &bull; CGPA 8.15 / 10
                  </p>
                </div>

                {/* Floating Bobbing Badges around card */}
                <div className="absolute -top-3 -right-4 px-3 py-1 bg-electric border-2 border-ink rounded-full text-[10px] font-black uppercase text-ink shadow-[2px_2px_0px_#111111] animate-bob">
                  Full-Stack Dev ↖
                </div>
                <div className="absolute -bottom-4 -left-3 px-3 py-1 bg-pastelPink border-2 border-ink rounded-full text-[10px] font-black uppercase text-ink shadow-[2px_2px_0px_#111111] animate-bob">
                  Embedded IoT ↖
                </div>
              </div>
            </div>

            {/* Left Column Bottom Quick Stat */}
            <div className="relative z-10 bg-white/95 border-2 border-ink p-3 shadow-[3px_3px_0px_#111111]">
              <div className="flex items-center gap-2 text-ink text-xs font-bold uppercase">
                <Laptop className="w-4 h-4 text-sky" />
                <span>Co-Founder at Pravesh Mitra</span>
              </div>
              <p className="text-[11px] text-ink/80 mt-1">
                Active platform architecture serving 1,200+ students and admission workflows.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Electric Lime (#C6F906) with Giant Stacked Typography */}
          <div className="lg:col-span-7 bg-electric p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-white text-xs font-black uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-electric" />
                <span>ARCHITECTURAL PHILOSOPHY</span>
              </div>

              {/* Giant Stacked Condensed Display Typography */}
              <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9] text-ink uppercase tracking-tight">
                ENGINEERING AT THE INTERSECTION OF CODE & SILICON.
              </h3>

              {/* Editorial Serif Subtitle */}
              <p className="font-serif italic text-2xl sm:text-3xl text-ink/90 mt-6 leading-snug">
                &ldquo;Great software shouldn&apos;t just render pixels—it must coordinate data pipelines, optimize constraints, and talk seamlessly to real-world embedded hardware.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-ink grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="font-display text-3xl text-ink">8.15</div>
                <div className="text-xs font-bold uppercase text-ink/80">CGPA / 10</div>
              </div>
              <div>
                <div className="font-display text-3xl text-ink">1,200+</div>
                <div className="text-xs font-bold uppercase text-ink/80">Active Platform Users</div>
              </div>
              <div>
                <div className="font-display text-3xl text-ink">12+</div>
                <div className="text-xs font-bold uppercase text-ink/80">Hackathons & Bootcamps</div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: Soft Pastel Pink (#FFB8F6) with Bio & Core Tech Stack Pills */}
        <div className="bg-pastelPink p-6 sm:p-8 border-t-2 border-ink">
          <div className="max-w-4xl mb-6">
            <h4 className="font-display text-2xl text-ink uppercase tracking-tight mb-2">
              BIOGRAPHY & TECHNICAL FOCUS
            </h4>
            <p className="text-sm sm:text-base font-medium text-ink leading-relaxed">
              I am an Electronics & Computer Engineering student at MIT, Chhatrapati Sambhaginagar, passionate about building reliable full-stack applications and solving algorithmic optimization challenges. Whether architecting high-throughput REST APIs for <strong className="underline">Pravesh Mitra</strong>, generating automated academic schedules with <strong className="underline">Genetic Algorithms</strong> for NEP 2020, or routing custom PCBs in <strong className="underline">KiCad</strong>, I build systems engineered for longevity and performance.
            </p>
          </div>

          {/* Interactive Tech Stack Pills */}
          <div>
            <div className="text-xs font-mono font-bold uppercase text-ink mb-3 tracking-wider">
              Core Technical Arsenal:
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="px-3 py-1.5 bg-white hover:bg-electric transition-colors border-2 border-ink rounded-full text-xs font-black text-ink shadow-[2px_2px_0px_#111111] flex items-center gap-1.5 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
                  <span>{tech.name}</span>
                  <span className="text-[10px] text-ink/60 font-semibold font-mono">
                    ({tech.cat})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
