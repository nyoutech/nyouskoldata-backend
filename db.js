const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql300.infinityfree.com',
    user: 'if0_40546674',
    password: 'Espece9imbecile',
    database: 'if0_40546674_nyouskoldata',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur connexion MySQL:', err);
    } else {
        console.log('Connexion MySQL réussie !');
    }
});

module.exports = connection;
