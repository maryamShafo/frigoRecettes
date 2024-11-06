//rafc
import { AjouterProduits } from "./AjouterProduits"
import { AjouterRecettes } from "./AjouterRecettes"
import { Connexion } from "./Connexion"
import { Inscription } from "./Inscription"
import Produits from "./Produits"
// import { RecetteAvalibale } from "./RecetteAvalibale"
import Recettes from "./Recettes"

export const MonFrigo = () => {
  return (
    <div>
        <Produits></Produits>
        <Recettes></Recettes>
        <AjouterProduits></AjouterProduits>
        <AjouterRecettes></AjouterRecettes>
        <Inscription></Inscription>
        <Connexion></Connexion>
        {/* <RecetteAvalibale></RecetteAvalibale> */} 
    </div>
  )
}
