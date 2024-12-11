import { View, StyleSheet, StatusBar, Platform } from "react-native";

/*
View: Componente contenedor que agrupa otros componentes y permite aplicar estilos
StyleSheet: API para definir estilos en react native (Esta hasta la parte de los estilos)
StatusBar: Componente para personalizar la barra de estado (color, estilo, etc) (esta es donde sale la hora, bateria etc)
Platform: Para checar las plataformas movil, web
*/
import { Main } from "./components/main.jsx";  //importar componente
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Barra de estado, style="light" para que se vean los datos */}
        <StatusBar style="light" />
        {/* ScrollView, permite que el contenido sea desplazable si excede la altura de la pantalla */}
        <Main/> 
        {/* Llamar componente */}
      </View>
    </SafeAreaProvider>
  );
}

/* Los estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
}
);
