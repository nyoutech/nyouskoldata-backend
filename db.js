const mysql = require('mysql');

const db = mysql.createConnection({
    host: "mysql.railway.internal",
    port: 3306,
    user: "root",
    password: "AoptDbrJpOHOknhAMbMqtEBgFdhFrYho",
    database: "railway"
});

// Connexion
db.connect((err) => {
    if (err) {
        console.error("❌ Erreur connexion MySQL:", err);
        return;
    }
    console.log("✅ Connecté à MySQL Railway !");
});

module.exports = db;
