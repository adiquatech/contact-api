// routes/contacts.js
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// ROUTES ONLY
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getById);
router.post('/', contactsController.create);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.remove);

module.exports = router;
