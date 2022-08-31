/*import React, { useCallback, useEffect, useState } from 'react'
import Transmision from '../../interfaces/Transmision';
import { Button, StyleSheet } from 'react-native';
import { Text, Box, Center, Input, ScrollView, VStack, Heading, Image, Divider, View, HStack } from 'native-base';
import { FooterNav } from '../FooterNav';
import { youtube_parser } from '../../helpers/youtubeHelper';
import YoutubePlayer from 'react-native-youtube-iframe';
import { REACT_APP_API_URL as url, IMAGES_URL as urlImages } from "@env"
import TrackPlayer, { Capability, State, Event } from 'react-native-track-player';



export const TransmisionScreen = (props) => {
    const transmision: Transmision = props.route.params.transmision;
    const navigation = props.navigation;

    const youtubeId = youtube_parser(transmision.youtube);

    useEffect(() => {
        console.log(transmision);
        TrackPlayer.pause();
    }, [])

    return (
        <Box flex={1} bg="dark.100" alignItems="center" >
            <VStack flex={10}>
                <ScrollView>
                    <Center width='350' my={5}>
                        <Heading style={styles.titulo} color='white'>{transmision.titulo}</Heading>
                        <Image
                            source={{
                                uri: urlImages + transmision.imagen
                            }}
                            alt="Transmision"
                            style={styles.imagen}
                            my='5'
                            borderRadius='5'
                        />
                        <HStack space={3}>
                            {
                                transmision.listaTags.map(t => {
                                    return (
                                        <Box key={t.id} color='white' bg="primary.500" rounded="md" p='1'>{t.nombre}</Box>
                                    )
                                })
                            }
                        </HStack>
                        <Divider my="5" />
                        <Text color='white'>
                            {transmision.descripcion}
                        </Text>
                        <Divider my="5" />
                    </Center>

                    <YoutubePlayer
                        height={300}
                        play={true}
                        videoId={youtubeId}
                        webViewStyle={{ opacity: 0.99 }}
                    />


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
        fontSize: 25,
        marginTop: 30,
        color: 'white',
        fontFamily: 'Encode Sans'
    },
});
*/
import React from 'react';
import { Text, View } from 'react-native';

export const TransmisionScreen = () => {
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
export default TransmisionScreen;