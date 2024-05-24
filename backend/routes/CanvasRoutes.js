const express = require('express');
const router = express.Router();
const CanvasController = require('../controllers/CanvasController');
const authMiddleware = require('../authmiddleware');

router.get('/:code', authMiddleware, CanvasController.getCanvas);
router.get('/', authMiddleware, CanvasController.getAllCanvas);
router.post('/', authMiddleware, CanvasController.createCanvas);

router.put('/access/:code', authMiddleware, CanvasController.updateAccess);

router.delete('/:code', authMiddleware, CanvasController.deleteCanvas);

module.exports = router;