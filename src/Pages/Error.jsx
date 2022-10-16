import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorVideo from "../Icons/404error.mp4"

const Error = () => {
  const navigate = useNavigate()
  const handleErrorbtn=()=>{
    navigate("/")
  }
  return (
    <Box marginTop="50px">
      <Center>
        <Box>
          <video
            src={ErrorVideo}
            autoPlay
            playsInline
            muted
            loop
          ></video>
        </Box>
      </Center>
      <Center><Button _hover={{
        textDecoration: 'none',
        bg: "#0096FF",
      }} onClick={handleErrorbtn} ><ArrowBackIcon marginRight="15px" w={5} h={5} />Go to Home</Button></Center>
    </Box>
  )
}

export default Error