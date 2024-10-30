//rafc
import Produits from "./Produits"
import { RecetteAvalibale } from "./RecetteAvalibale"
import Recettes from "./Recettes"

export const MonFrigo = () => {
  return (
    <div>
        <Produits></Produits>
        <Recettes></Recettes>
        <RecetteAvalibale></RecetteAvalibale>
    </div>
  )
}
