'use client';

import { useState, useEffect } from 'react';
import { fetchEvents, getFullImageUrl } from '@/lib/api';
import { Calendar, Users, Award, Sparkles, MapPin, ExternalLink } from 'lucide-react';

export default function EventsGallery() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageModal, setActiveImageModal] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      const data = await fetchEvents();
      setEvents(data || []);
    }
    loadEvents();
  }, []);

  const categories = ['All', 'National Hackathon', 'Technical Symposium', 'Workshop & Bootcamp'];

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((e) => e.category === selectedCategory);

  return (
    <section id="events" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-ink">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-sky border border-ink"></span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tight uppercase">
            EVENTS HOSTED & ORGANIZED
          </h2>
        </div>
        <span className="font-mono text-xs uppercase font-bold text-ink/70">
          [ 03 // COMMUNITY IMPACT ]
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-mono font-bold uppercase text-ink mr-2">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-black uppercase border-2 border-ink transition-all ${
              selectedCategory === cat
                ? 'bg-ink text-white shadow-[3px_3px_0px_#C6F906]'
                : 'bg-white text-ink hover:bg-electric shadow-[2px_2px_0px_#111111]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt, idx) => {
          const coverImg =
            evt.images && evt.images.length > 0
              ? getFullImageUrl(evt.images[0])
              : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80';

          return (
            <div
              key={evt._id || idx}
              className="brutal-card bg-white flex flex-col justify-between overflow-hidden group"
            >
              {/* Event Image Banner with Overlay Badges */}
              <div className="relative h-48 w-full border-b-2 border-ink bg-slate-100 overflow-hidden">
                <img
                  src={coverImg}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Role Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-electric border-2 border-ink text-[11px] font-black uppercase text-ink shadow-[2px_2px_0px_#111111]">
                  {evt.role}
                </div>

                {/* Attendee Count */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white border-2 border-ink text-xs font-black uppercase text-ink shadow-[2px_2px_0px_#111111] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky" />
                  <span>{evt.attendeeCount}+ Attendees</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-ink/75 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ink" />
                      {evt.date}
                    </span>
                    <span className="px-2 py-0.5 bg-[#F8F9FA] border border-ink text-[10px] uppercase">
                      {evt.category}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl text-ink uppercase tracking-tight mb-2 group-hover:text-sky transition-colors">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-ink/80 leading-relaxed mb-4">
                    {evt.description}
                  </p>
                </div>

                {/* Additional photos preview if available */}
                {evt.images && evt.images.length > 1 && (
                  <div className="pt-3 border-t border-ink/10 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-ink/70">
                      Gallery:
                    </span>
                    <div className="flex gap-1.5 overflow-x-auto py-1">
                      {evt.images.map((img, iIdx) => (
                        <img
                          key={iIdx}
                          src={getFullImageUrl(img)}
                          alt="thumb"
                          onClick={() => setActiveImageModal(getFullImageUrl(img))}
                          className="w-8 h-8 rounded border border-ink object-cover cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Image Lightbox Modal */}
      {activeImageModal && (
        <div
          onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] bg-white border-3 border-ink shadow-[8px_8px_0px_#111111] p-2">
            <img
              src={activeImageModal}
              alt="Expanded view"
              className="max-h-[80vh] w-auto object-contain border border-ink"
            />
          </div>
        </div>
      )}
    </section>
  );
}
