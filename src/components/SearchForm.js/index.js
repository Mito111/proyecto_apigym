import { useState } from "react";
const SearchForm = ({ searchParams, setSearchParams }) => {
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <form>
      <label htmlFor="search">Búsqueda:</label>
      <input id="search"></input>
    </form>
  );
};
