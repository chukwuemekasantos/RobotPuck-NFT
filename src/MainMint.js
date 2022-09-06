import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import useMetaMask from "./hooks/useMetaMask";

import RobotPuckNFT from './RobotPuckNFT.json';


function MainMint(props) {


    const contractAdd = "0x023da76E8E3d489C67a3e08F80d91EDcC1289A0F";

    const [mintAmount, setmintAmount] = useState(1);
    const [Connected, setConnected] = useState(false);
    const [accountAddr, setAccountAddr] = useState('');
    const [mintStatus, setMintStatus] = useState(false);
    const [signer, setSigner] = useState();

   async function mintNow()
   {
        const contract = new ethers.Contract(
            contractAdd,
            RobotPuckNFT.abi,
            signer
        );
        setMintStatus(true);
        document.getElementById("mintbtn").disabled = true;
        try{
            const response = await contract.mint(BigNumber.from(mintAmount),{
                value : ethers.utils.parseEther((0.02 * mintAmount).toString())
            });

        if(response.hash.length != 0) {
            Swal.fire({
                title: 'Cool!',
                text: 'Mining was succesful',
                icon: 'success',
                confirmButtonText: 'close'
              })

              setMintStatus(false);
              document.getElementById("mintbtn").disabled = false;
        }
            
        } catch (err){
            console.log(err);
        }
   }

    async function handleWallet()
    {
        if(window.ethereum){

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const addr = await signer.getAddress();

            if(addr.length === 0){
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to connect your metamask',
                    icon: 'error',
                    confirmButtonText: 'close'
                  })
            }
            setSigner(signer)
            setConnected(true)
        }else{

            Swal.fire({
                title: 'Error!',
                text: 'Connect your metamask',
                icon: 'error',
                confirmButtonText: 'close'
              })
        }
    }

   const  handleDecrement = () =>
    {
        if(mintAmount <= 1 ) return;
        setmintAmount(mintAmount - 1);
    }

    const  handleIncrement = () =>
    {
        if(mintAmount >= 3 ){
            Swal.fire({
                title: 'Error!',
                text: 'You can only mint 3 NFT',
                icon: 'error',
                confirmButtonText: 'close'
              })
        }
        setmintAmount(mintAmount + 1);
    }
    
    return (
        <div className="App">
        
            <div class="px-4 py-5 my-5 text-center" >
           
                <h1 class="display-5 fw-bold" style={{paddingTop : "200px"}}>RobotPuck NFT</h1>
                <div class="col-lg-6 mx-auto">
                    <p class="lead mb-4" style={{paddingTop : "5px"}}>it's 2022 can RobotPuckNFT save ukarine from russia war? Mint now to find out 😈</p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <div className="row">
                            <div className="col-md-10">
                                {Connected ? ( 
                                    <>
                                        <div class="input-group mb-3">
                                            <button class="btn btn-group-lg btn-success" type="button" onClick={handleDecrement}>-</button>
                                            <input type="text"  class="form-control" value={mintAmount} readonly />
                                            <button class="btn btn-group-lg btn-success " type="button" onClick={handleIncrement}>+</button>
                                        </div>

                                        <button class="btn btn-group-lg btn-danger" id="mintbtn" type="button" onClick={mintNow}> {mintStatus ? 'Minting...' : 'Mint Now'}  </button>
                                    </>
                                    ) : (

                                        <button class="btn btn-group-lg btn-danger " type="button" onClick={handleWallet}>Connect</button>
                                    )

                                }
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        <div className="moving-bg"></div>
      </div>
    );
  }
  
  export default MainMint;