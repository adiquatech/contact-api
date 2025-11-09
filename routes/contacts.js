// routes/contacts.js
const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contactsdb').find({}).toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contact = await db.collection('contactsdb').findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID or server error' });
  }
});

// POST - Create a new contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = getDb();
    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contactsdb').insertOne(newContact);
    res.status(201).json({ _id: result.insertedId, ...newContact });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// PUT - Update existing contact
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = getDb();

    const result = await db
      .collection('contactsdb')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { firstName, lastName, email, favoriteColor, birthday } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// DELETE - Remove contact
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection('contactsdb').deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});
module.exports = router;
