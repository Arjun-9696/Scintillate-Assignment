import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Heading,
} from '@chakra-ui/react';
import { CheckCircleIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Navbar = () => {
    const [favoriteActive, setFavoriteActive] = useState([])
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        setFavoriteActive(JSON.parse(localStorage.getItem('favorites')))
    }, [])
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow="rgba(0, 0, 0, 0.45) 0px 20px 15px -21px" >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <NavLink to="/"><Heading size='lg'>Scintillate Alliance</Heading></NavLink>
                    <Flex alignItems={'center'} marginRight={"10px"} >
                        {favoriteActive?.length === 0 ? (<Button rounded={'md'}
                            _hover={{
                                textDecoration: 'none',
                                bg: "#0096FF",
                            }} marginRight={"10px"} ><CheckCircleIcon alignItems={'center'} w={4} h={4} marginRight={"5px"} /> Favorites</Button>) : (<NavLink to="/favorite"><Button rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: "#0096FF",
                                }} marginRight={"10px"} ><CheckCircleIcon alignItems={'center'} w={4} h={4} marginRight={"5px"} /> Favorites</Button></NavLink>)}

                        <Stack direction={'row'} spacing={7}>
                            <Button width="10px" height="40px" onClick={toggleColorMode} _hover={{
                                textDecoration: 'none',
                                bg: "#0096FF",
                            }} rounded="100%">
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
export default Navbar