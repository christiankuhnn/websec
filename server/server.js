const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect('mongodb://localhost:27017/tourney', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const tournamentSchema = new mongoose.Schema({
  tournamentName: String,
  tournamentDate: Date,
  tournamentLocation: String,
  // Add other fields as needed
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

app.post('/create-tournament', async (req, res) => {
  const tournamentData = req.body;
  try {
    const tournament = await Tournament.create(tournamentData);
    res.status(201).json(tournament);
  } catch (err) {
    console.error('Error creating tournament:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/upcoming-tournaments', async (req, res) => {
  try {
    const today = new Date();
    const upcomingTournaments = await Tournament.find({
      tournamentDate: { $gte: today },
    }).exec();

    res.status(200).json(upcomingTournaments);
  } catch (err) {
    console.error('Error fetching upcoming tournaments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
