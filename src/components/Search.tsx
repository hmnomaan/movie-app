import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="">
        <img src="../assets/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search Through THousands of Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
