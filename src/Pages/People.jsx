import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, Center, Heading, Image, Tooltip, useToast } from '@chakra-ui/react';
import "./People.css"
import { saveLocalData } from '../Utils/localStorage';
import Loading from '../Components/Loading';

// import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
const People = () => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        setSearchParams({
            page
        })
        axios({
            url: "https://swapi.dev/api/people",
            method: "GET",
            params: {
                page
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log("err", err)
            })
    }, [page])


    const handlePeople = (item) => {
        navigate("/movienames");
        saveLocalData('item', JSON.stringify(item))
    }
    const addFavorite = (item, e) => {
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
    const pagesTotal = Math.ceil(data.count / 10);

    return (
        <Box marginTop="50px" paddingBottom="100px">
            <Center><Heading>Lists of all the Characters</Heading></Center>
            {data.length === 0 ? (<Loading />) : (<PeopleListWrapper className="people_div">
                {data.results.map((item) => {
                    return (
                        <Box key={item.name} className="people_box">
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
                            }} onClick={(e) => addFavorite(item, e)}><AddIcon alignItems={'center'} w={3} h={3} marginRight={"5px"} /> Favorite </Button>

                        </Box>
                    )
                })}</PeopleListWrapper>)}
            <Center>
                <ButtonGroup marginTop="50px">
                    <Tooltip hasArrow label='First Page' bg='#0096FF' color='black'>
                        <Button disabled={page === 1} onClick={() => setPage(1)} _hover={{
                            textDecoration: 'none',
                            bg: "#0096FF",
                        }} ><ArrowLeftIcon /></Button>
                    </Tooltip>
                    <Button disabled={page === 1} onClick={() => setPage(page - 1)} _hover={{
                        textDecoration: 'none',
                        bg: "#0096FF",
                    }} ><ChevronLeftIcon w={8} h={8} />Prev</Button>
                    <Tooltip hasArrow label='Current Page' bg='gray.300' color='black'>
                        <Button bg="#0096FF" >{page}</Button>
                    </Tooltip>
                    <Button disabled={page === pagesTotal} onClick={() => setPage(page + 1)} _hover={{
                        textDecoration: 'none',
                        bg: "#0096FF",
                    }} >Next<ChevronRightIcon w={8} h={8} textAlign="center" /></Button>
                    <Tooltip hasArrow label='Last Page' bg='#0096FF' color='black'>
                        <Button disabled={page === pagesTotal} onClick={() => setPage(pagesTotal)} _hover={{
                            textDecoration: 'none',
                            bg: "#0096FF",
                        }} ><ArrowRightIcon /></Button>
                    </Tooltip>
                </ButtonGroup>
            </Center>
        </Box>
    )
}

export default People
const PeopleListWrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
  grid-gap: 40px;
  padding: initial;
  margin: 2.5%;
  justify-content: center;
`;