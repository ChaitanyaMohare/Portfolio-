'use client';

import { useState, useEffect } from 'react';
import { fetchAchievements, getFullImageUrl } from '@/lib/api';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function loadAchievements() {
      const data = await fetchAchievements();
      setAchievements(data || []);
    }
    loadAchievements();
  }, []);

  return (
    <section id="achievements" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-4 border-b-2 border-ink">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-pastelPink border border-ink"></span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tight uppercase">
            ACHIEVEMENTS & MILESTONES
          </h2>
        </div>
        <span className="font-mono text-xs uppercase font-bold text-ink/70">
          [ 04 // RECOGNITIONS ]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item, idx) => {
          const img =
            item.imageUrl ||
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';

          return (
            <div
              key={item._id || idx}
              className="brutal-card bg-white flex flex-col justify-between overflow-hidden"
            >
              {/* Image banner */}
              <div className="relative h-44 w-full border-b-2 border-ink overflow-hidden bg-slate-50">
                <img
                  src={getFullImageUrl(img)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-white border border-ink text-[11px] font-mono font-bold text-ink shadow-[2px_2px_0px_#111111]">
                  {item.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-moss uppercase tracking-wider mb-2">
                    <Award className="w-4 h-4 text-ink" />
                    <span>{item.organization}</span>
                  </div>

                  <h4 className="font-display text-xl text-ink uppercase tracking-tight mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-ink/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.link && (
                  <div className="pt-3 border-t border-ink/10">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-sky underline underline-offset-2"
                    >
                      <span>Verify Credential / Organization</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
