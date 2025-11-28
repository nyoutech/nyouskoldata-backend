const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Ajouter une classe
router.post('/', (req, res) => {
    const { nom_classe, niveau, annee_scolaire } = req.body;
    db.query("INSERT INTO classes (nom_classe, niveau, annee_scolaire) VALUES (?, ?, ?)",
        [nom_classe, niveau, annee_scolaire],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            res.status(200).json({ message: "Classe ajoutée", id: result.insertId });
        });
});

// ✅ Obtenir toutes les classes
router.get('/', (req, res) => {
    db.query("SELECT * FROM classes", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

// ✅ Supprimer une classe
router.delete('/:id', (req, res) => {
    db.query("DELETE FROM classes WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Classe supprimée" });
    });
});

module.exports = router;