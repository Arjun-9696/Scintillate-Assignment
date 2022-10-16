import { Box, Button, Center, Heading, Image, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loading from '../Components/Loading';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import "./PeoplePage.css"
import { saveLocalData } from '../Utils/localStorage';
import Tom from "../Icons/tom.png"
const Favorite = () => {
    const [favoriteData, setFavoriteData] = useState([])
    const [isActive, setIsActive] = useState(false)

    const navigate = useNavigate()

    const handlePeople = (item) => {
        navigate("/movienames");
        saveLocalData('item', JSON.stringify(item))
    }
    useEffect(() => {
        setFavoriteData(JSON.parse(localStorage.getItem('favorites')))
        if (favoriteData === null) {
            setIsActive(true)
        }
    }, [favoriteData])
    const removeFavorite = (item) => {
        let data = JSON.parse(localStorage.getItem("favorites"));
        data = data.filter((i) => i.name !== item.name);
        localStorage.setItem("favorites", JSON.stringify(data));
        if (data?.length === 0) {
            navigate("/")
            // setFavoriteData(null)

            localStorage.removeItem("favorites");
        }
    }

    console.log('favoriteData:', favoriteData)
    return (
        <Box marginTop="50px">

            {isActive ? (<Box><Center display="flex" ><Image src={Tom} /><Center position="absolute" top="80%"><Heading size="md" color="gray" >Nothing to show It's Empty</Heading></Center></Center></Box>) : (null)}
            {favoriteData?.length === 0 ? (<Loading />) : (
                <Box>
                    {!isActive ? (<Center><Heading>Lists of all your favorite Characters</Heading></Center>) : (null)}


                    <FavoriteWrapper className="movie_div">
                        {favoriteData?.map((item) => {
                            return (
                                <Box key={item.name} className="movie_box">
                                    <Box onClick={() => handlePeople(item)} >
                                        <Image padding="20px" src='https://picsum.photos/300/300' alt='Dan Abramov' />
                                        <Box marginLeft="30px">
                                            <Heading size="sm">Name : {item.name}</Heading>
                                            <Heading size="sm">Eye Color : {item.eye_color}</Heading>
                                            <Heading size="sm">Hair Color : {item.hair_color}</Heading>
                                            <Heading size="sm">Gender : {item.gender}</Heading>
                                            <Heading size="sm">Height : {item.height}</Heading>
                                            <Heading size="sm">Mass : {item.mass}</Heading>
                                            <Heading size="sm">Skin Color : {item.skin_color}</Heading>
                                        </Box>
                                    </Box>
                                    <Button width="82%" margin="20px" _hover={{
                                        textDecoration: 'none',
                                        bg: "#0096FF",
                                    }} onClick={() => removeFavorite(item)}>Remove</Button>
                                </Box>
                            )
                        })}</FavoriteWrapper>
                </Box>)}

        </Box>
    )
}

export default Favorite
const FavoriteWrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: 40px;
  padding: initial;
  margin: 2.5%;
  justify-content: center;
`;