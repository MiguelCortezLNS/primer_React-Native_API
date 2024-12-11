// archivo: rawg.js

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = "4850a3a3326a4db4b5c689935e8f7a18"; // Reemplaza esto con tu clave API

// Obtiene los juegos más recientes
export async function getLatestGames() {
  const url = `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.results.map((game) => {
      const { id, name, released, background_image, rating } = game;
      return {
        id,
        title: name,
        releaseDate: released,
        image: background_image,
        rating,
      };
    });
  } catch (error) {
    console.error("Error fetching latest games:", error);
    return [];
  }
}

// Obtiene detalles de un juego por su ID
export async function getGameDetails(gameId) {
  const url = `${BASE_URL}/games/${gameId}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const {
      name,
      description_raw,
      released,
      background_image,
      rating,
      platforms,
      genres,
    } = data;

    return {
      title: name,
      description: description_raw,
      releaseDate: released,
      image: background_image,
      rating,
      platforms: platforms.map((p) => p.platform.name),
      genres: genres.map((g) => g.name),
    };
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
}
