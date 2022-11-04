import personService from "./services/persons";

export const Persons = ({ persons, setPersons, filter }) => {
  const personsToShow =
    filter.length <= 0
      ? persons
      : persons.filter((person) => person.name.includes(filter));

  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              if (!window.confirm(`Delete ${person.name} ?`)) {
                return;
              }

              personService.deleteOne(person.id);
              setPersons(persons.filter((obj) => obj.id !== person.id));
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};
