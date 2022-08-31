import { NavigationContainer } from '@react-navigation/native';
import { Center, HStack, Pressable, useToast } from 'native-base'
import React, { useEffect, useState } from 'react'
import Icon from  '@fortawesome/react-fontawesome'
import { InicioScreen } from './inicio/InicioScreen';
import { TransmisionesScreen } from './transmisiones/TransmisionesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

export const FooterNav = ({ navigation }) => {
  const [login, setLogin] = useState('Login')
  const authChanged = () => {
    auth().onAuthStateChanged(user => {
      if (user != null) {
        setLogin('Chat')
      }
    })
  }

  useEffect(() => {

    authChanged();
    return () => {
      setLogin('Login');

    }
  }, [])

  return (

    <HStack bg="darkBlue.900" alignItems="center" flex={1} safeAreaBottom shadow={6}>
      <Pressable
        cursor="pointer"
        py="3"
        flex={1}
        onPress={() => navigation.navigate('Home')}
      >
        <Center>
          <Icon name="home" size={40} color="white" />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        py="2"
        flex={1}
        onPress={() => navigation.navigate(login)}
      >
        <Center>
          <Icon name="users" size={40} color="white" />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        py="2"
        flex={1}
        onPress={() => navigation.navigate('Programas')}
      >
        <Center>
          <Icon name="list" size={40} color="white" />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        py="2"
        flex={1}
        onPress={() => navigation.navigate('Transmisiones')}
      >
        <Center>
          <Icon name="bullhorn" size={40} color="white" />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        py="2"
        flex={1}
        onPress={() => navigation.navigate('Contacto')}
      >
        <Center>
          <Icon name="inbox" size={40} color="white" />
        </Center>
      </Pressable>


    </HStack>

  )
}
