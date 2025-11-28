const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { situation_familiale, nb_enfants, revenu_mensuel, logement } = req.body;
    db.query("INSERT INTO infos_sociales (situation_familiale, nb_enfants, revenu_mensuel, logement) VALUES (?, ?, ?, ?)",
        [situation_familiale, nb_enfants, revenu_mensuel, logement],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            res.status(200).json({ message: "Info sociale ajoutée", id: result.insertId });
        });
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM infos_sociales", (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    db.query("DELETE FROM infos_sociales WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        res.status(200).json({ message: "Info sociale supprimée" });
    });
});

module.exports = router;