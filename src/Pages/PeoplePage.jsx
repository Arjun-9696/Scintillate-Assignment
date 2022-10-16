import { Box, Center, Heading, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./PeoplePage.css"
import styled from 'styled-components';
import Loading from '../Components/Loading';

const PeoplePage = () => {
    const [data, setData] = useState([]);
    const [filmData, setFilmData] = useState([]);
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('item')))
    }, [])

    useEffect(() => {
        var fetchAll = async (urls) => {
            const res = await Promise.all(urls && urls?.films.map(u => fetch(u)))
            const jsons = await Promise.all(res && res.map(r => r.json()))
            setFilmData(jsons)
        }
        fetchAll(data)


    }, [data])
    console.log("filmData", filmData.length)
    return (
        <Box marginTop="50px">
            <Center>
                <Box alignItems="center" borderBottom="2px solid gray">
                    <Image margin="auto" src='https://picsum.photos/100/100' alt='Dan Abramov' />
                    <Box textAlign="center">
                        <Heading size="md">Character Name : {data.name}</Heading>
                    </Box>
                </Box>
            </Center>

            <Center marginTop="30px"><Heading>Lists of all the Movies</Heading></Center>
            {filmData.length === 0 ? (<Loading />) : (<PeopleListWrapper className="movie_div">
                {filmData?.map((item) => {
                    return (
                        <Box key={item.name} className="movie_box" >
                            <Image padding="20px" src='https://picsum.photos/400/300' alt='Dan Abramov' />
                            <Box marginLeft="30px">
                                <Heading size="sm">Movie Name : {item.title}</Heading>
                                <Heading size="sm">Director : {item.director}</Heading>
                                <Heading size="sm">Producer : {item.producer}</Heading>
                                <Heading size="sm">Release Date : {item.release_date}</Heading>
                                <Heading paddingBottom="30px" size="sm">Episodes : {item.episode_id}</Heading>
                            </Box>
                        </Box>
                    )
                })}</PeopleListWrapper>)}

        </Box>
    )
}

export default PeoplePage
const PeopleListWrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
  grid-gap: 40px;
  padding: initial;
  margin: 2.5%;
  justify-content: center;
`;