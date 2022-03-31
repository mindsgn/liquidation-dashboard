import React from 'react'
import { networkList } from '../constants'
import { selection } from '../interface'
import { Select, Box } from '@chakra-ui/react'

export const NetworkSelection = ({type}:{type?:string}) => {
  const [ selection, setSelection ] =  React.useState<selection>({network: "select source", icon: undefined});
  const [ show, setShow ] =  React.useState<boolean>(false);

  const openList = () => {
    setShow(!show);
  } 

  const makeSelection = (icon: string, network: string) => {
    setSelection({
      icon: icon,
      network: network,
      type: type
    })
    openList();
  }

  return (
    <Box
      min-width='200px'
      margin='10px'>
      <Select placeholder='Select network'>
        {
            networkList.map((item: any) => {
              return(
                <option
                  key={item.network}
                  >  
                    {item.network}
                  </option>
              )
            })
        }
      </Select>
    </Box>
  )
}