import Country from "./Country";

const Countries = ({countries, setFilter}) => {
  if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    );
  } else if (countries.length > 10) {
    return <div>Too many matches, spesify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>Show</button>
          </div>
        ))}
      </div>
    );
  }
};

export default Countries;
