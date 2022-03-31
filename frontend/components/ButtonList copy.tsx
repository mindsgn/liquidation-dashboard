import React from 'react'
import Image from 'next/image'
import { networkList } from '../constants'
import { selection } from '../interface'

export const Button = ({type}:{type?:string}) => {
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
    <>
      <button 
        className="button-selection"
        onClick={openList}>
        <>
          {
            selection.icon ?
            <Image
              alt="crypto logo"
              src={selection.icon}
              width={20}
              height={20}/>
              :
              undefined
          }
        </>
        <>
          {selection.network}
        </>
      </button> 
        <>
          {
            show ?
            <div className="list">
              {
                networkList.map((item: any) => {
                  return(
                    <div
                      key={item.network}
                      className='list-items'
                      onClick={() => makeSelection(item.icon, item.network)}>
                      <div className=''>
                        <Image
                          alt="crypto logo"
                          src={item.icon}
                          width={20}
                          height={20}
                          />
                      </div>
                      <div>
                        {item.network}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            :
            undefined
          }
        </>
    </>
  )
}