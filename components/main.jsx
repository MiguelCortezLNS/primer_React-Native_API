import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getRatingGames } from "../lib/rawg.js"; // Importamos la API para obtener los juegos
import { GameCard } from "./gameCard.jsx"; // Componente que muestra los juegos
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Para manejar los márgenes seguros en dispositivos móviles
import { Logo } from "./logo.jsx";

export function Main() {
  const [games, setGames] = useState([]); // Lista de juegos
  const [loading, setLoading] = useState(true); // Estado para controlar la carga, asumimos que los datos aun no estan cargados
  const insets = useSafeAreaInsets(); // Márgenes seguros

  useEffect(() => {
    async function fetchGames() {
      setLoading(true); // Activar el indicador de carga antes de que se obtengan los juegos
      const popularGames = await getRatingGames();
      setGames(popularGames);
      setLoading(false); // Desactivar el indicador de carga despues de que obtuvieron los juegps
    }
    fetchGames();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header_Principal}>
        <Logo
          fill="#fff"
          width={80}
          height={70}
          style={{marginLeft: 10}}
        />
      </View>

      <Text style={styles.header}>Popular Games</Text>
      {/* Mostrar ActivityIndicator mientras cargan los datos */}
      {/* "SI SE ESTAN CARGANDO" se muestra el indicador de carga, "NO SE ESTAN CARGANDO" osea ya termino la carga muestra los juegos
      esto es porque a loading al terminar de cargar los juegos se le asigno false esto en la funcion fetchGames */}
      {loading ? (
        <ActivityIndicator size="large" color="#ff0000" style={styles.loader} />
      ) : (
        <FlatList
          data={games} // Lista de juegos
          renderItem={({ item }) => <GameCard game={item} />} // Renderiza cada juego
          keyExtractor={(item) => item.id.toString()} // Asegura que cada elemento tenga una clave única
          contentContainerStyle={styles.content} // Estilo para el contenedor del contenido
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Asegúrate de que el fondo sea visible
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header_Principal: {
   // backgroundColor: "red",
    width: "100%",
    height: 90,
    paddingTop: 10, // Espaciado superior
    paddingBottom: 10, // Espaciado inferior
    marginBottom: 10,
  },
});
