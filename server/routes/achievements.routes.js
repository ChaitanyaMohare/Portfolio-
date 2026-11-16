const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const authMiddleware = require('../middleware/auth.middleware');

// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

// GET single achievement
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievement', error: error.message });
  }
});

// CREATE achievement (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, organization, date, description, imageUrl, link } = req.body;
    const newAchievement = new Achievement({
      title,
      organization,
      date,
      description,
      imageUrl: imageUrl || '',
      link: link || '',
    });
    const saved = await newAchievement.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating achievement', error: error.message });
  }
});

// UPDATE achievement (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Achievement not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating achievement', error: error.message });
  }
});

// DELETE achievement (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Achievement not found' });
    res.json({ message: 'Achievement deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting achievement', error: error.message });
  }
});

module.exports = router;
