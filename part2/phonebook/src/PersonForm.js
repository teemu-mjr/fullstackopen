import { useState } from "react";
import personService from "./services/persons.js"

export const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const isNameInPersons = (searchName) => {
    for (let i = 0; i < persons.length; i++) {
      if (searchName === persons[i].name) {
        return true;
      }
    }
    return false;
  };

  const handleNewPerson = (e) => {
    e.preventDefault();

    if (isNameInPersons(newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then(data => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
    })
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <form onSubmit={handleNewPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
