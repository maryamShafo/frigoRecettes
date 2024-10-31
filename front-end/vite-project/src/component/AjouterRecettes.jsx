
export const AjouterRecettes = () => {
  function handleSubmitPlusPropre(e) {
    e.preventDefault();
    const form = e.target;
    console.log("e", form);
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch("http://localhost:3001/ajouterrecette", {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
  }
  return (
    <div>
    <form method="post" onSubmit={handleSubmitPlusPropre}>
        <label htmlFor="nom">Nom de la recette:</label>
        <input type="text"
          id="nom"
          name="nom"
          minLength="4"
          maxLength="18"
          size="10"
          required />

        <label htmlFor="instructions">Instructions:</label>
        <textarea
            id="instructions"
            name="instructions"     
            maxLength="1000" 
            required
        />
        <label htmlFor="difficulte">Difficulté:</label>
        <input type="text" id="difficulte" name="difficulte" required />

        <label htmlFor="temps_preparation">Temps de préparation (en minutes):</label>
        <input  type="number"
            id="temps_preparation"
            name="temps_preparation"
            min="1"       
            max="240"     
            required 
        />
        <label htmlFor="ingredients">Ingrédients:</label>
        <input type="text"
            id="ingredients"
            name="ingredients"
            minLength="3"    
            maxLength="200"  
            required 
        />
        <button type="submit" 
          value="rajoute la recette">Ajouter Recette</button>
      </form>
    </div>
  );
};

