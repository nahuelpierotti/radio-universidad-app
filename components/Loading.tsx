import { Box, Center, Heading, Spinner } from 'native-base'
import React from 'react'

export const Loading = () => {
    return (
        <Box flex={1}>
            <Center alignItems="center" bg="dark.100" flex={1}>
                <Spinner />
                <Heading color="white" fontSize="md" alignItems="center" >
                    Cargando
                </Heading>
            </Center>
        </Box>
    )
}
