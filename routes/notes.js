const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { id_apprenant, id_matiere, note, trimestre } = req.body;
    db.query("INSERT INTO notes (id_apprenant, id_matiere, note, trimestre) VALUES (?, ?, ?, ?)",
        [id_apprenant, id_matiere, note, trimestre],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            res.status(200).json({ message: "Note ajoutée", id: result.insertId });
        });
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM notes", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    db.query("DELETE FROM notes WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Note supprimée" });
    });
});

module.exports = router;