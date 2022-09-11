import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFiler = (e) => {
    setFilter(e.target.value);
  };

  const filteredCountires =
    filter.length <= 0
      ? countries
      : countries.filter((country) => country.name.common.includes(filter));

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <input value={filter} onChange={handleFiler}></input>
      <Countries countries={filteredCountires} />
    </div>
  );
}

export default App;
