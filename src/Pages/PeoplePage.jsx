import { Box, Heading, Image } from '@chakra-ui/react';
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
            {filmData.length === 0 ? (<Loading />) : (<PeopleListWrapper className="movie_div">
                {filmData?.map((item) => {
                    return (
                        <Box key={item.name} className="movie_box" >
                            <Image padding="20px" src='https://picsum.photos/400/300' alt='Dan Abramov' />
                            <Heading marginLeft="30px" size="sm">Name : {item.title}</Heading>
                            <Heading marginLeft="30px" justifyContent="space-between" size="sm">Director : {item.director}</Heading>
                            <Heading marginLeft="30px" justifyContent="space-between" size="sm">Producer : {item.producer}</Heading>
                            <Heading marginLeft="30px" justifyContent="space-between" size="sm">Release Date : {item.release_date}</Heading>
                            <Heading marginLeft="30px" paddingBottom="30px" justifyContent="space-between" size="sm">Episodes : {item.episode_id}</Heading>
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