import React from 'react'
import { useState } from 'react'
import {NFTStorage} from 'nft.storage'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { ethers } from 'ethers'
import { ABI, contractAddress } from '../constants/data'

const APIKEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..0N-3jYVHOy1etZJxQ9jSm_Pk34h9RVmTpSSO2H_XnX0'

function Harmony() {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(contractAddress,ABI,signer)


  const [uploadFile ,setUploadFile] = useState()
  const [metaDataURL, setMetaDataURl] = useState()
  const [imageView, setImageView] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [tweetData, setTweetData]= useState()
  const {account} = useContext(AppContext)

  const uploadNFTContent = async(inputFile)  =>{
    const nftStorage = new NFTStorage({token: APIKEY,})

    try {
        const metaData = await nftStorage.store({
            name:account,
            description: tweetData,
            image:inputFile
        });

        setMetaDataURl(getIPFSGatewayURL(metaData.url));
        console.log("Metadata:- ", metaData);
        previewNFT(metaData)
        return metaData
    } catch (error) {
        alert(error)
    }
  }
  const getIPFSGatewayURL = (ipfsURL)=>{
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
}
const previewNFT = (metaData) =>{
    let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);;
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));

 
}
  const handleFileUpload= async(event) =>{
    event.preventDefault()
    setUploadFile(event.target.files[0])
  }

  const mintNFTToken = async(event , uploadedFile) =>{
    event.preventDefault()
    const metadata = await uploadNFTContent(uploadFile)
    
    console.log("Image View:- ",imageView )
    // const createTweet = await contractInstance.createTweet(metaDataURL);
    // await createTweet.wait()
    // window.alert("Tweet created :)")
    // metaDataURL
    //2. Mint a NFT token on Harmony
    // const mintNFTTx = await sendTxToHarmony(metaData);
  }
  ////////////////////
  ////////////////////
  //Contract Integration
  

  
    return (
    <>
        <div className='MintNFT'>
          <form>
              <h3>Mint your NFT on Harmony & Filecoin/IPFS</h3>
              <input type="file" onChange={handleFileUpload}></input>
              {/* <button onClick={e=>mintNFTToken(e, uploadedFile)}>Mint NFT</button> */}
              <button onClick={mintNFTToken}>Mint NFT</button>
              <input type="text" placeholder='Enter Your tweet' onChange={(e)=>{setTweetData(e.target.value)}}/>
          </form>
      </div>
    </>
  )
}

export default Harmony