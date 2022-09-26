import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    personService.getAll()
      .then(response => {
        setPersons(response.data);
      })
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new entry</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
