// import { useState } from 'react';
import Swal from 'sweetalert2'
import useMetaMask from "./hooks/useMetaMask";

function NavBar(props) {

    const metamaskHook = useMetaMask()

  return (
    <>
       <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
       <div class="container-fluid">
                <a class="navbar-brand" href="#">RobotPuckNFT</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mynavbar">
                <ul class="navbar-nav me-auto">
                    {/* <li class="nav-item">
                    <a class="nav-link" href="#" >Link</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li> */}
                </ul>
                {/* {
                    metamaskHook.isWalletCon  ? (
                        <p>Connected</p>
                    ) : 
                    (
                        <button className="btn btn-danger">Not Connect</button>
                    )
                }
                     */}
                </div>
            </div>
        </nav>
    </>
  );
  
}

export default NavBar;
