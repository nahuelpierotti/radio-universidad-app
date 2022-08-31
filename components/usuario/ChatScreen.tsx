/*import React, { useEffect, useRef, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { Button, Heading, Input, Text, VStack, Box, ScrollView, Center, Divider, HStack } from 'native-base';
import signalr from 'react-native-signalr';
import { HubConnectionBuilder,HttpTransportType } from '@microsoft/signalr';
import { signUp, signOut } from '../../firebase/auth';
import { FooterNav } from '../FooterNav';
import { Programa } from '../../interfaces/Programa';
import { REACT_APP_API_URL as url } from "@env"
import { StyleSheet } from 'react-native';


interface Message {
    user: string,
    message: string
}

export const ChatScreen = ({ navigation }) => {

    const [currentUser, setCurrentUser] = useState({
        uid: '',
        email: '',
    })

    const [chat, setChat] = useState<Message[]>([]);

    const latestChat = useRef(null);

    const [input, setInput] = useState('')

    const [status, setStatus] = useState(true)

    const [current, setCurrent] = useState<Programa>({
        id: 0,
        nombre: 'Radio Universidad FM 89.1',
        imagen: '',
        descripcion: '',
        staff: '',
        horarios: [],
        transmisions: [],
        liked:false
    })

    const getCurrentPrograma = () => {
        fetch(url + 'api/programas/current')
            .then(response => response.json())
            .then(data => setCurrent(data))
            .catch(err => console.error(err.message));
    }


    const authChanged = () => {
        console.log("VERIFICO DESDE EL CHAT")
        auth().onAuthStateChanged(user => {
            if (user == null) {
                navigation.navigate('Login', {
                    navigation: navigation
                })
            } else {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                })
            }
        })
    }

    const getChatStatus = () => {
        fetch(url + 'api/chat/status')
            .then(res => res.json())
            .then(data => {
                const { ok, messages, item } = data;
                if (item) {
                    setStatus(true)
                } else {
                    setStatus(false)
                }
            })
    }


    useEffect(() => {
        authChanged();
        getCurrentPrograma();
        // if (!globalThis.document) {
        //   (globalThis.document as any) = undefined;
        // }

        const connection = new HubConnectionBuilder()
            .withUrl(url + 'hubs/chat', {
                withCredentials: false,
               // skipNegotiation: true,
                //transport:HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

        getChatStatus();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveMessage', message => {
                    setChat(chat => [...chat, { user: message.user, message: message.message }]);
                });

                //Escuchando evento para cerrar el chat
                connection.on('CloseChat', () => {
                    getChatStatus();
                });

                //Escuchando evento para limpiar el chat
                connection.on('CleanChat', () => {
                    setChat(chat => []);
                });


            })
            .catch(e => console.log('Connection failed: ', e));

        return () => {
            setChat([]);
        };

    }, [])

    const sendMessage = async () => {
        const chatMessage = {
            user: currentUser.email.split('@')[0],
            message: input
        };

        if (input.trim() !== '') {
            setInput('');
            try {
                await fetch(url + 'api/chat/messages', {
                    method: 'POST',
                    body: JSON.stringify(chatMessage),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                });
            }
            catch (e) {
                console.log('Sending message failed.', e);
            }
        }
    }

    const handleSignOut = () => {
        signOut();
        navigation.navigate('Login', {
            navigation: navigation
        })
    }

    if (status) {
        return (
            <Box flex={1} bg="dark.100" alignItems="center" >
                <VStack flex={10}>
                    <HStack mt='2'>
                        <VStack>
                            <Heading style={styles.titulo} isTruncated fontSize='20' w='170' mt='5' color='white'>Sala de chat</Heading>
                            <Heading  isTruncated fontSize='15' w='170' mt='5' color='white'>{current.nombre}</Heading>
                        </VStack>
                        <Button
                            mt='7'
                            ml='20'
                            colorScheme="secondary"
                            onPress={() => handleSignOut()}
                            h='35'
                        >
                            Cerrar sesion
                        </Button>
                    </HStack>
                    <ScrollView>
                        <Divider my='5' color='white' />
                        <VStack >
                            {chat.map((c, index) => {
                                return (
                                    <>
                                        <Text textAlign='left' color="white" key={index}><Text fontWeight='bold' color="blue"> {c.user}:</Text> {c.message}</Text>
                                    </>
                                )
                            })}
                        </VStack>

                    </ScrollView>
                    <HStack width='350' my={5}>
                        <Input
                            bgColor="white"
                            w="80%"
                            onChangeText={(text) => setInput(text)}
                            value={input}
                        />
                        <Button
                            onPress={() => sendMessage()}
                            w="20%"
                        >
                            Enviar
                        </Button>
                    </HStack>
                </VStack>
                <FooterNav navigation={navigation} />
            </Box >
        )
    } else {
        return (
            <Box flex={1} bg="dark.100" alignItems="center" >
                <VStack flex={10}>
                    <HStack mt='5'>
                        <Heading fontSize='40' color='white'>Chat</Heading>
                        <Button
                            ml='180'
                            colorScheme="secondary"
                            onPress={() => handleSignOut()}
                        >
                            Cerrar sesion
                        </Button>
                    </HStack>
                    <Divider my='5' color='white' />
                    <Heading textAlign='center' fontSize='30' color='white'>Chat Cerrado</Heading>
                </VStack>
                <FooterNav navigation={navigation} />
            </Box >)
    }

}

const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        fontFamily: 'Encode Sans'
    },

});
*/
import React from 'react';
import { Text, View } from 'react-native';

export const ChatScreen = () => {
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
export default ChatScreen;