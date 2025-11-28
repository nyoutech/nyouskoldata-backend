const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const router = express.Router();

// 📁 Configuration Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ Ajouter un apprenant
router.post('/', upload.single('photo'), (req, res) => {
    const data = req.body;
    const photo = req.file ? req.file.filename : '';

    const sql = `INSERT INTO apprenants
        (nom, prenom, date_naissance, sexe, classe, date_inscription, adresse,
        id_parent, id_social, id_classe, statut, date_enregistrement,
        telephone, email, nom_tuteur, telephone_tuteur, nifouninu_tuteur, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        data.nom, data.prenom, data.date_naissance, data.sexe, data.classe,
        data.date_inscription, data.adresse, data.id_parent || null,
        data.id_social || null, data.id_classe || null, data.statut,
        data.date_enregistrement || new Date(), data.telephone, data.email,
        data.nom_tuteur, data.telephone_tuteur, data.nifouninu_tuteur, photo
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'ajout :", err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(200).json({ message: 'Apprenant ajouté', id: result.insertId });
    });
});

// ✅ Obtenir tous les apprenants
router.get('/', (req, res) => {
    const sql = "SELECT id, nom, prenom, sexe, classe, photo FROM apprenants";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ message: "Erreur serveur" });
        }
        res.status(200).json(results);
    });
});

// ✅ Supprimer un apprenant avec controle de role
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const userRole = req.headers['x-user-role']; // role envoyer depuis le frontend

    if (!userRole || userRole !== 'Admin') {
        return res.status(403).json({ message: "❌ Accès refusé : seul un Admin peut supprimer un apprenant."});
    }

    const sql = 'DELETE FROM apprenants WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression :", err);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Apprenant non trouvé" });
        }

        res.status(200).json({ message: "Apprenant supprimé avec succès" });
    });
});

module.exports = router;