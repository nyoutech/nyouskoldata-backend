const mysql = require('mysql2'); // <-- ici mysql2

const db = mysql.createConnection({
    host: "yamabiko.proxy.rlwy.net",
    port: 47205,
    user: "root",
    password: "AoptDbrJpOHOknhAMbMqtEBgFdhFrYho",
    database: "railway"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Erreur connexion MySQL:", err);
        return;
    }
    console.log("✅ Connecté à MySQL Railway !");
});

module.exports = db;
