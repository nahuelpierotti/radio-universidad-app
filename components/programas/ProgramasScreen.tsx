/*import React, { useEffect, useState } from 'react'
import { Text, Box, NativeBaseProvider, Center, VStack, Input, Image, HStack, ScrollView, Heading, Divider } from 'native-base';
import { FooterNav } from '../FooterNav';
import { Programa } from '../../interfaces/Programa';
import { ProgramaRow } from './ProgramaRow';
import { Loading } from '../Loading';
import { REACT_APP_API_URL as  url} from "@env" 
import { StyleSheet } from 'react-native';

export const ProgramasScreen = ({ navigation }) => {

    const [programas, setProgramas] = useState<Programa[]>([]);
    const [loading, setLoading] = useState(true)

    const getProgramas = () => {
        fetch(url + 'api/programas/')
            .then(response => response.json())
            .then(data => setProgramas(data))
            .catch(err => setProgramas([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getProgramas();
        return () => {
            setProgramas([]);
        }
    }, [])

    if(loading){
        return(
            <Loading />
        )
    }

    return (
            <Box flex={1} bg="dark.100" alignItems="center" >
                <VStack flex={10}>
                    <Text  color='white' textAlign='center' my='5' p='1' style={styles.titulo} >Programas</Text>
                    <ScrollView width='350' removeClippedSubviews  >
                        {
                            programas.length>0
                            ?
                            programas.map((programa, index) => {
                                return (
                                    <ProgramaRow programa={programa} navigation={navigation} key={programa.id} />
                                )
                            })
                            :
                            <Text color="white" textAlign="center" fontSize="25">No hay programas</Text>
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

export const ProgramasScreen = () => {
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
export default ProgramasScreen;