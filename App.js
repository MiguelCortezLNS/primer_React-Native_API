import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Main } from './components/main'; // Asegúrate que este es el camino correcto
import GameDetails from './screens/gameDetails'; // Importación correcta de la exportación predeterminada

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GameDetails" 
          component={GameDetails}
          options={{ 
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
