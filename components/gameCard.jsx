import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Platform, Animated } from "react-native";
import {getGameDetails } from "../lib/rawg.js"; //Importamos funciones del archivo con la API


export function GameCard({ game }) {
    const [clickCount, setClickCount] = useState(0); // Contador para el clic
    const [selectedGame, setSelectedGame] = useState(null); // Para almacenar el juego seleccionado
    
    const handleSelectGame = async (gameId) => {
    
      if (clickCount === 0) {
        // Si no se ha hecho clic o se hace clic en un juego diferente
        const gameDetails = await getGameDetails(gameId); // Obtiene los detalles del juego
        setSelectedGame(gameDetails);  // Muestra los detalles
        setClickCount(1); // Marca que se hizo clic en un juego
        console.log(`Se hizo clic en un nuevo juego. Detalles mostrados.`);
        console.log(`Estado actual del contador de clics: ${clickCount}`); // Muestra el contador actual en la terminal

      } else if (clickCount === 1) {
        // Si ya se hizo clic en el mismo juego, lo cierra (clickCount = 2)
        setSelectedGame(null);  // Oculta los detalles
        setClickCount(0); // Marca que se hizo clic en el mismo juego
        console.log(`Se hizo clic nuevamente en el mismo juego. Detalles ocultados.`);
        console.log(`Estado actual del contador de clics: ${clickCount}`); // Muestra el contador actual en la terminal
      }
    };
    
    
  
  return (
    <View key={game.id} style={styles.card}>
      {/* game.id toma el id para mostrar los datos de los demas juegos */}
      <Image source={{ uri: game.image }} style={styles.imageCard} />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.rating}>Rating: {game.rating}</Text>
      <Text style={styles.detailsButton}
        onPress={() =>
          handleSelectGame(game.id)
        } /* Al presionar lo mando a la funcion de handleSelectedGame y se le manda el game.id del juego*/
        >
        View Details
      </Text>
      {selectedGame && 
        (  /* SI SelectedGame no es null ni undefined entonces muestra lo del siguiente view, 
          como de inicio es null no se muestra el view, pero al dar clic en view detailes esta 
          manda a la funcion que le da datos validos al SelectedGame */
          <View style={styles.details}>
            <Text style={styles.header}>{selectedGame.title}</Text>
            <Image
              source={{ uri: selectedGame.image }}
              style={styles.image}
              onError={(e) =>
                console.error("Error cargando la imagen:", e.nativeEvent.error)
              }
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
<Animated.View style={[{ opacity, alignItems:'center', width:"100%" }]}>
  <GameCard game={game} />
</Animated.View>

  )
}

/* Los estilos */
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
      width: "50%", // Ocupa el 50% del ancho del contenedor
      aspectRatio: 16 / 9, // Mantén la relación de aspecto 16:9
      borderRadius: 10,
    },
    default: {
      width: "100%", // En móviles, ocupa todo el ancho del contenedor
      aspectRatio: 16 / 9, // Mantén la relación de aspecto
      borderRadius: 10,
    },
  }),
  image: Platform.select({
    web: {
      width: "40%", // En web, ocupa el 40% del ancho del contenedor
      height: undefined,
      aspectRatio: 16 / 9, // Mantén la relación de aspecto
      borderRadius: 10,
      marginBottom: 10,
    },
    default: {
      width: "80%", // En móviles, ocupa todo el ancho del contenedor
      aspectRatio: 16 / 9, // Mantén la relación de aspecto
      height: undefined, // Al no poner el `height`, la imagen toma el tamaño adecuado por el `aspectRatio`
      borderRadius: 10,
      marginBottom: 10,
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
