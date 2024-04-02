import React, {useState} from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
const [message, setMessage] = useState(initialMessage)
const [email, setEmail] = useState(initialEmail)
const [steps, setSteps] = useState(initialSteps)
const [index, setIndex] = useState(initialIndex)

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return {
      x: (index % 3) + 1,
      y: Math.floor(index / 3) + 1,
    };
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const gridSize = 3;
    const currentRow = Math.floor(index / gridSize);
    const currentColumn = index % gridSize;

    let newIndex = index;
    let canMove = true;

    if (direction === 'left') {
      if (currentColumn > 0) newIndex = index - 1;
      else canMove = false;
    } else if (direction === 'right') {
      if (currentColumn < gridSize - 1) newIndex = index + 1;
      else canMove = false;
    } else if (direction === 'up') {
      if (currentRow > 0) newIndex = index - gridSize;
      else canMove = false;
    } else if (direction === 'down') {
      if (currentRow < gridSize - 1) newIndex = index + gridSize;
      else canMove = false;
    }

    return { newIndex, canMove };
  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const { newIndex, canMove } = getNextIndex(direction);
    if (canMove) {
      setIndex(newIndex);
      setSteps(prevSteps => prevSteps + 1);
      setMessage(initialMessage);
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault();
  
    if (!email.trim()) {
      setMessage("Ouch: email is required");
      return;
    }
  
    const { x, y } = getXY();
  
    const payload = {
      x,
      y,
      steps,
      email,
    };
  
    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        setMessage(res.data.message);
        setEmail(initialEmail);
      })
      .catch(err => {
        if (err.response) {
          setMessage(err.response.data.message || 'An error occurred. Please try again.');
        } else {
          setMessage('An error occurred. Please try again.');
        }
      });
  }
  
  
  


  return (
    <div id="wrapper" className={`functional ${props.className}`}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXY().x}, {getXY().y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time': 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
      <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => move('left')} id="left">LEFT</button>
        <button onClick={() => move('up')} id="up">UP</button>
        <button onClick={() => move('right')} id="right">RIGHT</button>
        <button onClick={() => move('down')} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <button type="submit" id='submit' >Submit</button>
      </form>
    </div>
  );
}
