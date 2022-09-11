const Country = ({ country }) => {
  country.languages.map((lang) => console.log(lang))
  return (
    <div>
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <div>
        <h3>languages:</h3>
      </div>
    </div>
  );
};

export default Country;
