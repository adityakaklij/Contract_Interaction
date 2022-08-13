import React from 'react'
import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import { useState } from 'react';
import {Buffer} from 'buffer'
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

function GetNFT() {
  // async function main() {
  //   const args = minimist(process.argv.slice(2));
  //   const token = args.token;

  //   const storage = new Web3Storage({ token })
  //   const file = ''

  //   const cid = await storage.put(file);
  // } 

  function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzQWE1YWU1OURBOTdBMkI5RWVEMzlmNkMwNUNGRjY2MzZGYkZjQjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM3MTEwNzQ2MDgsIm5hbWUiOiJ0ZXN0MSJ9.v6jutAJDKwzj3j6LQqGPr_N9Pu8ha8Ol7vZ0RPHaBK0'
  }

  function makeStorageClient () {
    return new Web3Storage ({token : getAccessToken,})
  }

  // function getFiles() {
  //   const fileInput = document.querySelectorAll('input[type=""file]')
  //   return fileInput.files;
  // }

  // function makeFileOpjects() {
  //   const obj = { hello : 'world'}
  //   const blob = new Blob([JSON.stringify(obj)], {type:'application/json'})

  //   const files = [
  //     new File(['contents-of-file-1'], 'plain-utf8.txt'),
  //     new File([blob], 'hello.json')
  //   ]

  //   return files;
  // }

  async function storeFiles(x){
    const client = makeStorageClient();
    const cid = await client.put(x)
    // const cid = await client.put('./img.png')
    console.log("CID is :- ", cid);
    return cid;
  }

  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);

  // const changeHandler =async  (event) =>{
  //   setSelectedFile(event.target.files[0]);
	// 	setIsFilePicked(true);
  //   // await console.log(selectedFile);
  // }

  // const handleSubmission = (e) =>{
  //   console.log(selectedFile.size)
  //   const formData = new FormData();
  //   formData.append('File', selectedFile);
  //   storeFiles(formData);
  // }
const [urlArr, setUrlArr] = useState([])
const [file, setFile] = useState(null)

  const onSubmit = async (e) =>{
    e.preventDefault()
    console.log("On submit")
    try {
        const client = makeStorageClient();
        const cid = await client.put(file)

        // const created = await client.add(file)
        const url = `https://ipfs.infura.io/ipfs/`
        console.log(cid)
        setUrlArr(prev => [...prev , url])
    } catch (error) {
      window.alert(error)
    }
  }

const captureFile = (event)=> {
    console.log("Capture file")

    
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data)
    
    reader.onload = () => {
      // setFile(data)
      setFile(Buffer(reader.result))
      console.log(Buffer(reader.result))
      console.log(file)
    }
    event.preventDefault();
  }

  return (

    <>
    {/* <button onClick={storeFiles}>Upload File</button> */}

    {/* <input type="file" name="file" onChange={changeHandler} accept='image/png, image/jpeg' />
    <button onClick={handleSubmission}>Submi Img</button> */}

    <h3>Upload Image</h3>
    <form onSubmit={onSubmit}>
      <input type="file" name='data' onChange={captureFile} />
      <input type="submit" />
    </form>
    </>
  )
}

export default GetNFT