import React from 'react'
import { useState } from 'react'
import {NFTStorage , Blob, File} from 'nft.storage'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { ethers } from 'ethers'
import { ABI, contractAddress } from '../constants/data'

const APIKEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDM5NDEyMjQxOSwibmFtZSI6IkRUd2l0dGVyLTEifQ.0N-3jYVHOy1etZJxQ9jSm_Pk34h9RVmTpSSO2H_XnX0'

function Harmony() {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(contractAddress,ABI,signer)


  const [uploadFile ,setUploadFile] = useState(null)
  const [metaDataURL, setMetaDataURl] = useState()
  const [imageView, setImageView] = useState();
  const [tweetData, setTweetData]= useState()
  const {account} = useContext(AppContext)

  const uploadNFTContent = async(inputFile)  =>{
    const nftStorage = new NFTStorage({token: APIKEY,})

    try {
      if(uploadFile === null){
        const someData = new Blob(["hello world"])
        const { car } = await NFTStorage.encodeBlob(someData)
        const metaData = await nftStorage.store({
          name:account,
          description: tweetData,
          image:someData// The link will end with /blob
          
      });
      setMetaDataURl(getIPFSGatewayURL(metaData.url));
      console.log("Metadata:- ", metaData);
      previewNFT(metaData)
      MetaTrx(metaData)
      console.log(metaData)
      return metaData
      }
      else{
        const metaData = await nftStorage.store({
          name:account,
          description: tweetData,
          image:inputFile
          
      });

      setMetaDataURl(getIPFSGatewayURL(metaData.url));
      console.log("Metadata:- ", metaData);
      previewNFT(metaData)
      MetaTrx(metaData)
      return metaData
      }
        
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
  
  const MetaTrx = async(metaData) =>{
    // It's working properly.
        const createtweet = await contractInstance.createTweet(getIPFSGatewayURL(metaData.url));
        await createtweet.wait()
        window.alert("Tweet created :)")
  }
  const mintNFTToken = async(event , uploadedFile) =>{
    event.preventDefault()
    const metadata = await uploadNFTContent(uploadFile)

  } 

  
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