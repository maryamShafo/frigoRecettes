export const AjouterProduits = () => {
  function handleSubmitPlusPropre(e) {
    e.preventDefault();
    const form = e.target;
    console.log("e", form);
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson)
    //fetch c'est une web api qui permet de faire requete http
    fetch("http://localhost:3001/ajouterproduit", {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
  }

  return (
    <div>
      Ajouter Produit
      <form method="post" onSubmit={handleSubmitPlusPropre}>
        <label htmlFor="le nom de produits">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          minLength="4"
          maxLength="18"
          size="10"
          required
        />
        <div>
          <label htmlFor="Quantite">Quantité:</label>
          <input
            type="number"
            id="Quantite"
            name="Quantite"
            minLength="1"
            maxLength="50"
          />
        </div>
        <div>
          <label htmlFor="date_expiration">Date d&expiration:</label>
          <input type="date" id="date_expiration" name="date_expiration" />
        </div>
        <div>
          <label htmlFor="Categorie">Catégorie:</label>
          <input
            type="text"
            id="Categorie"
            name="categorie"
            minLength="4"
            maxLength="8"
            size="10"
            required
          />
        </div>
        <button
          // onClick={(e) => handleSubmitPlusPropre(e)}
          //onClick={(e) => e.preventdefault()}
          type="submit"
          value="rajoute le produit"
        >
          Ajouter Produit
        </button>
      </form>
    </div>
  );
};
