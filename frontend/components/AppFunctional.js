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
const maxIndex = gridSize * gridSize - 1;
const currentRow = Math.floor(index / gridSize);
const currentColumn = index % gridSize;

let newIndex = index

    if (direction === 'left' && currentColumn > 0) {
      newIndex = index - 1
    } else if (direction === 'right' && currentColumn < gridSize - 1) {
      newIndex = index + 1
    } else if (direction === 'up' && currentRow > 0){
      newIndex = index - gridSize
    }
    else if (direction === 'down' && currentRow < gridSize - 1){
      newIndex = index + gridSize
    }

    if (newIndex >= 0 && newIndex <= maxIndex){
      setIndex(newIndex)
    }
  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(direction);

    setSteps(steps => steps + 1)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;

    const payload = {
      x,
      y,
      steps,
      email
    };

    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        console.log('Success:', res.data)
        setMessage('Success!')
      })
      .catch(err => {
        console.error('Error:', err)
        setMessage('An error occured. Please try again.')
      })
  }

  return (
    <div id="wrapper" className="functional {props.className}">
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved {steps} times</h3>
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
        <h3 id="message"></h3>
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
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
