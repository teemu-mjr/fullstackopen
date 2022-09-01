import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad <= 0) {
    return (
      <div>
        <h1>Statistics</h1>

        <p>No feedback given!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {good + neutral + bad}</p>
      <p>average: {(good - bad) / (good + neutral + bad)}</p>
      <p>positive: {(100 * good) / (good + neutral + bad)} %</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give use feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
