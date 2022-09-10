export const Persons = ({ persons, filter }) => {
  const personsToShow =
    filter.length <= 0
      ? persons
      : persons.filter((person) => person.name.includes(filter));

  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};
