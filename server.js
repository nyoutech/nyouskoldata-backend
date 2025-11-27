const express = require('express');
const cors = require('cors');
const path = require('path');

const db = require('./db'); // utilise process.env.* via db.js

const apprenantsRoutes = require('./routes/apprenants');
const professeursRoutes = require('./routes/professeurs');
// ... importe les autres routes comme tu as déjà

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/apprenants', apprenantsRoutes);
app.use('/api/professeurs', professeursRoutes);
// ... les autres routes

// route test
app.get('/', (req, res) => res.send('Backend NyouSkolData en ligne ✅'));

// counts (exemple)
app.get('/api/counts', async (req, res) => {
  try {
    const [rowsA] = await db.promise().query('SELECT COUNT(*) AS total FROM apprenants');
    const [rowsP] = await db.promise().query('SELECT COUNT(*) AS total FROM professeurs');
    const [rowsE] = await db.promise().query('SELECT COUNT(*) AS total FROM employes');
    const [rowsC] = await db.promise().query('SELECT COUNT(*) AS total FROM classes');
    res.json({
      apprenants: rowsA[0].total,
      professeurs: rowsP[0].total,
      employes: rowsE[0].total,
      classes: rowsC[0].total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
