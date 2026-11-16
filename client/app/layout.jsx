import './globals.css';
import { Anton, Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Chaitanya Mohare | Full-Stack Developer & Systems Architect',
  description:
    'Interactive 3D Portfolio of Chaitanya Mohare - Systems Architect, Co-Founder at Pravesh Mitra, B.Tech ECE at MIT Chhatrapati Sambhaginagar.',
  keywords: [
    'Chaitanya Mohare',
    'Full Stack Developer',
    'Systems Architect',
    'Pravesh Mitra',
    'Next.js',
    'Three.js',
    'React Three Fiber',
    'Embedded Systems',
    'Build for Bharat',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${instrumentSerif.variable} ${plusJakarta.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen antialiased selection:bg-electric selection:text-ink">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
