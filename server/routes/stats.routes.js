const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Achievement = require('../models/Achievement');
const Experience = require('../models/Experience');

// GET aggregate stats for the Hero section counters
router.get('/', async (req, res) => {
  try {
    const [eventsCount, achievementsCount, experiencesCount, projectsCount] = await Promise.all([
      Event.countDocuments(),
      Achievement.countDocuments(),
      Experience.countDocuments({ type: 'experience' }),
      Experience.countDocuments({ type: 'project' }),
    ]);

    // Aggregate total attendees from all events
    const attendeeAggregation = await Event.aggregate([
      { $group: { _id: null, totalAttendees: { $sum: '$attendeeCount' } } },
    ]);
    const totalAttendees = attendeeAggregation.length > 0 ? attendeeAggregation[0].totalAttendees : 1200;

    res.json({
      eventsHosted: eventsCount,
      projectsBuilt: projectsCount,
      experiences: experiencesCount,
      achievements: achievementsCount,
      totalAttendees: totalAttendees,
      activeUsers: 1200, // Pravesh Mitra & ecosystem users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;
