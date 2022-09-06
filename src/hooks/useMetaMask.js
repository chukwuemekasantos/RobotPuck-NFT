import { useState, useEffect } from "react";

const useMetaMask = (p_connected,p_connectedAddr) => {

  const [connected, setConnected] = useState(false);
  const [connectedAddr, setconnectedAddr] = useState('');

  useEffect(() => {
    
    setConnected(p_connected)
    setconnectedAddr(p_connectedAddr)

  }, [connected,connectedAddr]);

  return { 'address': connectedAddr, 'isWalletCon': connected};
};

export default useMetaMask;