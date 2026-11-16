const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const authMiddleware = require('../middleware/auth.middleware');

// GET all experiences/projects (optional query ?type=experience or ?type=project)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const items = await Experience.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience items', error: error.message });
  }
});

// GET single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Experience.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
});

// CREATE experience/project (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { role, company, duration, description, skills, order, type, liveUrl, githubUrl, featured } = req.body;
    const newItem = new Experience({
      role,
      company,
      duration,
      description,
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s) => s.trim()) : []),
      order: Number(order) || 0,
      type: type || 'experience',
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      featured: featured !== undefined ? featured : true,
    });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
});

// UPDATE experience/project (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (typeof payload.skills === 'string') {
      payload.skills = payload.skills.split(',').map((s) => s.trim());
    }
    const updated = await Experience.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
});

// DELETE experience/project (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

module.exports = router;
