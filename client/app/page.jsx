import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EventsGallery from '@/components/sections/EventsGallery';
import AchievementsSection from '@/components/sections/AchievementsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactFooter from '@/components/sections/ContactFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col selection:bg-electric selection:text-ink">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EventsGallery />
      <AchievementsSection />
      <CertificationsSection />
      <ContactFooter />
    </main>
  );
}
