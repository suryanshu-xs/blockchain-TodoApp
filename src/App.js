import './App.css';
import { ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react'
import { address, ABI } from './Smart_Contracts/todoAppContractInfo';
import 'react-circular-progressbar/dist/styles.css';
import BottomTabs from './Components/SubComponents/Tabs';
import SimpleSnackbar from './Components/SubComponents/SnackBar';
import { Button } from '@mui/material';
const TodoContext = createContext()

const App = () => {

  const [ethersObj, setEthersObj] = useState({
    provider: null,
    signer: null,
    currentAccount: null
  })
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    messgae: ''
  })
  const [activeGroup, setActiveGroup] = useState(null)
  const [contractObj, setContractObj] = useState(null)
  const [todoArr, setTodoArr] = useState([])
  const [value, setValue] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const connectWallet = async () => {
    try {
      const providerObj = new ethers.providers.Web3Provider(window.ethereum)

      const currentAccount = await providerObj.send("eth_requestAccounts", [])

      const signerObj = providerObj.getSigner()


      setEthersObj({ currentAccount: currentAccount[0], provider: providerObj, signer: signerObj })
    } catch (error) {
      alert('Please allow your metamask wallet to be connected.')
    }
  }


  useEffect(() => {
    if (isProcessing) {
      contractObj.on('Message', (messgae, event) => {
        setIsProcessing(false)
        fetchTodos()
        setSnackbarProps({
          open: true,
          messgae: messgae
        })
      })
    }
  }, [isProcessing])

  useEffect(() => {
    if (ethersObj.provider) {
      setContractObj(new ethers.Contract(address, ABI, ethersObj.provider))

    }

  }, [ethersObj.provider])


  useEffect(async () => {
    if (window.ethereum) {
      connectWallet()
    }
  }, [])

  const fetchTodos = async () => {
    try {
      if (contractObj) {
        const res = await contractObj.getTodos(ethersObj.currentAccount)
        setTodoArr(res)

        if (activeGroup) {
          handleActiveGroupChange(activeGroup.name, res)
        }
      }

    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {

    fetchTodos()

  }, [contractObj])

  const handleActiveGroupChange = (groupName, arr) => {
    let temp = []
    arr.map((todoItem) => {

      if (todoItem.group == groupName) {
        temp.push(todoItem)
      }
    })
    setActiveGroup({
      name: groupName,
      data: temp
    })
    setValue(0)

  }



  return (
    <div className="App">

      {
        window.ethereum ? <TodoContext.Provider value={[todoArr, activeGroup, handleActiveGroupChange, ethersObj, contractObj, setIsProcessing, isProcessing, setSnackbarProps]}>
          <div className='home_wrapper' >

            <div className='todo_app' >

              <BottomTabs value={value} setValue={setValue} />


            </div>
            <SimpleSnackbar snackbarProps={snackbarProps} setSnackbarProps={setSnackbarProps} />

          </div>
        </TodoContext.Provider> : <div className='noMetamask' >
          <img src="./metamask.png" alt="" className='noMetamask_img' width={200} />
          <h1>Please Install Metamask To Continue.</h1>

          <p className='install_info' > Metamask is a Crypto Wallet and a Gateway to the Blockchain Apps. </p>

          <Button variant='contained' className='installButton' onClick={() => window.location.href = 'https://metamask.io/'}  > Install</Button>

        </div>
      }

    </div>
  );
}

export default App;
export { TodoContext }
