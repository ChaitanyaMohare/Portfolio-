const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth.middleware');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// CREATE event (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, date, role, attendeeCount, description, category, images, featured } = req.body;
    const newEvent = new Event({
      title,
      date,
      role,
      attendeeCount: Number(attendeeCount) || 0,
      description,
      category: category || 'Hackathon',
      images: Array.isArray(images) ? images : [],
      featured: featured !== undefined ? featured : true,
    });
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
});

// UPDATE event (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error: error.message });
  }
});

// DELETE event (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

module.exports = router;
