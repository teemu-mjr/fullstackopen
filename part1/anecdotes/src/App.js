import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const findLargestIndex = (array) => {
    let largest = 0;
    let index = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > largest) {
        largest = array[i];
        index = i;
      }
    }
    return index;
  };

  const incrementPoints = (index) => {
    let pointsCopy = [...points];
    pointsCopy[index] += 1;
    setPoints(pointsCopy);
  };

  const randomNewInt = (current, max) => {
    let randInt = Math.floor(Math.random() * max);
    if (max > 0 && randInt === current) {
      return randomNewInt(current, max);
    }
    return randInt;
  };
  return (
    <div>
      <h1>Todays anecdote</h1>
      <div>{anecdotes[selected]}</div>
      <p>This anecdote has {points[selected]} points</p>
      <button
        onClick={() => {
          incrementPoints(selected);
        }}
      >
        Vote
      </button>
      <button
        onClick={() => {
          setSelected(randomNewInt(selected, anecdotes.length));
        }}
      >
        Next Anecdote
      </button>

      <h1>Anecdote with the most votes</h1>
      <div>{anecdotes[findLargestIndex(points)]}</div>
    </div>
  );
};

export default App;
