'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Events', href: '#events' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Certifications', href: '#certifications' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9FA]/90 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand (Never wraps, never squishes) */}
        <Link href="#hero" className="flex items-center gap-2.5 shrink-0 group">
          <span className="font-display text-xl sm:text-2xl tracking-tight text-ink uppercase whitespace-nowrap group-hover:text-sky transition-colors">
            CHAITANYA MOHARE
          </span>
          <span className="shrink-0 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black bg-electric border border-ink rounded-full uppercase tracking-wider whitespace-nowrap shadow-[1px_1px_0px_#111111]">
            SDE
          </span>
        </Link>

        {/* Desktop Nav Links (Clean, non-overlapping spacing on large screens) */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs 2xl:text-sm font-bold uppercase tracking-wider text-ink/80 hover:text-ink hover:underline decoration-2 underline-offset-4 transition-all whitespace-nowrap py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action & Status */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-ink rounded-full text-xs font-bold whitespace-nowrap shadow-[1px_1px_0px_#111111]">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-500 border border-ink"></span>
            <span className="text-ink">AVAILABLE FOR PROJECTS</span>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1 bg-ink text-white hover:bg-electric hover:text-ink border-2 border-ink text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] whitespace-nowrap"
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile & Tablet menu button (Graceful fallback on smaller screens) */}
        <div className="flex xl:hidden items-center gap-2 shrink-0">
          <Link
            href="/admin"
            className="p-1.5 bg-ink text-white border-2 border-ink text-xs font-bold shadow-[1px_1px_0px_#111111]"
            title="Admin"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 border-2 border-ink bg-white text-ink hover:bg-electric shadow-[2px_2px_0px_#111111] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet dropdown menu */}
      {mobileOpen && (
        <div className="xl:hidden border-b-2 border-ink bg-[#F8F9FA] px-4 sm:px-6 pt-3 pb-6 flex flex-col gap-2.5 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-bold uppercase tracking-wide py-2 border-b border-ink/10 flex items-center justify-between text-ink hover:text-sky transition-colors"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-4 h-4 text-ink/60" />
            </Link>
          ))}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-ink rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-lime-500 border border-ink"></span>
              <span className="text-ink">AVAILABLE FOR PROJECTS</span>
            </div>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-1.5 bg-electric text-ink border-2 border-ink text-xs font-black uppercase shadow-[2px_2px_0px_#111111]"
            >
              Admin Dashboard ⚡
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
