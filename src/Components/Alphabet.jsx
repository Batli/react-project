import React from 'react'
import { useGlobalContext } from './contextWrappers/globalContextwrapper';

const alphabet = [
    "",
    "#",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  
const Alphabet = () => {
    const {alpha, setAlpha} = useGlobalContext()
  return (
    <div>
        {
            alphabet.map((item,index)=>{
                return <button onClick={()=>setAlpha(item.toLowerCase())} key={index}>{item}</button>
            })
        }
    </div>
  )
}

export default Alphabet