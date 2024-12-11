import React, { useEffect, useState } from "react";
/*
useEffect: un hook de react que se utiliza para manejar efectos secundarios (como llamadas a APIs o suscripciones)
useState: Una variable que cada que cambia de valor se vuelven a renderizar los componentes
un hook de react que permite agregar y manejar estado dentro de un componente funcional
*/
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";

/*
Text: Componente para mostrar el texto en la interfaz
View: Componente contenedor que agrupa otros componentes y permite aplicar estilos
Image: Componente para mostrar imagenes
ScrollView: Componente para hacer scroll en vistas con contenido que excede el tamaño de la pantalla
StyleSheet: API para definir estilos en react native (Esta hasta la parte de los estilos)
StatusBar: Componente para personalizar la barra de estado (color, estilo, etc) (esta es donde sale la hora, bateria etc)
SafeAreaView: Componente que asegura que el contenido no se superponga con las areas seguras del dispositivo (statusbar o notch)
Platform: Para checar las plataformas movil, web
*/
import { getRatingGames, getGameDetails } from "./lib/rawg.js"; //Importamos funciones del archivo con la API


export default function App() {
  const [games, setGames] = useState([]); //games es una lista que almacen los juegos de la API, inicialmente esta vacia
  const [selectedGame, setSelectedGame] = useState(null); //selectedGame almacena los detalles de los juegos, esta en null

  useEffect(() => { /* es asincrona porque esta esperando a que se cargen los datos de la API
    si no los ponemos pueden ocurrir errores */
    async function fetchGames() {
      const popularGames = await getRatingGames();
      setGames(popularGames);
    }
    fetchGames();
  }, []);

  /* Al mandar a llamar a esta funcion con el gameId obtenemos los datos de tal juego de la API*/
  const handleSelectGame = async (gameId) => {  
    const gameDetails = await getGameDetails(gameId); /* Todos los datos que regresaron de la API se guardan en gameDetails */
    setSelectedGame(gameDetails); /* con esos datos de gameDetails actualizamos los datos de selectedGame actualizando su estado 
    lo cual hace que se muestre el view de SelectedGame */
  };

  return (
  /*para mantener el espacio en el area segura (osea fuera del statusbar)*/
    <SafeAreaView style={styles.container}>
      {/* Barra de estado, style="light" para que se vean los datos */}
      <StatusBar style="light" />
      {/* ScrollView, permite que el contenido sea desplazable si excede la altura de la pantalla */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Popular Games</Text>
        {games.map((game) => ( /* games.map((game)) es una iteracion de la lista de games y game representa un juego individual de la lista games 
        osea por el map si tengo los 10 juegos me mostrara los 10 juegos*/
          <View key={game.id} style={styles.card}>
          {/* game.id toma el id para mostrar los datos de los demas juegos */}
            <Image source={{ uri: game.image }} style={styles.imageCard} />
            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.rating}>Rating: {game.rating}</Text>
            <Text
              style={styles.detailsButton}
              onPress={() => handleSelectGame(game.id)}  /* Al presionar lo mando a la funcion de handleSelectedGame y se le manda el game.id del juego*/
            >
              View Details
            </Text>
          </View>
        ))}
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
      </ScrollView>
    </SafeAreaView>
  );
}


/* Los estilos */
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
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "80%",
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
