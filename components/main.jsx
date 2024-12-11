import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { getRatingGames } from "../lib/rawg.js"; // Importamos la API para obtener los juegos
import { GameCard } from "./gameCard.jsx"; // Componente que muestra los juegos
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Para manejar los márgenes seguros en dispositivos móviles

export function Main() {
  const [games, setGames] = useState([]); // Lista de juegos
  const insets = useSafeAreaInsets(); // Márgenes seguros

  useEffect(() => {
    async function fetchGames() {
      const popularGames = await getRatingGames();
      setGames(popularGames);
    }
    fetchGames();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.header}>Popular Games</Text>
      {/* Usamos FlatList para listas eficientes */}
      <FlatList
        data={games} // Lista de juegos
        renderItem={({ item }) => <GameCard game={item} />} // Renderiza cada juego
        keyExtractor={(item) => item.id.toString()} // Asegura que cada elemento tenga una clave única
        contentContainerStyle={styles.content} // Estilo para el contenedor del contenido
      />
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
});
