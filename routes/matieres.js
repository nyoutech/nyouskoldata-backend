const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { nom_matiere, code, coefficient } = req.body;
    db.query("INSERT INTO matieres (nom_matiere, code, coefficient) VALUES (?, ?, ?)",
        [nom_matiere, code, coefficient],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            res.status(200).json({ message: "Matière ajoutée", id: result.insertId });
        });
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM matieres", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    db.query("DELETE FROM matieres WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Matière supprimée" });
    });
});

module.exports = router;