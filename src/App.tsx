import React, { useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" >
      <header>
        <img src="../public/hero.png" alt="hero-banner" />
      </header>
      <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy
          Without the hassle.
        </h1>
     
        
        <Search searchTerm={searchTerm} setSearchTerm={setsearchTerm} />
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  );
};

export default App;
