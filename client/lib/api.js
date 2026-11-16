import {
  fallbackExperiences,
  fallbackProjects,
  fallbackEvents,
  fallbackAchievements,
  fallbackStats,
} from './fallbackData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const SERVER_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export function getFullImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it's a relative uploads path
  return `${SERVER_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('portfolio_admin_token');
}

export function setAuthToken(token) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('portfolio_admin_token', token);
  } else {
    localStorage.removeItem('portfolio_admin_token');
  }
}

// Stats
export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (err) {
    console.warn('Using fallback stats:', err.message);
    return fallbackStats;
  }
}

// Events
export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch events');
    const data = await res.json();
    return data.length > 0 ? data : fallbackEvents;
  } catch (err) {
    console.warn('Using fallback events:', err.message);
    return fallbackEvents;
  }
}

export async function createEvent(eventData) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create event');
  }
  return await res.json();
}

export async function updateEvent(id, eventData) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update event');
  }
  return await res.json();
}

export async function deleteEvent(id) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete event');
  }
  return await res.json();
}

// Achievements
export async function fetchAchievements() {
  try {
    const res = await fetch(`${API_BASE}/achievements`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch achievements');
    const data = await res.json();
    return data.length > 0 ? data : fallbackAchievements;
  } catch (err) {
    console.warn('Using fallback achievements:', err.message);
    return fallbackAchievements;
  }
}

export async function createAchievement(achData) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/achievements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(achData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create achievement');
  }
  return await res.json();
}

export async function updateAchievement(id, achData) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/achievements/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(achData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update achievement');
  }
  return await res.json();
}

export async function deleteAchievement(id) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/achievements/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete achievement');
  }
  return await res.json();
}

// Experience & Projects
export async function fetchExperiences(type) {
  try {
    const url = type ? `${API_BASE}/experience?type=${type}` : `${API_BASE}/experience`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch experiences');
    const data = await res.json();
    if (data.length > 0) return data;
    if (type === 'project') return fallbackProjects;
    if (type === 'experience') return fallbackExperiences;
    return [...fallbackExperiences, ...fallbackProjects];
  } catch (err) {
    console.warn('Using fallback experiences/projects:', err.message);
    if (type === 'project') return fallbackProjects;
    if (type === 'experience') return fallbackExperiences;
    return [...fallbackExperiences, ...fallbackProjects];
  }
}

export async function createExperience(itemData) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/experience`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create experience/project');
  }
  return await res.json();
}

export async function updateExperience(id, itemData) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/experience/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update experience/project');
  }
  return await res.json();
}

export async function deleteExperience(id) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/experience/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete experience/project');
  }
  return await res.json();
}

// File Upload
export async function uploadImage(file) {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Image upload failed');
  }
  return await res.json();
}

// Auth Login & Verification
export async function loginAdmin(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Invalid credentials');
  }

  const data = await res.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export async function verifyAdminSession() {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      setAuthToken(null);
      return null;
    }
    return await res.json();
  } catch (err) {
    return null;
  }
}
