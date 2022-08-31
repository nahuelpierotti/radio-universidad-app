/*import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Text, Box, NativeBaseProvider, Center, VStack, Input, Image, HStack, ScrollView, Heading } from 'native-base';
import { FooterNav } from '../FooterNav';
import { Player } from '../Player';
import Transmision from '../../interfaces/Transmision';
import { TransmisionRow } from './TransmisionRow';
import { Loading } from '../Loading';
import { REACT_APP_API_URL as  url} from "@env" 

export const TransmisionesScreen = ({ navigation }) => {

    const [transmisiones, setTransmisiones] = useState<Transmision[]>([]);
    const [loading, setLoading] = useState(true)

  

    const getTransmisiones = () => {
        console.log(url);
        fetch(url + 'api/transmisiones/')
            .then(response => response.json())
            .then(data => setTransmisiones(data))
            .catch(err => setTransmisiones([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getTransmisiones();
    }, [])


    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <Box flex={1} bg="dark.100" alignItems="center" >
            <VStack flex={10}>
                <Text color='white' textAlign='center' my='5' p='1' style={styles.titulo}>Transmisiones</Text>
                <ScrollView width='350' removeClippedSubviews >
                    {
                        transmisiones.length > 0 ?
                            transmisiones.map((transmision, index) => {
                                return (
                                    <TransmisionRow transmision={transmision} navigation={navigation} key={transmision.id} />
                                )
                            })
                            :
                            <Text color="white" textAlign="center" fontSize="25">No hay transmisiones</Text>
                    }
                </ScrollView >
            </VStack>
            <FooterNav navigation={navigation} />
        </Box >
    )
}
const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 30,
        color: 'white',
        fontFamily: 'Encode Sans'
    },

});
*/
import React from 'react';
import { Text, View } from 'react-native';

export const TransmisionesScreen = () => {
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
export default TransmisionesScreen;