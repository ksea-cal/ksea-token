import React, {useState} from 'react';
import './CheckIn.css';
import CheckInItem from './CheckInItem';
import EventDB from './../../SampleDB/EventDB';
import {useToast} from "@chakra-ui/react"

export default function CheckIn({onboardState}) {
  const [eventList, setEventList] = useState(EventDB);
  const toast = useToast()
  const toastIdRef = React.useRef()

  const currTime = new Date();
  const upcomingEvents = 
    eventList.filter(event => 
      event.dueDate.getTime() > currTime.getTime() &&
      event.completed === false
    )
  const completedEvents =
    eventList.filter(event => 
      event.completed === true
    )
  const missedEvents = 
    eventList.filter(event => 
      event.dueDate.getTime() <= currTime.getTime() &&
      event.completed === false
    )

  function handleSubmit(id, inputKey) {
    setEventList(
      eventList.map(event => 
        event.id === id && inputKey === event.secretKey ?
          {...event, completed: true}
          : event
      )
    )
    const event = eventList.filter(event => 
      event.id === id
    )[0]
    
    let alertText;
     if (inputKey === event.secretKey) {
      alertText = "Correct secret key!"
     } else if (inputKey === '') {
       alertText = "Please put a secret key!"
     } else {
      alertText = "Wrong secret key!"
     }
    toastIdRef.current = toast({ description: alertText })
  };

  const upcomingE = upcomingEvents.map(event => {
    return (
      <CheckInItem 
        key={event.id} 
        event={event}
        handleSubmit={handleSubmit}
      />
    )
  });

  const missedE = missedEvents.map(event => {
    return (
      <CheckInItem
        key={event.id} 
        event={event}
      />
    )
  });

  const completedE = completedEvents.map(event => {
    return (
      <CheckInItem
        key={event.id} 
        event={event}
      />
    )
  });

  return (
    <div>
      {!onboardState.address ?
        <h2>Please Connect Wallet</h2>
        :
        <div id="checkin">
          <div className="event-item">
            <h2>Upcoming 이벤트</h2>
            <div>
              {
                upcomingEvents.length === 0 ?
                <p>You have no upcoming events!</p>
                : upcomingE
              }
            </div>
          </div>

          <div className="event-item">
            <h2>참여한 이벤트</h2>
            <div>
              {
                completedEvents.length === 0 ?
                <p>You have no completed events!</p>
                : completedE
              }
            </div>
          </div>

          <div className="event-item">
            <h2>놓친 이벤트</h2>
            <div>
              {
                missedEvents.length === 0 ?
                <p>You have no missed events!</p>
                : missedE
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

