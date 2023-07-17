const express = require('express');
const router = express.Router();
const Subtask = require('../models/subtask.model');

router.post('/create', async (req, res) => {
  const subtask = new Subtask(req.body);
  try {
    const newSubtask = await subtask.save();
    res.status(201).json(newSubtask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/update/:id', getSubtask, async (req, res) => {
  if (req.body.title != null) {
    res.subtask.title = req.body.title;
  }
  if (req.body.isCompleted != null) {
    res.subtask.isCompleted = req.body.isCompleted;
  }
  try {
    const updatedSubtask = await res.subtask.save();
    res.json(updatedSubtask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/delete/:id', getSubtask, async (req, res) => {
  try {
    await res.subtask.remove();
    res.json({ message: 'Subtask deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubtask(req, res, next) {
  try {
    const subtask = await Subtask.findById(req.params.id);
    if (subtask == null) {
      return res.status(404).json({ message: 'Subtask not found' });
    }
    res.subtask = subtask;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;