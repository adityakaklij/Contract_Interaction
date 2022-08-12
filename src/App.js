import './App.css';
import {useEffect , useState} from "react"
import Page from './Page';
import { AppContext } from './Context/AppContext';

function App() {

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect( () =>{
    if(window.ethereum){
      setIsWalletInstalled(true);
    }
  }, []);

      const connectWallet = async() => {
        window.ethereum.request({ method:"eth_requestAccounts"})
        .then( (accounts) => {
          setAccount(accounts[0]);
        }).catch( (e) => {
          alert(e)
          console.log(account)
        })
        
      }

    if(account === null){
      return(
        <div className="App">{
          isWalletInstalled? (<button onClick={connectWallet}> Connect </button>) : (
            <p>Install Metamask Wallet</p>
          )
        }
        </div>
      )
    }
    else {

      return(
        <>
        <AppContext.Provider value={{account}}>
          <Page/>
          <p> Connected as : {account}</p>
          {console.log("Your address is",account)}
          </AppContext.Provider>
        </>
      )
    }



}
export default App;
