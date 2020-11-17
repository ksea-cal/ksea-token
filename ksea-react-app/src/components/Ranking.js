import React from 'react';

let currentPost; 

function ranking() { 
    currentPost = fetch('http://127.0.0.1:5000').then(res => res.json())
    return (
    <div className="App">
      <header className="App-header">
        <p>The current post is { currentPost }. </p>
      </header>
    </div>
  );
}

