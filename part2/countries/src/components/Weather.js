import React from "react";

export const Weather = ({city, temp, icon, wind}) => {
  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>
        temperature {temp} Celcius
      </div>
      <div>
        <img src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}></img>
      </div>
      <div>
        wind {wind} m/s
      </div>
    </div>
  );
};

