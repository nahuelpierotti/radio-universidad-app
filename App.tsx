import React, { useEffect } from 'react';
import {
  NativeBaseProvider
} from 'native-base';
import { InicioScreen } from './components/inicio/InicioScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransmisionesScreen } from './components/transmisiones/TransmisionesScreen';
import { TransmisionScreen } from './components/transmisiones/TransmisionScreen';
import { ProgramasScreen } from './components/programas/ProgramasScreen';
import { ProgramaScreen } from './components/programas/ProgramaScreen';
import { LoginScreen } from './components/usuario/LoginScreen';
import { RegistroScreen } from './components/usuario/RegistroScreen';
import { ChatScreen } from './components/usuario/ChatScreen';
import { ContactoScreen } from './components/contacto/ContactoScreen';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Home" component={InicioScreen} />
          <Stack.Screen name="Transmisiones" component={TransmisionesScreen} />
          <Stack.Screen name="Transmision" component={TransmisionScreen} />
          <Stack.Screen name="Programas" component={ProgramasScreen} />
          <Stack.Screen name="Programa" component={ProgramaScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Contacto" component={ContactoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}