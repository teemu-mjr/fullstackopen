import React, {useEffect, useState} from "react";
import axios from "axios";
import {Weather} from "./Weather";

const Country = ({country}) => {
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");

  const hook = () => {
    const key = process.env.REACT_APP_WEATHER_KEY;
    axios
      .get(`https://api.weatherbit.io/v2.0/current?key=${key}&city=${country.capital}`)
      .then((response) => {
        setTemperature(response.data.data[0].temp);
        setWind(response.data.data[0].wind_spd);
        setIcon(response.data.data[0].weather.icon)
      })
  }

  useEffect(hook, [])

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
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png}></img>
      </div>
      <Weather city={country.capital} temp={temperature} icon={icon} wind={wind} />
    </div>
  );
};

export default Country;
