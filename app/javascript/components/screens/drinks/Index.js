import React, { useState } from "react"
import DrinksList from "../../drinks/List";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearchQuery = (event) => {
    const value = event?.target?.value || "";

    if (value.length > 0 && value.length < 3) return;

    setSearchQuery(value);
  };

  return (
    <React.Fragment>
      <h1>Cocktails</h1>
      <p>Welcome to the cocktails website.</p>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearchQuery}
      />
      
      <hr/>

      <DrinksList searchQuery={searchQuery}/>
    </React.Fragment>
  )
}

export default Index
