import { useState } from "react";
import personService from "./services/persons.js";

export const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const isNameInPersons = (searchName) => {
    for (let i = 0; i < persons.length; i++) {
      if (searchName === persons[i].name) {
        return i;
      }
    }
    return -1;
  };

  const resetFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const updatePerson = (oldIndex, newPerson) => {
    personService.update(persons[oldIndex].id, newPerson);

    let newPersons = [...persons];

    newPersons[oldIndex] = {
      ...newPersons[oldIndex],
      name: newPerson.name,
      number: newPerson.number,
    };
    setPersons(newPersons);
  };

  const handleNewPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let oldIndex = isNameInPersons(newName);

    // Update a person
    if (oldIndex !== -1) {
      if (!window.confirm(
        `${newPerson.name} exists! Do you want to update the number?`
      )) {
        return;
      }

      updatePerson(oldIndex, newPerson);
      resetFields();

      return;
    }

    // Create a new person
    personService.create(newPerson).then((data) => {
      setPersons(persons.concat(data));
      resetFields();
    });
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
