// Importation des modules nécessaires
//useState : Permet interagir et demodifier cette variable de gérer l'état local d'un composant fonctionnel.
//Le hook useState permet de gérer l'état local dans un composant fonctionnel
//useEffect : Permet de gérer les effets de bord, comme les appels à des API ou le nettoyage de ressources, lors du cycle de vie d'un composant.
import { useEffect, useState } from "react"; // Importer React et ses hooks
import axios from "axios"; // Importer axios pour effectuer des requêtes HTTP
//est une bibliothèque JavaScript utilisée pour effectuer des requêtes HTTP

// Définition du composant Produits
const Produits = () => {
  // State pour stocker les produits récupérés
  const [mesproduits, setMesProduits] = useState([]); // Initialisation de l'état produits avec un tableau vide

  async function getProduits() {
    try {
      // Effectuer une requête GET pour récupérer les produits
      const response = await axios.get("http://localhost:3001/produits");
      console.log(response.data);
      setMesProduits(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Utiliser useEffect pour appeler fetchProduits lors du montage du composant
  useEffect(() => {
    getProduits(); // Appel de la fonction pour récupérer les produits
  }, []); // Le tableau vide indique que cet effet ne doit s'exécuter qu'une seule fois

  // Affichage des produits sous forme de simples listes
  return (
    <div>
      <h1>Liste des Produits</h1>
      <ul>
        {mesproduits.map((monproduit) => (
          <li key={monproduit.id}>
            {monproduit.nom} - {monproduit.quantite} en stock - Expire le{" "}
            {monproduit.date_expiration || "Pas de date"} - Catégorie :{" "}
            {monproduit.categorie}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produits;
