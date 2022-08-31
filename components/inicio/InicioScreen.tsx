import { Box, Center, Image, NativeBaseProvider, useToast, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import ProgramaGrilla from '../../interfaces/ProgramaGrilla';
import { FooterNav } from '../FooterNav';
import { Player } from '../Player';
import { Programa } from '../../interfaces/Programa';
import { REACT_APP_API_URL as url } from "@env"
import auth from '@react-native-firebase/auth';
import { Loading } from '../Loading';
import { useIsFocused } from '@react-navigation/native'
import { fontFamily, fontWeight } from 'styled-system';
import { sendToken } from '../../firebase/auth';


export const InicioScreen = ({ navigation }) => {

    const logo = require('../../assets/images/logo.png');
    const generica = require('../../assets/images/generica.jpg');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        uid: '',
        email: '',
    })

    const authChanged = () => {
        auth().onAuthStateChanged(user => {
            if (user == null) {
                getCurrentPrograma(url + 'api/programas/current/');
            } else {
                setUser({
                    uid: user.uid,
                    email: user.email,
                })
                sendToken(user.uid);
                getCurrentPrograma(url + 'api/programas/current/?idUsuario=' + user.uid);
            }
        })
    }
    const [current, setCurrent] = useState<Programa>({
        id: 0,
        nombre: '',
        imagen: generica,
        descripcion: '',
        staff: '',
        horarios: [],
        transmisions: [],
        liked: false
    })

    const getCurrentPrograma = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => setCurrent(data))
            .catch(err => console.error(err.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
     
        authChanged();
    }, [])


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="dark.100" alignItems="center" >
                <VStack flex={10} accessible={true}>
                    <Center flex={1}>
                        <Image
                            source={logo}
                            style={styles.logo}
                            alt="Logo"
                        />
                    </Center>
                    <Center flex={5}>
                        <Image
                            source={
                                generica
                            }
                            alt="Programa"
                            style={styles.imagen}
                        />
                        <Text style={styles.titulo}>{current.nombre}</Text>
                    </Center >
                </VStack>
                <Player current={current} setCurrent={setCurrent} navigation={navigation} user={user} />
                <FooterNav navigation={navigation} />
            </Box >
        </NativeBaseProvider >
    )
}
const styles = StyleSheet.create({
    imagen: {
        width: 300,
        height: 300,
    },
    logo: {
        width: 300,
        height: 80,
        marginTop: 70,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        color: 'white',
        fontFamily: 'Encode Sans'
    },
    subTitulo: {
        fontSize: 20,
        marginTop: 10,
        color: 'white'
    }
});


