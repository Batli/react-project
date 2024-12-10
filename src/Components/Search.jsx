import React from 'react'
import { InputBase, styled } from '@mui/material'
import { useGlobalContext } from './contextWrappers/globalContextwrapper'

const InputSearchField = styled(InputBase)`
  background: #fdf5e6;
  border-radius: 30px;
  height: 40px;
  position: absolute;
  left: 1360px;
  top: 110px;
`

export const Search = () => {
  const { searchStr, setSearchStr} = useGlobalContext()
  return ( 
    <InputSearchField value={searchStr} onChange={(e)=>setSearchStr(e.target.value)}/>
  )
}