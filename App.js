import * as React from 'react';  //Importa funcionalidades como View, text, etc
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Main } from './components/main.jsx'; //Este lleva { } porque es un componente
import GameDetails from './screens/gameDetails.js';

const Stack = createStackNavigator();
/* Este objeto Stack es el encargado de gestionar la navegación entre las pantallas 
en la aplicación. Cada vez que agregues una nueva pantalla a tu "navegación stack", 
será empujada a una pila. */

export default function App() {
  return (
    /* Este componente de NavigationContainer es necesario para que la navegacion 
    funcione en aplicaciones React Native, proporciona el contexto de navegacion para
    todo lo que este dentro de el */
    <NavigationContainer>
      {/* Crea un Stack.Navigatos y especifica Main como la pantalla inicial, cuando se inicie la App */}
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main" /* Se ira directo a esta por que se llama igual a la del initialRouteName, y debe de ser unico entre cada stack.navigator */
          component={Main} /* Componente que va a renderizar, esto se especifica en las primeras lineas */
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
