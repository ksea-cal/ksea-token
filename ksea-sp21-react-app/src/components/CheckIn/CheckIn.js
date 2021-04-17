import React, {useState} from 'react';
import './CheckIn.css';
import CheckInItem from './CheckInItem';
import EventDB from './../../DB/EventDB';

export default function CheckIn({onboardState}) {
  const [eventList, setEventList] = useState(EventDB);
  
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
    
    const matched = inputKey === event.secretKey ?
      'a correct' : 'an incorrect';

    alert('You have submitted ' + matched + " key");
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
        <div className="checkin">
          <h2>Upcoming 이벤트</h2>
          <div>
            {
              upcomingEvents.length === 0 ?
              <p>You have no upcoming events!</p>
              : upcomingE
            }
          </div>
          <h2>참여한 이벤트</h2>
          <div>
            {
              completedEvents.length === 0 ?
              <p>You have no completed events!</p>
              : completedE
            }
          </div>
          <h2>놓친 이벤트</h2>
          <div>
            {
              missedEvents.length === 0 ?
              <p>You have no missed events!</p>
              : missedE
            }
          </div>
        </div>
      }
    </div>
  )
}

