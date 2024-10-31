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
/*
//rout pour ajouter un produits test
app.post("/ajouterproduit", (req, res) => {
  const { nom, quantite, date_expiration, categorie } = req.body;

  // Requête préparée avec valeurs paramétrées
  const ajoutProduit = `
    INSERT INTO produits (nom, quantite, date_expiration, categorie)
    ('${nom}', ${quantite}, ${date_expiration}, '${categorie}')
  `;

  // Exécuter la requête en passant les valeurs dans un tableau
  database.query(ajoutProduit, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du produit:", err);
      res.status(500).send("Erreur lors de l'ajout du produit.");
    } else {
      res.json({ message: "Produit ajouté avec succès !", result });
    }
  });
});
*/
// Route pour ajouter un produit
app.post('/ajouterproduit', (req, res) => {
  const { nom, Quantite, date_expiration, categorie } = req.body;
  console.log(nom,Quantite, date_expiration, categorie);
    // const sql =`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`
    // db.query(sql, [nom, quantity, datedexpi, category],
    database.query(`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ('${nom}', '${Quantite}', '${date_expiration}', '${categorie}')`, 
      function (err, results, fields) {
        console.log("Resultats", results, err, fields);
        res.send('Post request to ajouter produit');
      }
    );
});

// Route pour ajouter une recette
app.post("/ajouterrecette", (req, res) => {
  const { nom, instructions, difficulte, temps_preparation, ingredients } =
    req.body;
    database.query(`INSERT INTO recettes (nom, instructions, difficulte, temps_preparation, ingredients ) 
      VALUES ('${nom}', '${instructions}', '${difficulte}', '${temps_preparation}', '${ingredients}')`, 

      function (err, results, fields) {
        console.log("Resultats", results, err, fields);
        res.send('Post request to ajouter recette');
      }
    );
});

//route pour recuperer les recettes disponibles
app.get("/recettes-disponibles", (req, res) => {
  const sqlQuery = `
    SELECT r.*
    FROM recettes AS r
    WHERE EXISTS (
    SELECT 1
    FROM produits AS p
    WHERE r.ingredients LIKE CONCAT('%', p.nom, '%')
    );
  `;
  database.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des recettes disponibles:",err);
      res.status(500).send("Erreur lors de la récupération des recettes disponibles.");
    } else {
      res.json(result); // Renvoie les recettes réalisables en JSON
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
