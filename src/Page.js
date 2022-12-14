import { ethers } from 'ethers'
import React from 'react'
import { useState , useEffect} from 'react'
import { useContext } from 'react'
import { ABI, contractAddress } from './constants/data'
import { AppContext } from './Context/AppContext'
import Post from './Post'


function Page() {
  
  const {account} = useContext(AppContext)
  const [inputData , setInputData] = useState()
  const [posts , setPosts] = useState([])
  const [keyCounter, setKeyCounter] = useState()// Might not very useful.
  

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(contractAddress, ABI, provider);
  // Array to fethch all the tweets ans pushing in it.
  let arr1= [];

  const getBtn = async() =>{
    const counter = await contractInstance.counter()
    console.log( "Counter is :- ",counter.toString())
    setKeyCounter(counter.toString())

    const tweetMapping = await contractInstance.tweetMapping(0)
    console.log("Mapping 0 :- " ,tweetMapping);

    for(let i = 0; i < counter.toString(); i ++){

        const tweetStruct = await contractInstance.userArr(i);

        const tokenMetada = await fetch(tweetStruct.str)
        const jsonData = await tokenMetada.json()
        console.log("Tweet struct NAME:- ", jsonData.name)
        console.log("Tweet struct IMAGE:- ", jsonData.image)
        console.log("Tweet struct DESCRIPTION:- ", jsonData.description)
        arr1.push([jsonData.name ,jsonData.description])

        // arr1.push(tweetStruct) // It's a old, directly fetching from the blockchain  

        // console.log("UseState posts",posts.str)
        // console.log( `User address ${i}:- ` , tweetStruct.userAddres.toString())
        // console.log(`User Array string ${i}:- `, tweetStruct.str);
    }
    setPosts(arr1.reverse());
    console.log("Arr1 is", arr1)

}
    const createTweet = async() =>{
        const signerInstance = new ethers.Contract(contractAddress, ABI, signer);
        const makeTweet = await signerInstance.createTweet(inputData);
        await makeTweet.wait()
        getBtn()

    }

    useEffect(() => {
            // getBtn()
    },[])

    


    return (
    <>
        <h1>From the Page</h1>
        <h2>Account from the pages {account}</h2>

        <button onClick={getBtn}>Get the Tweets</button>

        <input type= "text" placeholder='Enter Your tweet' onChange={(e)=>{setInputData(e.target.value)}}/>
        <button onClick={createTweet}>Make tweet</button>

        <br /><br />

        
        {posts.map(posts =>(
            <Post
            // key = {posts.str}
            // data1 = {posts.userAddres.toString()} // OLD retriving from the blockchain.
            // data2 = {posts.str} // OLD retriving from the blockchain.
            data1 = {posts[0]}
            data2 = {posts[1]}
            />

        ))}
    </>
  )
}

export default Page