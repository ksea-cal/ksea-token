import './Popup.css';  

export default function Popup({ show, children, submit, close, eventName }) {
  const displayClass = show? "popup-show" : "none";
  const submitDisplay = submit === undefined ? 
    "none" : null;

  return (  
    <div className={displayClass}>  
      <div className='popup-content'>  
        {
          submit === undefined ?
          <h2>{eventName}</h2>
          : <h2>Enter SECRET KEY</h2>
        }
        <div className="input-section">
          {children}
          <div>
            <button className={submitDisplay} onClick={submit}>
              Submit
            </button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      </div>  
    </div>  
  ); 
}