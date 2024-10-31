//rafc
import { AjouterProduits } from "./AjouterProduits"
import { AjouterRecettes } from "./AjouterRecettes"
import Produits from "./Produits"
import { RecetteAvalibale } from "./RecetteAvalibale"
import Recettes from "./Recettes"

export const MonFrigo = () => {
  return (
    <div>
        <Produits></Produits>
        <Recettes></Recettes>
        <RecetteAvalibale></RecetteAvalibale>
        <AjouterProduits></AjouterProduits>
        <AjouterRecettes></AjouterRecettes>
    </div>
  )
}
