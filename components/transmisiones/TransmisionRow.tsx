import { Text as NBText, HStack, Image, VStack, Box } from 'native-base'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import Transmision from '../../interfaces/Transmision';
import { REACT_APP_API_URL as url, IMAGES_URL as urlImages } from "@env"

interface Props {
    transmision: Transmision,
    navigation: any
}

export const TransmisionRow = ({ transmision, navigation }: Props) => {
    const generica = 'http://www.fm891.com.ar/wp-content/uploads/2018/04/generica4-690x302.jpg';
    return (

        <Pressable
            onPress={() => {
                console.log(transmision);
                navigation.navigate('Transmision', {
                    transmision: transmision,
                    navigation: navigation
                });
            }}
        >
            <HStack width="100%" height="90" bgColor='light.900' p='5' borderRadius="md" my='2'   >
                <Image
                    source={{
                        uri: urlImages + transmision.imagen,
                    }}
                    style={styles.imagen}
                    alt=" "
                />
                <VStack ml='3' pr='8'>
                    <NBText numberOfLines={1} style={styles.texto} fontSize="20" fontWeight="bold">{transmision.titulo}</NBText>
                    <NBText numberOfLines={1} style={styles.texto} fontSize="15" fontWeight="bold">{transmision.descripcion}</NBText>
                </VStack>
            </HStack>
        </Pressable>

    )
}
const styles = StyleSheet.create({
    imagen: {
        width: 50,
        height: 50,
    },
    texto: {
        color: 'white'
    }
});