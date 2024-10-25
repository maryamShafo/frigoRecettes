// Importation des modules nécessaires
const express = require("express"); // Express est un framework web pour Node.js
const mysql = require("mysql2");
const cors = require("cors");

// Création de l'application Express
const app = express();
app.use(cors());
// Middleware pour permettre à l'application de traiter les requêtes au format JSON
app.use(express.json());
const port = 3001;

// Définition d'une route GET à la racine ('/')
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Création de la connexion à la base de données MySQL
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  // database: "frigo_recettes",
});

// Connexion à la base de données MySQL
database.connect((err) => {
  if (err) {
    console.error("Error connecting to the MySQL Database", err);
    throw err;
  }
  console.log("Connection established sucessfully");
});

/*
// Route de test pour vérifier la connexion et faire une requête simple
app.get("/produits", (req, res) => {
  const connexion = "SELECT * FROM frigo_recettes";
  database.query(connexion, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête:", err);
      res.status(500).send("Erreur lors de l'exécution de la requête");
    } else {
      res.json(results); // Renvoie les résultats sous forme de JSON
    }
  });
});
*/
// Démarrage du serveur et écoute sur le port défini
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3001 ${port}`);
});
