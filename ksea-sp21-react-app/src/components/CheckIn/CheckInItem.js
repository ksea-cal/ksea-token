import React, {useState} from 'react';
import './CheckInItem.css';
import Popup from './Popup';

export default function CheckInItem({event, handleSubmit}) {
  const [ popupShown, setPopupShown ] = useState(false);
  const [ inputKey, setInputKey ] = useState("");

  function showPopup() {
    setPopupShown(true);
  };
  function closePopup() {
    setPopupShown(false);
    setInputKey("");
  };
  function handleChange(e) {
    console.log(e.target.value)
    setInputKey(e.target.value);
  }
 
  return (
    <div className="item">
      <div className="check-in-item">
        <div className="check-in-info">
          <h3>{event.name}</h3>
          <p>{event.dueDate.toString()}</p>
        </div>
        {
          handleSubmit === undefined ?
          <div>
            <button onClick={showPopup} className="check-in-button">
              Details
            </button>
            <Popup 
              show={popupShown}
              close={closePopup}
              eventName={event.name}
            >
              {event.details}
            </Popup>
          </div>
          :
          <div>
            <button onClick={showPopup} className="check-in-button">
              Check In
            </button>
            <Popup 
              show={popupShown}
              submit={() => handleSubmit(event.id, inputKey)}
              close={closePopup}
            >
              <input
                type="text"
                value={inputKey}
                placeholder="Secret Key"
                onChange={handleChange}
              />
            </Popup>
          </div>
        }
      </div>
    </div>
  )
}