import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook `useNavigation`, que permite acceder a la funcionalidad de navegación dentro del componente.

export default function GameDetails() {
  const navigation = useNavigation(); // Usamos el hook `useNavigation` para obtener la instancia de navegación.

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hola mundo</Text>
      <Button
        title="Regresar"
        onPress={() => navigation.goBack()}  // Utiliza el método goBack de la navegación
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
