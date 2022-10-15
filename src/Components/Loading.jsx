import { Box, Center, Heading, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
    return (
        <Box>
            <Center >
                <Box>
                    <Spinner
                        margin="auto"
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Box>
            </Center>
            <Center>
                <Heading size="md">Loading...</Heading>
            </Center>

        </Box>
    )
}

export default Loading