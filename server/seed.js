const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Event = require('./models/Event');
const Achievement = require('./models/Achievement');
const Experience = require('./models/Experience');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chaitanya_portfolio';

const initialExperiences = [
  {
    role: 'Co-Founder & Lead Architect',
    company: 'Pravesh Mitra',
    duration: '2024 - Present',
    description:
      'Engineered and scaled an enterprise-grade full-stack digital admission & student ecosystem platform currently serving 1,200+ active university users. Architected modular REST APIs, role-based access control, real-time analytics, and optimized MongoDB query pipelines.',
    skills: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'System Architecture', 'Cloud Architecture'],
    order: 1,
    type: 'experience',
    liveUrl: 'https://praveshmitra.in',
    githubUrl: 'https://github.com/Chaitanyamohare',
    featured: true,
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'OceanSphere Datacore',
    duration: '2024',
    description:
      'Engineered and shipped client-facing web applications with responsive design systems, automated CI/CD workflows, state management optimizations, and high-throughput data processing endpoints.',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'PostgreSQL', 'Docker'],
    order: 2,
    type: 'experience',
    liveUrl: '',
    githubUrl: 'https://github.com/Chaitanyamohare',
    featured: true,
  },
  {
    role: 'Software Developer',
    company: 'HustlerXero',
    duration: '2023 - 2024',
    description:
      'Spearheaded development of a comprehensive Learning Management System (LMS) for an emerging edtech platform. Integrated video streaming pipelines, interactive quizzes, automated course progress tracking, and secure payment workflows.',
    skills: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT Auth', 'AWS S3'],
    order: 3,
    type: 'experience',
    liveUrl: '',
    githubUrl: 'https://github.com/Chaitanyamohare',
    featured: true,
  },
];

const initialProjects = [
  {
    role: 'Architect & Lead Developer',
    company: 'Rivoox Platform',
    duration: '2024 - 2025',
    description:
      'Robust backend platform architecture and digital workflow tool deployed to 2,000+ university students. Built with high-concurrency microservices, caching layers, and automated verification workflows.',
    skills: ['Node.js', 'TypeScript', 'Express', 'Redis', 'MongoDB', 'Next.js'],
    order: 1,
    type: 'project',
    liveUrl: 'https://rivoox.vercel.app',
    githubUrl: 'https://github.com/Chaitanyamohare/rivoox',
    featured: true,
  },
  {
    role: 'Creator & Algorithm Engineer',
    company: 'Automated NEP 2020 Timetable Engine',
    duration: '2025',
    description:
      'Engineered an intelligent academic schedule generator adhering strictly to the National Education Policy (NEP 2020). Utilizes Genetic Algorithms and Constraint Satisfaction Problems (CSP) in Python and FastAPI to eliminate multi-department scheduling bottlenecks in seconds.',
    skills: ['Python', 'FastAPI', 'Genetic Algorithms', 'Constraint Satisfaction', 'NumPy', 'React'],
    order: 2,
    type: 'project',
    liveUrl: 'https://nep-timetable-engine.demo',
    githubUrl: 'https://github.com/Chaitanyamohare/nep-timetable-engine',
    featured: true,
  },
  {
    role: 'Hardware & Systems Designer',
    company: 'Hardware & Embedded Systems Suite',
    duration: '2024 - 2026',
    description:
      'Engineered custom PCB layouts in KiCad, an automated IR sensor fire detection and warning system using 8051/8085 microcontrollers, and an intelligent solar-powered battery management circuit with real-time telemetry.',
    skills: ['KiCad', '8051 / 8085 Microcontrollers', 'Embedded C', 'PCB Design', 'IoT Sensors', 'Hardware Prototyping'],
    order: 3,
    type: 'project',
    liveUrl: '',
    githubUrl: 'https://github.com/Chaitanyamohare/embedded-systems-suite',
    featured: true,
  },
];

const initialEvents = [
  {
    title: 'Build for Bharat 2026',
    date: 'April 2026',
    role: 'Co-Organizer',
    attendeeCount: 350,
    description:
      'Co-organized a high-stakes 12-hour national-level hackathon at MIT, Chhatrapati Sambhaginagar. Curated problem statements across AI, FinTech, and IoT, managed logistics, judging rubrics, and facilitated 70+ participating teams from across India.',
    category: 'National Hackathon',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
  },
  {
    title: 'Campus Tech Symposium 2025',
    date: 'October 2025',
    role: 'Lead Tech Organizer',
    attendeeCount: 450,
    description:
      'Orchestrated a massive regional technical symposium featuring competitive programming contests, tech speaker keynotes, and project expos at MIT Chhatrapati Sambhaginagar.',
    category: 'Technical Symposium',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
  },
  {
    title: 'Embedded IoT & Microcontroller Bootcamp',
    date: 'January 2025',
    role: 'Lead Instructor & Organizer',
    attendeeCount: 180,
    description:
      'Delivered hands-on hardware prototyping workshops covering KiCad PCB design, microcontrollers (8051 & ESP32), sensor interfacing, and building end-to-end IoT sensor networks.',
    category: 'Workshop & Bootcamp',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
  },
];

const initialAchievements = [
  {
    title: 'Academic Excellence (CGPA: 8.15 / 10)',
    organization: 'MIT, Chhatrapati Sambhaginagar',
    date: '2022 - 2026',
    description:
      'Distinguished academic record in B.Tech Electronics & Computer Engineering, bridging hardware architecture, digital signal analysis, and distributed software systems.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    link: 'https://mit.asia',
  },
  {
    title: 'Co-Founder Leadership Milestone: 1,200+ Active Users',
    organization: 'Pravesh Mitra Platform',
    date: '2024',
    description:
      'Built, deployed, and scaled the platform to over 1,200 verified users across university departments with high uptime and 99.8% customer satisfaction.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    link: 'https://praveshmitra.in',
  },
  {
    title: 'Finalist & Top Tech Innovator',
    organization: 'National Level Hackathons & Project Expos',
    date: '2025',
    description:
      'Recognized for algorithmic excellence in the NEP 2020 Timetable Optimization Engine and innovative smart hardware fire detection systems.',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    link: '',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Seed Admin
    const adminUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const existingAdmin = await Admin.findOne({ username: adminUsername });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await Admin.create({ username: adminUsername, passwordHash });
      console.log(`Default admin created: ${adminUsername} / ${adminPassword}`);
    } else {
      console.log(`Admin account '${adminUsername}' already exists.`);
    }

    // Seed Experience & Projects
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([...initialExperiences, ...initialProjects]);
      console.log(`Seeded ${initialExperiences.length} experiences and ${initialProjects.length} projects.`);
    } else {
      console.log(`Experience collection already contains ${expCount} items.`);
    }

    // Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(initialEvents);
      console.log(`Seeded ${initialEvents.length} events.`);
    } else {
      console.log(`Events collection already contains ${eventCount} items.`);
    }

    // Seed Achievements
    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      await Achievement.insertMany(initialAchievements);
      console.log(`Seeded ${initialAchievements.length} achievements.`);
    } else {
      console.log(`Achievements collection already contains ${achCount} items.`);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, initialExperiences, initialProjects, initialEvents, initialAchievements };
