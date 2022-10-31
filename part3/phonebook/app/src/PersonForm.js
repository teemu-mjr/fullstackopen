import { useState } from "react";
import personController from "./controllers/persons";

export const PersonForm = ({
  persons,
  setPersons,
  setFormMessage,
  setMessageStyle,
}) => {
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

  const handleNewMessage = (message, messageStyle) => {
    setFormMessage(message);
    setMessageStyle(messageStyle);
    setTimeout(() => {
      setFormMessage(null);
    }, 2000);
  };

  const updatePerson = (oldIndex, newPerson) => {
    personController
      .update(persons[oldIndex].id, newPerson)
      .then((returnedPerson) => {
        let newPersons = [...persons];

        newPersons[oldIndex] = {
          ...returnedPerson,
          number: newPerson.number,
        };

        setPersons(newPersons);

        handleNewMessage(`${newPerson.name} was updated`, { color: "green" });
      })
      .catch((err) => {
        handleNewMessage(`${newPerson.name} has been removed from the server`, {
          color: "red",
        });
        console.log(err.message);
      });
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
      if (
        !window.confirm(
          `${newPerson.name} exists! Do you want to update the number?`
        )
      ) {
        return;
      }
      updatePerson(oldIndex, newPerson);
      resetFields();
      return;
    }

    // Create a new person
    personController.create(newPerson).then((data) => {
      setPersons(persons.concat(data));
      resetFields();
      handleNewMessage(`${newPerson.name} was added to the phonebook`, {
        color: "green",
      });
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
