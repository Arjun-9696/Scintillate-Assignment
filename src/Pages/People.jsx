import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Heading, Image, useToast } from '@chakra-ui/react';
import "./People.css"
import { saveLocalData } from '../Utils/localStorage';
import Loading from '../Components/Loading';
const People = () => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const toast = useToast()
    useEffect(() => {
        // setSearchParams({
        //     page
        // })
        axios({
            url: "https://swapi.dev/api/people",
            method: "GET",
            // params: {
            //     page
            // }
        })
            .then(res => {
                setData(res.data.results)

            })
            .catch(err => {

            })
    }, [])
    const navigate = useNavigate();
    const handlePeople = (item) => {
        navigate("/movienames");
        saveLocalData('item', JSON.stringify(item))
    }

    const addFavorite = (item,e) => {
        e.currentTarget.disabled = true;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let results = favorites.filter(i => item.name === i.name)
        if (results.length === 0) {
            favorites.push(item)
            localStorage.setItem('favorites', JSON.stringify(favorites))
            toast({
                title: 'Added to favorites.',
                position: 'top',
                description: "We've added your selection for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <Box marginTop="50px">
            {data.length === 0 ? (<Loading />) : (<PeopleListWrapper className="people_div">
                {data.map((item) => {
                    return (
                        <Box key={item.name} className="people_box">
                            <Box onClick={() => handlePeople(item)} >
                                <Image padding="20px" src='https://picsum.photos/300/300' alt='Dan Abramov' />
                                <Heading marginLeft="30px" size="sm">Name : {item.name}</Heading>
                                <Heading marginLeft="30px" justifyContent="space-between" size="sm">Eye Color : {item.eye_color}</Heading>
                                <Heading marginLeft="30px" justifyContent="space-between" size="sm">Hair Color : {item.hair_color}</Heading>
                                <Heading marginLeft="30px" justifyContent="space-between" size="sm">Gender : {item.gender}</Heading>
                                <Heading marginLeft="30px" justifyContent="space-between" size="sm">Height : {item.height}</Heading>
                                <Heading marginLeft="30px" justifyContent="space-between" size="sm">Mass : {item.mass}</Heading>
                                <Heading marginLeft="30px" justifyContent="space-between" size="sm">Skin Color : {item.skin_color}</Heading>
                            </Box>
                            <Button  width="82%" margin="20px" _hover={{
                                textDecoration: 'none',
                                bg: "#0096FF",
                            }} onClick={(e) => addFavorite(item,e) }>Add Favorite </Button>

                        </Box>
                    )
                })}</PeopleListWrapper>)}

        </Box>
    )
}

export default People
const PeopleListWrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: 40px;
  padding: initial;
  margin: 2.5%;
  justify-content: center;
`;