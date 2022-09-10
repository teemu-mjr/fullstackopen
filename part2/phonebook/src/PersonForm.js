import { useState } from "react";

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

    let newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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
