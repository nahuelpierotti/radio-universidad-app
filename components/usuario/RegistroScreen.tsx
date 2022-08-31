import { Box, Center, Icon, Input, ScrollView, VStack, HStack, Button, Image, Heading, Link, InputGroup, useToast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { signIn, signUp } from '../../firebase/auth';
import { FooterNav } from '../FooterNav'
import { Alert, StyleSheet } from 'react-native';
import { Loading } from '../Loading';

export const RegistroScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (password === confirm) {
            if (password.trim() !== '' && email.trim() !== '') {
                setLoading(true);
                const { ok, mensaje } =  await signUp(email, password);
                if (ok) {
                    setLoading(false);
                    toast.show({
                        title: mensaje,
                        status: 'success',
                    });
                    navigation.navigate('Login', {
                        navigation: navigation
                    })
                } else {
                    setLoading(false);
                    toast.show({
                        title: "Error",
                        status: 'danger',
                        description: mensaje
                    });
                }
            } else {
                toast.show({
                    title: "Error",
                    status: "error",
                    description: "Complete todos los campos.",
                })
            }
        } else {
            toast.show({
                title: "Error",
                status: "error",
                description: "Las contraseñas no coinciden.",
            })
        }
    }



    const logo = require('../../assets/images/logo.png');

    if(loading) {
        return <Loading />
    }

    return (
        <Box flex={1} bg="dark.100" alignItems="center" >
            <VStack flex={10}>
                <Center flex={1}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        alt="Logo"
                        mb='10'
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
                    <Input
                        bgColor="white"
                        placeholder="Confirmar Contraseña"
                        w="100%"
                        type="password"
                        onChangeText={(value) => { setConfirm(value) }}
                        my={5}
                    />
                    <Button my={5} w="100%" onPress={handleRegister}>Confirmar</Button>
                    <Link
                        _text={{
                            color: "blue.400",
                        }}
                        onPress={() => navigation.navigate('Login', {
                            navigation: navigation
                        })}
                    >
                        Iniciar Sesion
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
        height: 80,
        marginTop: 70,
    },
});
