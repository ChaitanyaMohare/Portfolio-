const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chaitanya_portfolio';

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');
const achievementRoutes = require('./routes/achievements.routes');
const experienceRoutes = require('./routes/experience.routes');
const statsRoutes = require('./routes/stats.routes');
const uploadRoutes = require('./routes/upload.routes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Chaitanya Mohare Portfolio API',
    mongoConnection: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Auto-seed helper
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const { initialExperiences, initialProjects, initialEvents, initialAchievements } = require('./seed');
const Experience = require('./models/Experience');
const Event = require('./models/Event');
const Achievement = require('./models/Achievement');

async function autoSeedIfEmpty() {
  try {
    const adminUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const admin = await Admin.findOne({ username: adminUsername });
    if (!admin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await Admin.create({ username: adminUsername, passwordHash });
      console.log(`[AutoSeed] Default admin created: ${adminUsername} / ${adminPassword}`);
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([...initialExperiences, ...initialProjects]);
      console.log(`[AutoSeed] Seeded experiences and projects.`);
    }

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(initialEvents);
      console.log(`[AutoSeed] Seeded events.`);
    }

    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      await Achievement.insertMany(initialAchievements);
      console.log(`[AutoSeed] Seeded achievements.`);
    }
  } catch (err) {
    console.warn('[AutoSeed] Notice:', err.message);
  }
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log(`MongoDB Connected successfully to ${MONGODB_URI}`);
    await autoSeedIfEmpty();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Starting server in fallback mode without MongoDB persistent store...');
    app.listen(PORT, () => {
      console.log(`Server running in fallback mode on http://localhost:${PORT}`);
    });
  });
