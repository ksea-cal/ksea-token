import React, {useState, useEffect} from 'react';

export default function Timer() {
  const [count, setCount] = useState(60)
  
  useEffect(() => {
    if (count === 0) return
    
    const intervalId = setInterval(() => {
      setCount(count - 1)
    }, 1000)
    return () => clearInterval(intervalId);
  })

  return (
    <div>
      <h3>You have {count} seconds left</h3>
    </div>
  )
}