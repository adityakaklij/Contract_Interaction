import { ethers } from 'ethers'
import React from 'react'
import { useContext } from 'react'
import { ABI, contractAddress } from './constants/data'
import { AppContext } from './Context/AppContext'

function Page() {
  
  const {account} = useContext(AppContext)

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(contractAddress, ABI, provider);

  const getBtn = async() =>{
    const counter = await contractInstance.counter()
    console.log( "Counter is :- ",counter.toString())

    const tweetMapping = await contractInstance.tweetMapping(0)
    console.log("Mapping 0 :- " ,tweetMapping);

    const tweetStruct = await contractInstance.userArr(0);
    console.log("user Array:- ", tweetStruct);
  }

    return (
    <>
        <h1>From the Page</h1>
        <h2>Account from the pages {account}</h2>

        <button onClick={getBtn}>Get the Tweets</button>
    </>
  )
}

export default Page