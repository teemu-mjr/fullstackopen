export const Filter = ({ filter, setFilter }) => {
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      Filter shown with <input value={filter} onChange={handleFilter}></input>
    </div>
  );
};
