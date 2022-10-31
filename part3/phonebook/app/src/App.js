import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import personController from "./controllers/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [formMessage, setFormMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState(null);

  const hook = () => {
    personController.getAll().then((data) => {
      setPersons(data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={formMessage} style={messageStyle} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new entry</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setFormMessage={setFormMessage}
        setMessageStyle={setMessageStyle}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
