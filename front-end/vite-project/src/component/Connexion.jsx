export const Connexion = () => {
  function handleSubmit(e) {
    e.preventDefault(); // Empêche le rechargement de la page
    const form = e.target; // Récupère le formulaire
    const formData = new FormData(form); // Crée un objet FormData à partir du formulaire
    const formJson = Object.fromEntries(formData.entries()); // Convertit FormData en objet JSON

    // Envoie une requête POST à l'endpoint de connexion
    fetch("http://localhost:3001/connexion", {
      method: form.method, // Méthode HTTP
      headers: {
        "Content-Type": "application/json", // Indique que les données sont au format JSON
      },
      body: JSON.stringify(formJson), // Convertit l'objet JSON en chaîne de caractères
    });
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Connexion
          </h2>

          <form method="POST" onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
};
