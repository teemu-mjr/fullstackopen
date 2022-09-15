import React, {useEffect} from "react";
import axios from "axios";

const Country = ({country}) => {

  const hook = () => {
    axios
      .get(`https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_API_KEY}&city=${country.capital}`)
      .then((response) => console.log(response));
  }

  // useEffect(hook, []);

  return (
    <div>
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png}></img>
      </div>
    </div>
  );
};

export default Country;
