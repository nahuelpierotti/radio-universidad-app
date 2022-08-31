import { Center, HStack, Pressable, Spinner, useToast } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native';
import Icon from  '@fortawesome/react-fontawesome'
import TrackPlayer, { Capability, State, Track, TrackType, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { Loading } from './Loading';
import { Programa } from '../interfaces/Programa';

interface Player {
    pause: boolean,
    volume: number
}
const logo = require('../assets/images/logo.png');
const logoVertical = require('../assets/images/logo-vertical.png');


const type: TrackType = TrackType.HLS;

const track: Track[] = [
    {
        url: 'https://s8.stweb.tv/unlam/radio/playlist.m3u8',
        title: 'Radio Universidad FM 89.1',
        artist: 'UNLaM',
        artwork: logoVertical,
        type: type
    }
]

TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [Capability.Play, Capability.Pause],
    compactCapabilities: [Capability.Play, Capability.Pause],
});

interface Props {
    current: Programa,
    setCurrent: (programa: Programa) => void,
    user: {
        uid: string,
        email: string,
    },
    navigation: any,
}
const events = [
    Event.PlaybackState
];


export const Player = ({ current, setCurrent, user, navigation, }: Props) => {

    const [player, setPlayer] = useState<Player>({ pause: false, volume: 0.5 });
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handlePause = async () => {
        if (player.pause) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
        const state = await TrackPlayer.getState();
        setPlayer({ ...player, pause: !player.pause })
    }

    const setUpTrackPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(track);
            TrackPlayer.play();
            const state: State = await TrackPlayer.getState();
            setPlayer({ ...player, pause: state == State.Paused })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setUpTrackPlayer();
        return () => {
            TrackPlayer.destroy();
        }
    }, [])

    const onRate = () => {
        if (user.uid == null || user.uid == "") {

            navigation.navigate('Login', {
                navigation: navigation
            })
        } else {
            console.log("UID:" + user.uid);
            const data = {
                idPrograma: current.id,
                idUsuario: user.uid
            }
            fetch(`${url}api/notification/fav`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setCurrent({ ...current, liked: !current.liked });
            }).catch(err => {
                console.log(err);
            })

        }
    }

    const handleInfo = () => {
        setLoading(true)
        fetch(`${url}api/programas/${current.id}`)
            .then(res => res.json())
            .then((data: Programa) => {
                setLoading(false);
                navigation.navigate('Programa', {
                    programa: data,
                    navigation: navigation
                })
            }).catch(err => {
                setLoading(false);
                toast.show({
                    title: "No se pudo mostrar la informacion.",
                    status: "info"
                });
            })
    }

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackState) {
            setPlayer({ ...player, pause: event.state === State.Paused })
        }

    });



    return (
        <HStack style={styles.reproductor} flex={1} bg="tertiary.700" alignItems="center" >
            <Pressable
                cursor="pointer"
                py="3"
                flex={1}
                onPress={handlePause}
                accessible={true}
                accessibilityLabel="Pausa"
            >
                <Center>
                    {
                        player.pause ?
                            <Icon name="play" size={40} color="white" />
                            :
                            <Icon name="pause" size={40} color="white" />
                    }
                </Center>
            </Pressable>
            <Pressable
                cursor="pointer"
                py="2"
                flex={1}
            >
                <Center>
                    {
                        current.liked ?
                            <Icon name="heart" size={40} color="white" onPress={onRate} />
                            :
                            <Icon name="heart-o" size={40} color="white" onPress={onRate} />
                    }
                </Center>
            </Pressable>
            {
                loading ?
                    <Pressable
                        cursor="pointer"
                        py="2"
                        flex={1}
                        onPress={handleInfo}
                    >
                        <Center>
                            <Spinner />
                        </Center>
                    </Pressable>
                    :
                    <Pressable
                        cursor="pointer"
                        py="2"
                        flex={1}
                        onPress={handleInfo}
                    >
                        <Center>
                            <Icon name="info" size={40} color="white" />
                        </Center>
                    </Pressable>
            }

        </HStack>
    )
}
const styles = StyleSheet.create({

    reproductor: {
        width: '90%',
        borderRadius: 50,
        marginBottom: 10
    }
});