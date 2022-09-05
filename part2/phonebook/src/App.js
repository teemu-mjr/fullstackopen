import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewPerson = (e) => {
    e.preventDefault();

    if (isNameInPersons(newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    let newPerson = {
      name: newName,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const isNameInPersons = (searchName) => {
    for (let i = 0; i < persons.length; i++) {
      if (searchName === persons[i].name) {
        return true;
      }
    }
    return false;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
