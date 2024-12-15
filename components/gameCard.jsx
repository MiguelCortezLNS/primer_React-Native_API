import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Platform, Animated } from "react-native";
import { getGameDetails } from "../lib/rawg.js";
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

export function GameCard({ game }) {
  const [clickCount, setClickCount] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigation = useNavigation(); // Hook de navegación Usamos useNavigation() para obtener el objeto de navegación, lo que nos permitirá realizar la navegación entre pantallas.

  const handleSelectGame = async (gameId) => {
    if (clickCount === 0) {
      const gameDetails = await getGameDetails(gameId);
      setSelectedGame(gameDetails);
      setClickCount(1);
      console.log(`Se hizo clic en un nuevo juego. Detalles mostrados.`);
    } else if (clickCount === 1) {
      setSelectedGame(null);
      setClickCount(0);
      console.log(`Se hizo clic nuevamente en el mismo juego. Detalles ocultados.`);
    }
  };

  const handleNavigateToDetailsPage = () => {
    navigation.navigate('GameDetails'); // Navegar a GameDetails.js sabe que asi se llama porque asi la llamamos en lo del app.js
  };

  return (
    <View key={game.id} style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.imageCard} />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.rating}>Rating: {game.rating}</Text>
      <Text
        style={styles.detailsButton}
        onPress={() => handleSelectGame(game.id)}
      >
        View Details
      </Text>
      
      <Text
        style={styles.detailsButton}
        onPress={handleNavigateToDetailsPage} // Nuevo botón de navegación
      >
        View Details in Page
      </Text>

      {selectedGame && (
        <View style={styles.details}>
          <Text style={styles.header}>{selectedGame.title}</Text>
          <Image
            source={{ uri: selectedGame.image }}
            style={styles.image}
            onError={(e) => console.error("Error cargando la imagen:", e.nativeEvent.error)}
          />
          <Text>Rating: {selectedGame.rating}</Text>
          <Text style={styles.description}>Description: {selectedGame.description}</Text>
          <Text>Genres: {selectedGame.genres.join(", ")}</Text>
          <Text>Platforms: {selectedGame.platforms.join(", ")}</Text>
        </View>
      )}
    </View>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 500,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={[{ opacity, alignItems: 'center', width: '100%' }]}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "90%",
    alignItems: "center",
    borderRadius: 8,
  },
  imageCard: Platform.select({
    web: {
      width: "50%",
      aspectRatio: 16 / 9,
      borderRadius: 10,
    },
    default: {
      width: "100%",
      aspectRatio: 16 / 9,
      borderRadius: 10,
    },
  }),
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    marginTop: 5,
  },
  detailsButton: {
    color: "blue",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  details: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "center",
  },
});
