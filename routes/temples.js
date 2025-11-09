/* eslint-disable prettier/prettier */
// routes/temple.js
const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const API_KEY =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// GET all temples
router.get('/', async (req, res) => {
  if (req.header('apiKey') !== API_KEY) {
    return res.send('Invalid apiKey');
  }
  try {
    const db = getDb();
    const temples = await db.collection('temples').find({}).toArray();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch temples' });
  }
});

// GET one temple
router.get('/:id', async (req, res) => {
  if (req.header('apiKey') !== API_KEY) {
    return res.send('Invalid apiKey');
  }
  try {
    const db = getDb();
    const temple = await db.collection('temples').findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!temple) return res.status(404).json({ error: 'Not found' });
    res.json(temple);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
