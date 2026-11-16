'use client';

import { Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, Cpu, Code2, Cloud, Database, Box } from 'lucide-react';

export default function CertificationsSection() {
  const certifications = [
    {
      id: 'cert-1',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: '2025',
      credentialId: 'AWS-CP-892147',
      description:
        'Validation of core cloud infrastructure, distributed systems architecture, IAM security compliance, high-availability deployments, and cost optimization on AWS.',
      skills: ['AWS S3', 'EC2', 'IAM', 'Lambda', 'Cloud Architecture'],
      category: 'Cloud & DevOps',
      badgeColor: 'bg-electric',
      icon: Cloud,
      verifyUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      title: 'Meta Full-Stack Developer Professional Certificate',
      issuer: 'Meta',
      date: '2024 - 2025',
      credentialId: 'META-FS-94218',
      description:
        'Comprehensive software engineering program covering React, Node.js, Express, relational & NoSQL databases, RESTful APIs, version control, and production deployment workflows.',
      skills: ['React.js', 'Node.js', 'Express', 'REST APIs', 'System Design'],
      category: 'Software Engineering',
      badgeColor: 'bg-sky text-white',
      icon: Code2,
      verifyUrl: 'https://coursera.org/verify/meta',
    },
    {
      id: 'cert-3',
      title: 'Python & Algorithmic Problem Solving',
      issuer: 'HackerRank (Gold Badge)',
      date: '2024',
      credentialId: 'HR-PY-10928',
      description:
        'Advanced problem solving, genetic algorithms, constraint satisfaction techniques, data structures, and computational optimization in Python 3.',
      skills: ['Python 3', 'Genetic Algorithms', 'Data Structures', 'Constraint Satisfaction'],
      category: 'Algorithms & AI',
      badgeColor: 'bg-pastelPink',
      icon: CheckCircle2,
      verifyUrl: 'https://hackerrank.com/certificates',
    },
    {
      id: 'cert-4',
      title: 'Microprocessors & Embedded Systems Architecture',
      issuer: 'NPTEL / IIT Kharagpur',
      date: '2024',
      credentialId: 'NPTEL24CS89',
      description:
        'Rigorous curriculum covering 8051 & 8085 microcontroller architecture, assembly programming, peripheral interfacing, timer interrupts, and embedded system design.',
      skills: ['8051 / 8085', 'Embedded C', 'Assembly', 'Hardware Interfacing', 'PCB Design'],
      category: 'Hardware & Embedded',
      badgeColor: 'bg-moss text-white',
      icon: Cpu,
      verifyUrl: 'https://nptel.ac.in',
    },
    {
      id: 'cert-5',
      title: 'MongoDB Certified Developer Associate',
      issuer: 'MongoDB University',
      date: '2025',
      credentialId: 'MDB-DEV-33019',
      description:
        'Production data modeling, complex aggregation pipelines, indexing performance strategies, schema validation, and high-concurrency database scalability.',
      skills: ['MongoDB', 'Aggregation Pipelines', 'Mongoose', 'Schema Design', 'NoSQL'],
      category: 'Database Engineering',
      badgeColor: 'bg-electric',
      icon: Database,
      verifyUrl: 'https://learn.mongodb.com',
    },
    {
      id: 'cert-6',
      title: 'Docker & Containerization for Modern DevOps',
      issuer: 'Linux Foundation / CNCF',
      date: '2025',
      credentialId: 'CNCF-DKR-7821',
      description:
        'Production containerization workflows, multi-stage Docker builds, docker-compose orchestration, container security, and CI/CD automated pipeline integrations.',
      skills: ['Docker', 'Docker Compose', 'Microservices', 'Linux', 'CI/CD'],
      category: 'Cloud & DevOps',
      badgeColor: 'bg-sky text-white',
      icon: Box,
      verifyUrl: 'https://linuxfoundation.org',
    },
  ];

  return (
    <section id="certifications" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10 pb-4 border-b-2 border-ink">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-electric border border-ink"></span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tight uppercase">
            CERTIFICATIONS & LICENSES
          </h2>
        </div>
        <span className="font-mono text-xs uppercase font-bold text-ink/70">
          [ 05 // VERIFIED CREDENTIALS ]
        </span>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => {
          const IconComponent = cert.icon;
          return (
            <div
              key={cert.id}
              className="brutal-card bg-white p-6 flex flex-col justify-between group hover:border-ink transition-all"
            >
              <div>
                {/* Header: Issuer & Category */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[#F8F9FA] border-2 border-ink flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4 text-ink" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-ink/60 block">
                        {cert.issuer}
                      </span>
                      <span className="font-mono text-xs font-black text-ink">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 border border-ink text-[10px] font-black uppercase rounded-full shadow-[1px_1px_0px_#111111] ${cert.badgeColor}`}
                  >
                    {cert.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-ink uppercase tracking-tight mb-2 group-hover:text-sky transition-colors">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-ink/80 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-[#F8F9FA] border border-ink text-[10px] font-bold text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Credential ID & Verify Link */}
              <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-ink/60 font-bold">
                  ID: {cert.credentialId}
                </span>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-ink hover:text-sky underline underline-offset-2"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
