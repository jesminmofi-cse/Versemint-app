const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { getSummaries, createSummary, deleteSummary } = require('../controllers/aiController');
const { summarizeDocument } = require('../controllers/summarizerController');

router.get('/bulk', getSummaries);
router.post('/create', createSummary);
router.delete('/delete/:id', deleteSummary);

// ✔ Correct endpoint under /api
router.post('/summarize-pdf', upload.single('file'), summarizeDocument);

module.exports = router;
