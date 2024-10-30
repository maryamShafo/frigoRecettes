import { useEffect, useState } from "react";
import axios from "axios";

const Recettes = () => {
  const [mesrecettes, setMesRecettes] = useState([]); // Gère la liste des recettes

  async function getRecettes() {
    try {
      // Effectuer une requête GET pour récupérer les produits
      const response = await axios.get("http://localhost:3001/recettes");
      console.log(response.data);
      setMesRecettes(response.data);
    } catch (error) {
      console.error(error);
    }
  } 
  useEffect(() => {
    getRecettes(); // Appel de la fonction pour récupérer les produits
  }, []); // Le tableau vide indique que cet effet ne doit s'exécuter qu'une seule fois

  return (
    <div>
      <h1>Liste des Recettes</h1>
      <ul>
        {mesrecettes.map((monrecette) => (
          <li key={monrecette.id}>
            <h2>{monrecette.nom}</h2>
            <p>
              <strong>Instructions:</strong> {monrecette.instructions}
            </p>
            <p>
              <strong>Difficulté:</strong> {monrecette.difficulte}
            </p>
            <p>
              <strong>Temps de préparation:</strong> {monrecette.temps_preparation}{" "}
              minutes
            </p>
            <p>
              <strong>Ingrédients:</strong> {monrecette.ingredients}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Recettes;
