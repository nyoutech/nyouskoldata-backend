const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db'); // connexion MySQL séparée (ou remplace selon ton projet)

// ✅ Configuration multer (si tu veux ajouter photo plus tard)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ Ajouter un professeur
router.post('/', (req, res) => {
    const { nom, prénom, téléphone, email, ninu, nif, date_embauche } = req.body;
    const sql = `INSERT INTO professeurs (nom, prénom, téléphone, email, ninu, nif, date_embauche)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nom, prénom, téléphone, email, ninu, nif, date_embauche], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Professeur ajouté", id: result.insertId });
    });
});

// ✅ Obtenir tous les professeurs
router.get('/', (req, res) => {
    db.query("SELECT * FROM professeurs", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

// ✅ Supprimer un professeur
router.delete('/:id', (req, res) => {
    db.query("DELETE FROM professeurs WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Professeur supprimé avec succès" });
    });
});

module.exports = router;