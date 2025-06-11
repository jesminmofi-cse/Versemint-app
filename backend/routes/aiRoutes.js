const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { getSummaries, createSummary, deleteSummary } = require('../controllers/aiController');
const { summarizeDocument } = require('../controllers/summarizerController'); // <-- Add this!

router.get('/bulk', getSummaries);
router.post('/create', createSummary);
router.delete('/delete/:id', deleteSummary);

// ADD THIS ROUTE
router.post('/api/summarize-pdf', upload.single('file'), summarizeDocument);

module.exports = router;
//aiRoutes.js