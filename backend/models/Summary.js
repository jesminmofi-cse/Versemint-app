const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  summarizedText: { type: String, required: true }, // the actual summary
  originalText: { type: String },                   // original input text (optional)
  originalFileName: { type: String },                // original file name (optional)
  uploadId: { type: String },                        // link to an upload (optional)
  createdAt: { type: Date, default: Date.now },      // timestamp
});

module.exports = mongoose.model('Summary', summarySchema);
//Summary.js