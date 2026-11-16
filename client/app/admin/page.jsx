'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  uploadImage,
  getAuthToken,
  setAuthToken,
  getFullImageUrl,
} from '@/lib/api';
import {
  ShieldCheck,
  LogOut,
  Calendar,
  Award,
  Briefcase,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Upload,
  CheckCircle,
  X,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'achievements' | 'experience'
  const [loading, setLoading] = useState(true);

  // Data states
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Form inputs
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }
    loadAllData();
  }, [router]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [evts, achs, exps] = await Promise.all([
        fetchEvents(),
        fetchAchievements(),
        fetchExperiences(),
      ]);
      setEvents(evts || []);
      setAchievements(achs || []);
      setExperiences(exps || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    router.push('/admin/login');
  };

  // Open Modal for Create or Edit
  const openModal = (item = null) => {
    setEditingItem(item);
    setFormSuccess('');
    setFormError('');

    if (item) {
      setFormData({ ...item });
    } else {
      // Default template per tab
      if (activeTab === 'events') {
        setFormData({
          title: '',
          date: '',
          role: 'Organizer',
          attendeeCount: 100,
          description: '',
          category: 'Hackathon',
          images: [],
        });
      } else if (activeTab === 'achievements') {
        setFormData({
          title: '',
          organization: '',
          date: '',
          description: '',
          imageUrl: '',
          link: '',
        });
      } else if (activeTab === 'experience') {
        setFormData({
          role: '',
          company: '',
          duration: '',
          description: '',
          skills: '',
          type: 'experience',
          liveUrl: '',
          githubUrl: '',
        });
      }
    }
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadImage(file);
      if (activeTab === 'events') {
        const existing = formData.images || [];
        setFormData({ ...formData, images: [...existing, res.url] });
      } else if (activeTab === 'achievements') {
        setFormData({ ...formData, imageUrl: res.url });
      }
      setFormSuccess('Image uploaded successfully!');
    } catch (err) {
      setFormError(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    try {
      if (activeTab === 'events') {
        if (editingItem && editingItem._id) {
          const updated = await updateEvent(editingItem._id, formData);
          setEvents((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
        } else {
          const created = await createEvent(formData);
          setEvents((prev) => [created, ...prev]);
        }
      } else if (activeTab === 'achievements') {
        if (editingItem && editingItem._id) {
          const updated = await updateAchievement(editingItem._id, formData);
          setAchievements((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
        } else {
          const created = await createAchievement(formData);
          setAchievements((prev) => [created, ...prev]);
        }
      } else if (activeTab === 'experience') {
        if (editingItem && editingItem._id) {
          const updated = await updateExperience(editingItem._id, formData);
          setExperiences((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
        } else {
          const created = await createExperience(formData);
          setExperiences((prev) => [created, ...prev]);
        }
      }

      setModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save item');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this item?')) return;

    try {
      if (activeTab === 'events') {
        await deleteEvent(id);
        setEvents((prev) => prev.filter((item) => item._id !== id));
      } else if (activeTab === 'achievements') {
        await deleteAchievement(id);
        setAchievements((prev) => prev.filter((item) => item._id !== id));
      } else if (activeTab === 'experience') {
        await deleteExperience(id);
        setExperiences((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert(err.message || 'Failed to delete item');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-ink pb-20">
      {/* Top Navbar */}
      <header className="bg-ink text-white border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric text-ink border border-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl uppercase tracking-wider">
                CONTROL DASHBOARD
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-electric">
                // Admin Mode
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1 bg-white text-ink hover:bg-electric text-xs font-bold uppercase border-2 border-white flex items-center gap-1.5 transition-colors"
            >
              <span>View Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase border-2 border-white flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-ink">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 border-2 border-ink text-xs font-black uppercase flex items-center gap-2 transition-all ${
                activeTab === 'events'
                  ? 'bg-electric text-ink shadow-[3px_3px_0px_#111111]'
                  : 'bg-white text-ink hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events Hosted ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 border-2 border-ink text-xs font-black uppercase flex items-center gap-2 transition-all ${
                activeTab === 'achievements'
                  ? 'bg-sky text-white shadow-[3px_3px_0px_#111111]'
                  : 'bg-white text-ink hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Achievements ({achievements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 border-2 border-ink text-xs font-black uppercase flex items-center gap-2 transition-all ${
                activeTab === 'experience'
                  ? 'bg-pastelPink text-ink shadow-[3px_3px_0px_#111111]'
                  : 'bg-white text-ink hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience & Projects ({experiences.length})</span>
            </button>
          </div>

          <button
            onClick={() => openModal()}
            className="brutal-btn px-4 py-2 bg-ink text-white hover:bg-electric hover:text-ink text-xs font-black uppercase flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New {activeTab.slice(0, -1)}</span>
          </button>
        </div>

        {/* Tab 1: Events Hosted */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {events.map((evt) => (
              <div
                key={evt._id}
                className="brutal-card bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {evt.images && evt.images.length > 0 ? (
                    <img
                      src={getFullImageUrl(evt.images[0])}
                      alt="Event"
                      className="w-20 h-20 object-cover border-2 border-ink shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-slate-100 border-2 border-ink flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-ink/40" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-electric text-[10px] font-black uppercase border border-ink">
                        {evt.role}
                      </span>
                      <span className="font-mono text-xs text-ink/70">
                        {evt.date} &bull; {evt.attendeeCount} Attendees
                      </span>
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-ink">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-ink/75 max-w-2xl line-clamp-2 mt-1">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openModal(evt)}
                    className="p-2 border-2 border-ink bg-white hover:bg-electric text-ink"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt._id)}
                    className="p-2 border-2 border-ink bg-red-100 hover:bg-red-500 hover:text-white text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map((ach) => (
              <div
                key={ach._id}
                className="brutal-card bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {ach.imageUrl ? (
                    <img
                      src={getFullImageUrl(ach.imageUrl)}
                      alt="Ach"
                      className="w-20 h-20 object-cover border-2 border-ink shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-slate-100 border-2 border-ink flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-ink/40" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-sky text-white text-[10px] font-black uppercase border border-ink">
                        {ach.organization}
                      </span>
                      <span className="font-mono text-xs text-ink/70">{ach.date}</span>
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-ink">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-ink/75 max-w-2xl line-clamp-2 mt-1">
                      {ach.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openModal(ach)}
                    className="p-2 border-2 border-ink bg-white hover:bg-electric text-ink"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ach._id)}
                    className="p-2 border-2 border-ink bg-red-100 hover:bg-red-500 hover:text-white text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Experience & Projects */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="brutal-card bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black uppercase border border-ink ${
                        exp.type === 'project'
                          ? 'bg-electric text-ink'
                          : 'bg-pastelPink text-ink'
                      }`}
                    >
                      {exp.type || 'experience'}
                    </span>
                    <span className="font-mono text-xs text-ink/70">{exp.duration}</span>
                    <span className="text-xs font-bold text-ink">&bull; {exp.company}</span>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-ink">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-ink/75 max-w-2xl line-clamp-2 mt-1">
                    {exp.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openModal(exp)}
                    className="p-2 border-2 border-ink bg-white hover:bg-electric text-ink"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 border-2 border-ink bg-red-100 hover:bg-red-500 hover:text-white text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border-3 border-ink shadow-[8px_8px_0px_#111111] p-6 my-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-ink">
              <h2 className="font-display text-2xl uppercase text-ink">
                {editingItem ? 'Edit' : 'Create New'} {activeTab.slice(0, -1)}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-slate-100 border border-ink"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-2.5 bg-red-100 border border-red-500 text-xs font-bold text-red-800">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-4 p-2.5 bg-green-100 border border-green-500 text-xs font-bold text-green-800">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* Form fields based on tab */}
              {activeTab === 'events' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Date (e.g. April 2026)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.date || ''}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Attendees Count
                      </label>
                      <input
                        type="number"
                        value={formData.attendeeCount || 0}
                        onChange={(e) =>
                          setFormData({ ...formData, attendeeCount: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category || 'National Hackathon'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      Event Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-ink"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      Upload Event Photo
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="text-xs file:mr-3 file:py-1.5 file:px-3 file:border-2 file:border-ink file:bg-electric file:font-bold file:text-xs"
                      />
                      {uploadingImage && (
                        <span className="text-xs font-bold text-sky animate-pulse">
                          Uploading...
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'achievements' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Achievement Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, organization: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Date / Year
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.date || ''}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Verification Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.link || ''}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-ink"
                    />
                  </div>

                  {/* Certificate Upload */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      Upload Certificate / Photo
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="text-xs file:mr-3 file:py-1.5 file:px-3 file:border-2 file:border-ink file:bg-sky file:text-white file:font-bold file:text-xs"
                      />
                      {uploadingImage && (
                        <span className="text-xs font-bold text-sky animate-pulse">
                          Uploading...
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Role Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Company or Project Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Duration (e.g. 2024 - Present)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Entry Type
                      </label>
                      <select
                        value={formData.type || 'experience'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink bg-white uppercase font-bold"
                      >
                        <option value="experience">Work Experience</option>
                        <option value="project">Featured Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      Skills (Comma separated, e.g. React, Node.js, MongoDB)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(formData.skills)
                          ? formData.skills.join(', ')
                          : formData.skills || ''
                      }
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-ink"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        Live Platform URL
                      </label>
                      <input
                        type="url"
                        value={formData.liveUrl || ''}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl || ''}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs border-2 border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-ink"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t-2 border-ink flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border-2 border-ink text-xs font-bold uppercase bg-white hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="brutal-btn px-5 py-2 bg-electric text-ink text-xs font-black uppercase tracking-wider"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
