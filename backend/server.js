const express = require('express');
const connectDB = require('./config/db');
const aiRouter = require('./routes/aiRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'https://versemint-app.vercel.app',
  'https://versemint-app-jesminmofi-cses-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

connectDB();
app.use(express.json());
app.use('/api', aiRouter); // 👈 api prefix is correct

app.listen(port, () => {
  console.log(`VerseMint running at http://localhost:${port}`);
});
