// Importation des modules nécessaires
const express = require("express"); // Express est un framework web pour Node.js
const mysql = require("mysql2");
const cors = require("cors");
// Création de l'application Express
const app = express();
app.use(cors());
// Middleware pour permettre à l'application de traiter les requêtes au format JSON
app.use(express.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;
const port = 3001;

//connection de mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://maryamshafo2000:dO6FDH6Rk0uAxtDn@clusterfrigo.a6mhs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFrigo";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
    AfficherMesCollections();
    //SuppressionUserInsteadOne();
    GetIfOfAnUser("sean_bean@gameofthron.es");
  }
}
run().catch(console.dir);

function SelectGoodDB(dbName) {
  return (db = client.db(dbName));
}

// Déclare une fonction asynchrone pour afficher les collections de la base de données
async function AfficherMesCollections() {
  const dbName = "sample_mflix";
  const db = client.db(dbName);
  // Liste toutes les collections de la base de données
  db.listCollections()
    // Convertit le résultat en un tableau pour faciliter le traitement
    .toArray()
    // Utilise une promesse pour exécuter du code une fois les données récupérées
    .then((cols) =>
      // Parcourt chaque collection du tableau avec la fonction map
      cols.map((col, index) => {
        // Affiche l'index et le nom de chaque collection dans la console
        console.log(`Collections ${index} :`, col);
      })
    );
}

// Fonction principale asynchrone pour supprimer tous les documents sauf un
async function SuppressionUserInsteadOne() {
  const db = SelectGoodDB("sample_mflix");
  const userscollections = db.collection("users");
  const req = { _id: { $ne: new ObjectId("59b99db4cfa9a34dcd7885b6") } };
  const result = await userscollections.deleteMany(req);
  console.log(result);
}
async function GetIfOfAnUser(emailOfUser) {
  const db = SelectGoodDB("sample_mflix");
  const usersCollections = db.collection("users");
  const req = { email: emailOfUser };
  const result = await usersCollections.findOne(req);
  console.log("MonUser", result._id);
  return result._id;
}
//endpoint de inscription
app.post("/inscription", async (req, res)=> {
  const {name, email, password} = req.body;
  console.log("req body", req.body)
  const db = SelectGoodDB("sample_mflix")
  const usersCollection = db.collection('users');
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  const result = await usersCollection.insertOne({name, email, passwordHashed })
  console.log(result)
  return res.send("Utilisateur crée avec succès")
})

//endpoint de connexion
app.post("/connexion", async (req, res) => {
  const { email, password } = req.body;
  const db = SelectGoodDB("sample_mflix");
  const usersCollections = db.collection("users");
  const findUser = await usersCollections.findOne({ email });
  if (findUser) {
    const passwordHashedTrueOrNot = await bcrypt.compare(
      password,
      findUser.passwordHashed
    );
    return res.send
    (passwordHashedTrueOrNot ? "connecté avec succès": "le mot de passe n'existe pas");
  } else {
    return res.send("cette email est assoisé a aucun utilisateur");
  }
});

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
app.post("/ajouterproduit", (req, res) => {
  const { nom, Quantite, date_expiration, categorie } = req.body;
  console.log(nom, Quantite, date_expiration, categorie);
  // const sql =`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`
  // db.query(sql, [nom, quantity, datedexpi, category],
  database.query(
    `INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ('${nom}', '${Quantite}', '${date_expiration}', '${categorie}')`,
    function (err, results, fields) {
      console.log("Resultats", results, err, fields);
      res.send("Post request to ajouter produit");
    }
  );
});

// Route pour ajouter une recette
app.post("/ajouterrecette", (req, res) => {
  const { nom, instructions, difficulte, temps_preparation, ingredients } =
    req.body;
  database.query(
    `INSERT INTO recettes (nom, instructions, difficulte, temps_preparation, ingredients ) 
      VALUES ('${nom}', '${instructions}', '${difficulte}', '${temps_preparation}', '${ingredients}')`,

    function (err, results, fields) {
      console.log("Resultats", results, err, fields);
      res.send("Post request to ajouter recette");
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
      console.error(
        "Erreur lors de la récupération des recettes disponibles:",
        err
      );
      res
        .status(500)
        .send("Erreur lors de la récupération des recettes disponibles.");
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
