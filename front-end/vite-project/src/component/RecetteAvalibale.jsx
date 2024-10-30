
import { useEffect, useState } from "react";
import axios from "axios";

export const RecetteAvalibale = () => {
  // State pour stocker les recettes disponibles
  const [recettesDisponibles, setRecettesDisponibles] = useState([]);
   // Fonction pour récupérer les recettes disponibles depuis l'API
   async function getRecettesDisponibles() {
    try {
      const response = await axios.get("http://localhost:3001/recettes-disponibles");
      console.log(response.data); // Affiche les données dans la console pour vérifier la réponse
      setRecettesDisponibles(response.data); // Stocke les recettes dans le state
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes disponibles:", error);
    }
  }
   // Utiliser useEffect pour récupérer les données lors du montage du composant
   useEffect(() => {
    getRecettesDisponibles();
  }, []);
  return (
    <div>
      <h1>Recettes Disponibles</h1>
      <ul>
        {recettesDisponibles.map((recette) => (
          <li key={recette.id}>
            <h2>{recette.nom}</h2>
            <p><strong>Instructions:</strong> {recette.instructions}</p>
            <p><strong>Difficulté:</strong> {recette.difficulte}</p>
            <p><strong>Temps de préparation:</strong> {recette.temps_preparation} minutes</p>
            <p><strong>Ingrédients:</strong> {recette.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
