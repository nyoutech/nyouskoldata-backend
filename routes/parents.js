const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { nom, prenom, telephone, adresse, email } = req.body;
    db.query("INSERT INTO parents (nom, prenom, telephone, adresse, email) VALUES (?, ?, ?, ?, ?)",
        [nom, prenom, telephone, adresse, email],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            res.status(200).json({ message: "Parent ajouté", id: result.insertId });
        });
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM parents", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    db.query("DELETE FROM parents WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Parent supprimé" });
    });
});

module.exports = router;