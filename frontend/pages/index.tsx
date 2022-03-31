import React from 'react'
import type { NextPage } from 'next'
import { Navigation, SwapUI } from '../components'
import { Box } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box 
      width='100vw'
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'>
      <Navigation />
      <Box>
        <SwapUI />
      </Box>
    </Box>
  );
};

export default Home
