import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={() => onClick()}>{text}</button>;
};

const StatisticLine = ({ text, value, sign }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {sign}
      </td>
    </tr>
  );
};

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
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={good + neutral + bad} />
          <StatisticLine
            text="Average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="Positive"
            value={(100 * good) / (good + neutral + bad)}
            sign=" %"
          />
        </tbody>
      </table>
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
      <Button text="Good" onClick={() => setGood(good + 1)}>
        good
      </Button>
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)}>
        neutral
      </Button>
      <Button text="Bad" onClick={() => setBad(bad + 1)}>
        bad
      </Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
