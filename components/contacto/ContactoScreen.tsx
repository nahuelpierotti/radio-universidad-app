/*import { Box, Button, Heading, HStack, VStack, ScrollView, Divider, Input, Text, Center, useToast, Link } from 'native-base';
import React, { useEffect, useState } from 'react'
import { FooterNav } from '../FooterNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { Mensaje } from '../../interfaces/Mensaje';
import { Linking } from 'react-native';
import { Loading } from '../Loading';
import { REACT_APP_API_URL as url } from "@env"
import { JsonHubProtocol } from '@microsoft/signalr';

export const ContactoScreen = ({ navigation }) => {

    const toast = useToast()
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({
        uid: '',
        email: '',
    })

    const [mensaje, setMensaje] = useState<Mensaje>({
        id: null,
        contenido: '',
        fechahora: '',
        idUsuarioRem: currentUser.uid,
        nombreUsuarioRem: currentUser.email.split('@')[0],
        idUsuarioDest: '1',
        nombreUsuarioDest: 'Radio Unlam'
    });

    const [mensajes, setMensajes] = useState<Mensaje[]>([]);

    const authChanged = () => {
        auth().onAuthStateChanged(user => {
            if (user == null) {
                setLoading(false)
            } else {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                })
                setInterval(()=>{
                    getConversacion(user.uid);
                },5000)
            }
        })
    }

    const getConversacion = (uid) => {
        fetch(`${url}api/mensajeria/${uid}/1`)
            .then(response => {
                return response.json()
            }
            )
            .then(data => setMensajes([...data.reverse()]))
            .catch(err => {
                console.log(err);
                setMensajes([]);
            })
            .finally(() => setLoading(false));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isMessageProvided = mensaje.contenido !== null && mensaje.contenido !== '';
        if (isMessageProvided) {

            const ahora = Date.now().toString();
           // setMensaje({ ...mensaje, idUsuarioRem: currentUser.uid, nombreUsuarioRem: currentUser.email.split('@')[0], fechahora: ahora });
            const bodyData =
            {
                contenido: mensaje.contenido,
                fechahora: ahora,
                idUsuarioRem:  currentUser.uid,
                idUsuarioDest: mensaje.idUsuarioDest,
                nombreUsuarioRem: currentUser.email.split('@')[0],
                nombreUsuarioDest: mensaje.nombreUsuarioDest,
            }

            const data: RequestInit = {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            console.log(data);
            fetch(url + 'api/mensajeria', data).then(response => {
                return response.json()
            })
                .then(data => {
                    setMensajes([ ...mensajes,data]);
                    toast.show({
                        title: "Mensaje enviado",
                        status: "success",
                    });
                    setMensaje({ ...mensaje, contenido: '' });
                })
                .catch(err => {
                    toast.show({
                        title: "Error al enviar el mensaje",
                        status: "error",
                    })
                });
        }
    }

    useEffect(() => {
        authChanged();
    }, [])

    const linkWhatsapp = () => {
        Linking.openURL(`https://api.whatsapp.com/send?phone=541138850891`)
    }
    const linkFacebook = () => {
        Linking.openURL(`https://www.facebook.com/fmradiouniversidad/`)
    }
    const linkYoutube = () => {
        Linking.openURL(`https://www.youtube.com/channel/UCltpkPzvwlV4s2IxkK1BddA`)
    }
    const linkInstagram = () => {
        Linking.openURL(`https://www.instagram.com/fmradiouniversidad`)
    }
    const linkSpotify = () => {
        Linking.openURL(`https://open.spotify.com/show/4ljAg9XxQWoxf75rmNxgxK`)
    }


    if (loading) {
        return <Loading />
    }

    if (currentUser.uid === '') {
        return (
            <Box flex={1} bg="dark.100" alignItems="center" >
                <VStack flex={10}>
                    <Center>
                        <HStack mt='5' space='10'>
                            <Icon name="whatsapp" size={40} color="white" onPress={linkWhatsapp} />
                            <Icon name="facebook" size={40} color="white" onPress={linkFacebook} />
                            <Icon name="youtube" size={40} color="white" onPress={linkYoutube} />
                            <Icon name="instagram" size={40} color="white" onPress={linkInstagram} />
                            <Icon name="spotify" size={40} color="white" onPress={linkSpotify} />
                        </HStack>
                    </Center>
                    <Box flex={1} bg="dark.100" alignItems="center" >
                        <VStack flex={10}>
                            <HStack mt='5'>
                                <Heading fontSize='20' my='5' w='350' color='white'>Mensaje directo con la radio</Heading>
                            </HStack>
                            <ScrollView>
                                <Divider color='white' />
                                <Button
                                    my='10'
                                    onPress={() => navigation.navigate('Login', {
                                        navigation: navigation
                                    })}
                                >
                                    Iniciar Sesion para mandar mensajes
                                </Button>
                            </ScrollView>

                        </VStack>
                    </Box >
                </VStack>
                <FooterNav navigation={navigation} />
            </Box >
        )
    }

    return (
        <Box flex={1} bg="dark.100" alignItems="center" >
            <VStack flex={10}>
                <Center>
                    <HStack mt='5' space='10'>
                        <Icon name="whatsapp" size={40} color="white" onPress={linkWhatsapp} />
                        <Icon name="facebook" size={40} color="white" onPress={linkFacebook} />
                        <Icon name="youtube" size={40} color="white" onPress={linkYoutube} />
                        <Icon name="instagram" size={40} color="white" onPress={linkInstagram} />
                        <Icon name="spotify" size={40} color="white" onPress={linkSpotify} />
                    </HStack>
                </Center>
                <Box flex={1} bg="dark.100" alignItems="center" >
                    <VStack flex={10}>
                        <HStack mt='5'>
                            <Heading fontSize='20' my='5' color='white'>Mensaje directo con la radio</Heading>
                        </HStack>
                        <ScrollView>
                            <Divider color='white' />
                            {mensajes.map(mensaje => {
                                return (
                                    <HStack
                                        key={mensaje.id}
                                        bgColor={mensaje.idUsuarioRem == '1' ? 'tertiary.600' : 'primary.900'}
                                        my='3'
                                        p='2'
                                        borderRadius='5'
                                        ml={mensaje.idUsuarioRem == '1' ? '0' : '20'}
                                        mr={mensaje.idUsuarioRem == '1' ? '20' : '0'}>
                                        <VStack>
                                            <Text fontSize='25' color='white'>{mensaje.contenido}</Text>
                                        </VStack>
                                    </HStack>
                                )
                            })
                            }
                        </ScrollView>
                        <HStack width='350' my={5}>
                            <Input
                                bgColor="white"
                                w="80%"
                                value={mensaje.contenido}
                                onChangeText={(text) => setMensaje({ ...mensaje, contenido: text })}
                            />
                            <Button
                                w="20%"
                                onPress={onSubmit}
                            >
                                Enviar
                            </Button>
                        </HStack>
                    </VStack>
                </Box >
            </VStack>
            <FooterNav navigation={navigation} />
        </Box >
    )
}
*/
import React from 'react';
import { Text, View } from 'react-native';

export const ContactoScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default ContactoScreen;