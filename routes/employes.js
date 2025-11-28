const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { nom, prenom, poste, telephone, email, date_embauche } = req.body;
    db.query("INSERT INTO employes (nom, prenom, poste, telephone, email, date_embauche) VALUES (?, ?, ?, ?, ?, ?)",
        [nom, prenom, poste, telephone, email, date_embauche],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            res.status(200).json({ message: "Employé ajouté", id: result.insertId });
        });
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM employes", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    db.query("DELETE FROM employes WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Employé supprimé" });
    });
});

module.exports = router;