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
  Platform,
} from "react-native";

/*
Text: Componente para mostrar el texto en la interfaz
View: Componente contenedor que agrupa otros componentes y permite aplicar estilos
Image: Componente para mostrar imagenes
ScrollView: Componente para hacer scroll en vistas con contenido que excede el tamaño de la pantalla
StyleSheet: API para definir estilos en react native (Esta hasta la parte de los estilos)
StatusBar: Componente para personalizar la barra de estado (color, estilo, etc) (esta es donde sale la hora, bateria etc)
SafeAreaView: Componente que asegura que el contenido no se superponga con las areas seguras del dispositivo (statusbar o notch) (SOLO IOs)
Platform: Para checar las plataformas movil, web
*/
import { getRatingGames, getGameDetails } from "../lib/rawg.js"; //Importamos funciones del archivo con la API
import { useSafeAreaInsets } from "react-native-safe-area-context";  //Son las separaciones de arriba y abajo (la statusbar)
import { GameCard } from "./gameCard.jsx";


export function Main() {
  const [games, setGames] = useState([]); //games es una lista que almacen los juegos de la API, inicialmente esta vacia
  const insets = useSafeAreaInsets(); //los insets solo se pueden usar en el cuerpo del codigo, no en los estilos de styleSheet

  useEffect(() => { /* es asincrona porque esta esperando a que se cargen los datos de la API
    si no los ponemos pueden ocurrir errores */
    async function fetchGames() {
      const popularGames = await getRatingGames();
      setGames(popularGames);
    }
    fetchGames();
  }, []);

  return (
    /* Area de arriba como de abajo para que no los tape, sirve tanto en android como ios */
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, }}>
      {/* Barra de estado, style="light" para que se vean los datos */}
      <StatusBar style="light" />
      {/* ScrollView, permite que el contenido sea desplazable si excede la altura de la pantalla */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Popular Games</Text>
        {games.map((game) => ( /* games.map((game)) es una iteracion de la lista de games y game representa un juego individual de la lista games 
        osea por el map si tengo los 10 juegos me mostrara los 10 juegos*/
        <GameCard key={game.id} game={game}/>
        ))}
       
      </ScrollView>
    </View>
  );
}


/* Los estilos */
const styles = StyleSheet.create({
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
});
