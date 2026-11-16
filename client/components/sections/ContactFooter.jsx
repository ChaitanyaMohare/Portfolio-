'use client';

import { Mail, Github, Linkedin, MapPin, ArrowUp, Send } from 'lucide-react';

export default function ContactFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-ink text-white border-t-3 border-ink pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Banner / Callout */}
        <div className="bg-electric text-ink border-2 border-white p-8 sm:p-12 shadow-[6px_6px_0px_#ffffff] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="px-3 py-1 bg-ink text-white text-xs font-black uppercase tracking-wider">
                GET IN TOUCH
              </span>
              <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight mt-4 leading-none">
                LET&apos;S ARCHITECT SOMETHING EXCEPTIONAL.
              </h3>
              <p className="font-serif italic text-xl sm:text-2xl mt-4 text-ink/90">
                Available for full-stack engineering roles, systems consulting, and high-impact hardware-software collaborations.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href="mailto:chaitanyamohare@gmail.com"
                className="brutal-btn px-6 py-3.5 bg-ink text-white hover:bg-sky text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email Directly</span>
              </a>
              <a
                href="https://github.com/Chaitanyamohare"
                target="_blank"
                rel="noreferrer"
                className="brutal-btn px-6 py-3.5 bg-white text-ink hover:bg-pastelPink text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/20">
          <div>
            <h4 className="font-display text-xl text-white uppercase mb-3">
              Chaitanya Mohare
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Full-Stack Developer & Systems Architect. Co-Founder at Pravesh Mitra. B.Tech in Electronics & Computer Engineering.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase text-electric mb-3">
              Location & Campus
            </h5>
            <div className="flex items-start gap-2 text-xs text-white/80">
              <MapPin className="w-4 h-4 text-electric shrink-0 mt-0.5" />
              <span>MIT, Chhatrapati Sambhaginagar, Maharashtra, India</span>
            </div>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase text-electric mb-3">
              Direct Channels
            </h5>
            <ul className="space-y-1.5 text-xs text-white/80">
              <li>
                <a
                  href="mailto:chaitanyamohare@gmail.com"
                  className="hover:text-electric transition-colors underline underline-offset-2"
                >
                  chaitanyamohare@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Chaitanyamohare"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-electric transition-colors underline underline-offset-2"
                >
                  github.com/Chaitanyamohare
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/chaitanyamohare"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-electric transition-colors underline underline-offset-2"
                >
                  linkedin.com/in/chaitanyamohare
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <span className="text-[11px] font-mono text-white/60">
              ACADEMIC CGPA: 8.15 / 10
            </span>
            <button
              onClick={scrollToTop}
              className="mt-4 px-4 py-2 bg-white text-ink hover:bg-electric border-2 border-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-[2px_2px_0px_#C6F906]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Chaitanya Mohare. Designed with Next.js, Three.js & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span>Server: Express + MongoDB</span>
            <span>&bull;</span>
            <a href="/admin" className="text-electric hover:underline font-bold">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
