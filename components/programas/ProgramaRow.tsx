import { Text, HStack, Image, VStack, Box } from 'native-base'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import Transmision from '../../interfaces/Transmision';
import { Programa } from '../../interfaces/Programa';
import { REACT_APP_API_URL as  url,IMAGES_URL as urlImages} from "@env" 

import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    programa: Programa,
    navigation: any
}

export const ProgramaRow = ({ programa, navigation }: Props) => {
    const generica = 'http://www.fm891.com.ar/wp-content/uploads/2018/04/generica4-690x302.jpg';
    return (

        <Pressable
            onPress={() => {
                navigation.navigate('Programa', {
                    programa: programa,
                    navigation: navigation
                });
            }}
        >
            <HStack width="100%" height="90" bgColor='light.900' p='5' borderRadius="md" my='2'   >
                <Image
                    source={{
                        uri: urlImages + programa.imagen || generica
                    }}
                    alt="Transmision"
                    style={styles.imagen} />
                <VStack ml='3' w='200'>
                    <Text isTruncated style={styles.texto} fontSize="20" fontWeight="bold">{programa.nombre}</Text>
                    <Text isTruncated style={styles.texto} fontSize="15" fontWeight="bold">{programa.descripcion}</Text>
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