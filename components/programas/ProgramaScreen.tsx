/*import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Text, Box, Center, ScrollView, VStack, Heading, Image, Divider, HStack } from 'native-base';
import { FooterNav } from '../FooterNav';
import { Programa } from '../../interfaces/Programa';
import { TransmisionRow } from '../transmisiones/TransmisionRow';
import { REACT_APP_API_URL as url, IMAGES_URL as urlImages } from "@env"

interface Staff {
    'id': number,
    'nombre': string,
    'ocupacion': string,

}

export const ProgramaScreen = (props) => {
    const programa: Programa = props.route.params.programa;
    const navigation = props.navigation;
    const [ocupaciones, setOcupaciones] = useState<String[]>([]);

    const getOcupaciones = (staff: Staff[]) => {
        let aux = staff.map(e => e.ocupacion);
        setOcupaciones(aux.filter((item, index) => {
            return aux.indexOf(item) === index
        }))
    }

    const capitalize = (texto: String) => {
        return texto.split(' ').map(e => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()).join(' ');
    }

   
    return (
        <Box flex={1} bg="dark.100" alignItems="center" >
            <VStack flex={10}>
                <ScrollView>
                    <Center width='350' my={5}>
                        <Heading fontSize='40' style={styles.titulo} color='white'>{programa.nombre}</Heading>
                        <Image
                            source={{
                                uri: urlImages + programa.imagen
                            }}
                            alt="Transmision"
                            style={styles.imagen}
                            my='5'
                            borderRadius='5'
                        />
                        <Divider my="5" />
                        <Heading fontSize='20' style={styles.subtitulo} color='white' mb='2'>Descripción</Heading>
                        <Text color='white'>
                            {programa.descripcion}
                        </Text>
                        <Divider my="5" />
                        <Heading fontSize='20' color='white' mb='2' style={styles.subtitulo}>Staff</Heading>
                        <Text color='white'>
                            {programa.staff}
                        </Text>
                        <Divider my="5" />
                        <Heading fontSize='20' color='white' mb='2' style={styles.subtitulo}>Horarios</Heading>
                            {
                                programa.horarios.map(horario => {
                                    return <Text color='white'>{horario.horario}</Text>
                                })
                            }
                    </Center>
                </ScrollView>
            </VStack>
            <FooterNav navigation={navigation} />
        </Box >
    )
}
const styles = StyleSheet.create({
    imagen: {
        width: 300,
        height: 300,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white',
        fontFamily: 'Encode Sans'
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        fontFamily: 'Encode Sans'
    },
});
*/
import React from 'react';
import { Text, View } from 'react-native';

export const ProgramaScreen = () => {
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
export default ProgramaScreen;