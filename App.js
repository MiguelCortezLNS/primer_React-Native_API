import React, { useEffect, useState } from "react";
import {Text,View,Image,ScrollView,StyleSheet,StatusBar,SafeAreaView,} from "react-native";
import { getLatestGames, getGameDetails } from "./lib/metacritic.js";

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      const latestGames = await getLatestGames();
      setGames(latestGames);
    }
    fetchGames();
  }, []);

  const handleSelectGame = async (gameId) => {
    const gameDetails = await getGameDetails(gameId);
    setSelectedGame(gameDetails);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Latest Games</Text>
        {games.map((game) => (
          <View key={game.id} style={styles.card}>
            <Image source={{ uri: game.image }} style={styles.image} />
            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.rating}>Rating: {game.rating}</Text>
            <Text
              style={styles.detailsButton}
              onPress={() => handleSelectGame(game.id)}
            >
              View Details
            </Text>
          </View>
        ))}
        {selectedGame && (
          <View style={styles.details}>
            <Text style={styles.header}>{selectedGame.title}</Text>
            <Image source={{ uri: selectedGame.image }} style={styles.image} />
            <Text>{selectedGame.description}</Text>
            <Text>Genres: {selectedGame.genres.join(", ")}</Text>
            <Text>Platforms: {selectedGame.platforms.join(", ")}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "90%",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
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
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
