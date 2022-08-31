import { Box, Center, Icon, Input, ScrollView, VStack, HStack, Button, Image, Heading, Link, Toast, useToast, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react'
import { resetPassword, signIn } from '../../firebase/auth';
import { FooterNav } from '../FooterNav'
import { StyleSheet, ViewBase, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Loading } from '../Loading';

export const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const toast = useToast()

    const handleLogin = async () => {
        if (email.trim() !== '' && password.trim() !== '') {
            setLoading(true)
            const { ok, mensaje } = await signIn(email, password);
            if (ok) {
                setLoading(false)
                toast.show({
                    title: "Inicio de sesión",
                    status: "success",
                    description: "Bienvenido.",
                })
               
            } else {
                setLoading(false)
                toast.show({
                    title: "Error",
                    status: "error",
                    description: mensaje,
                    h: '15'
                })
            }
        } else {
            toast.show({
                title: "Error",
                status: "error",
                description: "Por favor ingrese un Email y una contraseña",
            })
        }
    }
    const logo = require('../../assets/images/logo-vertical-grande.png');

    const authChanged = () => {
        auth().onAuthStateChanged(user => {
            if (user != null) {
                navigation.navigate('Chat', {
                    navigation: navigation
                })
            }
        })
        setLoading(false);
    }

    useEffect(() => {
        authChanged();
    }, [])


    const sendResetPassword = async () => {
        if (email.trim() != "") {
            const { ok, mensaje } = await resetPassword(email)
            if (ok) {
                toast.show({
                    title: "Enviado",
                    status: "success",
                    description: "Se ha enviado un correo para restablecer la contraseña.",
                })
            } else {
                toast.show({
                    title: "Error",
                    status: "error",
                    description: mensaje,
                })
            }
        } else {
            toast.show({
                title: "Error",
                status: "error",
                description: "Por favor ingrese un Email.",
            })
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }


    return (
        <Box flex={1} bg="dark.100" alignItems="center" >
            <VStack flex={10}>
                <Center flex={1}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        alt="Logo"
                    />
                    <Input
                        bgColor="white"
                        placeholder="Email"
                        w="100%"
                        onChangeText={(value) => { setEmail(value) }}
                        my={5}
                    />
                    <Input
                        bgColor="white"
                        placeholder="Contraseña"
                        w="100%"
                        type="password"
                        onChangeText={(value) => { setPassword(value) }}
                        my={5}
                    />
                    <Button my={5} w="100%" onPress={handleLogin}>Ingresar</Button>

                    <Link
                        _text={{
                            color: "blue.400",
                        }}
                        onPress={() => navigation.navigate('Registro', {
                            navigation: navigation
                        })}
                    >
                        Registrarse
                    </Link>
                    <Link
                        _text={{
                            color: "blue.400",
                        }}
                        onPress={sendResetPassword}
                        mt={5}
                    >
                        Olvide mi contraseña
                    </Link>
                </Center>
            </VStack>
            <FooterNav navigation={navigation} />
        </Box >
    )
}
const styles = StyleSheet.create({

    logo: {
        width: 300,
        height: 270,
        marginTop: 70,
    },
});
