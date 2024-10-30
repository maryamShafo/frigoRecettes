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
  database: "frigo_recettes",
});

// Connexion à la base de données MySQL
database.connect((err) => {
  if (err) {
    console.error("Error connecting to the MySQL Database", err);
    throw err;
  }
  console.log("Connection established sucessfully");
});


// Route de test pour vérifier la connexion et faire une requête simple
// Définition de la route HTTP GET pour l'URL "/produits"
app.get("/produits", (req, res) => {
   // Requête SQL pour récupérer toutes les lignes de la table "produits"
  const connexion = "SELECT * FROM produits";
  database.query(connexion, (err, results) => {
    if (err) {
       // Si une erreur survient lors de l'exécution de la requête
      console.error("Erreur lors de l'exécution de la requête:", err);
      // Envoie une réponse HTTP avec un code 500 (erreur serveur) et un message d'erreur
      res.status(500).send("Erreur lors de l'exécution de la requête");
    } else {
      res.json(results); // Renvoie les résultats sous forme de JSON
    }
  });
});

// Route de test pour vérifier la connexion et faire une requête simple
app.get("/recettes", (req, res) => {
  const connexion = "SELECT * FROM recettes";
  database.query(connexion, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête:", err);
      res.status(500).send("Erreur lors de l'exécution de la requête");
    } else {
      res.json(results); // Renvoie les résultats sous forme de JSON
    }
  });
});

// Route pour ajouter un produit
app.post("/produits", (req, res) => {
  const { nom, quantite, date_expiration, categorie } = req.body;
  const ajoutProduit = `
    INSERT INTO produits (nom, quantite, date_expiration, categorie)
    VALUES ('${nom}', ${quantite}, ${date_expiration}, '${categorie}')
  `;
  database.query(ajoutProduit, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du produit:", err);
    } else {
      res.json("Produit ajouté avec succès !", result);
    }
  });
});
// Route pour ajouter une recette 
app.post("/recettes", (req, res) => {
  const { nom, instructions, difficulte, temps_preparation, ingredients } = req.body;
  console.log(nom);
  
  const ajoutRecette = `
    INSERT INTO recettes (nom, instructions, difficulte, temps_preparation, ingredients)
    VALUES ('${nom}', '${instructions}', '${difficulte}', ${temps_preparation}, '${ingredients}')
  `;
  database.query(ajoutRecette, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la recette:", err);
      res.status(500).send("Erreur lors de l'ajout de la recette.");
    } else {
      res.json(result);
    }
  });
});
// routes pour teste la connexion la connexion sans endpoint
/*const connexion = "SELECT * FROM produits";
database.query(connexion, (err, results) => {
  if (err) {
    console.error("Erreur lors de l'exécution de la requête:", err);
    res.status(500).send("Erreur lors de l'exécution de la requête");
  } else {
    console.log(results);
    //res.json(results); // Renvoie les résultats sous forme de JSON
  }
});
*/
// routes pour teste la connexion la connexion sans endpoint
/*const connexion = "SELECT * FROM recettes";
database.query(connexion, (err, results) => {
  if (err) {
    console.error("Erreur lors de l'exécution de la requête:", err);
    res.status(500).send("Erreur lors de l'exécution de la requête");
  } else {
    console.log(results);
  }
});
*/

// Démarrage du serveur et écoute sur le port défini
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3001 ${port}`);
});
