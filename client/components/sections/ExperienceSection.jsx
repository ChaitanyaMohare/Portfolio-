'use client';

import { useState, useEffect } from 'react';
import { fetchExperiences } from '@/lib/api';
import { Briefcase, FolderGit2, ExternalLink, Github, Sparkles, Layers, Cpu } from 'lucide-react';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [expData, projData] = await Promise.all([
          fetchExperiences('experience'),
          fetchExperiences('project'),
        ]);
        setExperiences(expData || []);
        setProjects(projData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="experience" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12 pb-4 border-b-2 border-ink">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-moss border border-ink"></span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tight uppercase">
            EXPERIENCE & PROJECTS
          </h2>
        </div>
        <span className="font-mono text-xs uppercase font-bold text-ink/70">
          [ 02 // TRAJECTORY ]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: Vertical Interactive Timeline (Experience) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-ink" />
            <h3 className="font-display text-2xl uppercase text-ink">
              Professional Trajectory
            </h3>
          </div>

          <div className="relative border-l-3 border-ink ml-3 sm:ml-4 pl-6 sm:pl-8 flex flex-col gap-8">
            {experiences.map((exp, idx) => (
              <div key={exp._id || idx} className="relative group">
                {/* Timeline Node Icon */}
                <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-electric border-2 border-ink flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#111111] group-hover:scale-110 transition-transform">
                  {idx + 1}
                </span>

                {/* Experience Card */}
                <div className="brutal-card bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                    <span className="font-mono text-[11px] font-black uppercase text-moss">
                      {exp.duration}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F8F9FA] border border-ink rounded-full">
                      {exp.company}
                    </span>
                  </div>

                  <h4 className="font-display text-xl text-ink uppercase tracking-tight">
                    {exp.role}
                  </h4>

                  <p className="text-xs text-ink/80 mt-2 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Skills tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-ink/10">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-[#F8F9FA] border border-ink text-[10px] font-bold text-ink"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  {(exp.liveUrl || exp.githubUrl) && (
                    <div className="flex gap-3 mt-3 pt-2">
                      {exp.liveUrl && (
                        <a
                          href={exp.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-sky underline underline-offset-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Platform</span>
                        </a>
                      )}
                      {exp.githubUrl && (
                        <a
                          href={exp.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-sky underline underline-offset-2"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Codebase</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Bento-Grid Featured Projects */}
        <div id="projects" className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-ink" />
              <h3 className="font-display text-2xl uppercase text-ink">
                Featured Engineering Systems
              </h3>
            </div>
            <span className="text-xs font-bold uppercase px-2 py-0.5 bg-electric border border-ink">
              Bento Showcase
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((proj, idx) => {
              // Bento layout variance: first project is full-width
              const isFirst = idx === 0;
              return (
                <div
                  key={proj._id || idx}
                  className={`brutal-card p-6 flex flex-col justify-between ${
                    isFirst
                      ? 'md:col-span-2 bg-gradient-to-br from-white to-[#F8F9FA] border-3'
                      : idx % 2 === 1
                      ? 'bg-sky/10'
                      : 'bg-moss/10'
                  }`}
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-black uppercase tracking-wider text-ink/75">
                        {proj.duration}
                      </span>
                      <span className="px-2.5 py-0.5 bg-white border border-ink rounded-full text-[10px] font-black uppercase text-ink shadow-[1px_1px_0px_#111111]">
                        {proj.role}
                      </span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-tight mb-2">
                      {proj.company}
                    </h4>

                    <p className="text-xs sm:text-sm text-ink/80 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.skills &&
                        proj.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-white border border-ink text-[11px] font-bold text-ink shadow-[1px_1px_0px_#111111]"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-3 border-t-2 border-ink">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="brutal-btn px-3 py-1.5 bg-electric text-ink text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                        >
                          <span>Live System</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="brutal-btn px-3 py-1.5 bg-white text-ink text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
