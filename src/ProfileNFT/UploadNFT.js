import React from 'react'
import { ethers } from "ethers"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useState } from 'react'
//Imported VotingAddress , VotingADdressAbi

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

// const fetchContract = (signerOrProvider) =>{
//     new ethers.Contract(address, abi, signer)
// }

function UploadNFT() {
  
  const uploadToIPFS = async(file) =>{
    try {
        const added = client.add({content:file});
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        return url;
        
    } catch (error) {
        window.alert(error)
    }
  }
cosnt [fileUrl, setFileUrl] = useState(null);
const [formInput, setFormInput]= useState({
    name:"",
    address:"",
    position:","
})
  const allowedVoters = () => {

  }


    return (
    <>
    
    </>
  )
}

export default UploadNFT