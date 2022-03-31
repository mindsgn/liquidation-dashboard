import React from 'react'
import Image from 'next/image'
import { tokenList } from '../constants'
import { selection } from '../interface'
import { Select, Box } from '@chakra-ui/react'

export const TokenSelection = () => {
  return (
    <Box
      min-width='200px'
      margin='10px'>
      <Select placeholder='Select token'>
        {
            tokenList.map((item: any) => {
              return(
                <option
                  key={item.network}
                  value='option1'>
                    {item.network}
                  </option>
              )
            })
        }
      </Select>
    </Box>
  )
}