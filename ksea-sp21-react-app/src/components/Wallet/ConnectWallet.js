import './ConnectWallet.css';  

export default function ConnectWallet({
  children, connectWalShown
}) {
  const displayClass = connectWalShown? "connect-wallet" : "none";

  return (  
    <div className={displayClass}>
      <div className="connect-wallet-content">
        <p>Put your user id</p>
        {children}
      </div>
    </div>  
  );
}