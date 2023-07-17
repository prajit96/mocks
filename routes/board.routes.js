const express = require('express');
const router = express.Router();
const Board = require('../models/board.model');

router.post('/create', async (req, res) => {
    const board = new Board({ name: req.body.name });
    try {
      const newBoard = await board.save();
      res.status(201).json(newBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().populate('tasks');
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;