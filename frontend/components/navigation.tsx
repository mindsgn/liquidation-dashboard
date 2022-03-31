import React from 'react';
import { Web3Button } from './web3button';
import { Heading } from '@chakra-ui/react';
import { useWeb3Context } from '../context';
import { Box } from '@chakra-ui/react'
import truncateEthAddress from 'truncate-eth-address'

export const Navigation = () => {
  const { address } = useWeb3Context();
  return(
      <nav className="header">
        <div>
          <Heading>cross chain</Heading>
        </div>
        <Box
          display='flex'
          flex-direction='row'
          justifyContent='space-evenly'
          alignItems='center'>
          {/*
            address && (
              <Heading
              as='h6' 
              isTruncated>{truncateEthAddress(address)}</Heading>
            )*/
          }
          <Web3Button />
        </Box>
      </nav>
  );
};
