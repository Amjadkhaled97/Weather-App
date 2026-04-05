import { useState } from "react";


 function SearchBox({onSearch}){
  const [searchInput,setSearchInput] = useState('');
  const handleSubmit = (e)=>{
    e.preventDefault();
    onSearch(searchInput);
    setSearchInput('');
  }

    return(
        <div className="search-box" >
          <form onSubmit={handleSubmit}>

        <input value= {searchInput} onChange={(e) => setSearchInput(e.target.value)} 
        type="text" id="search-input" 
        placeholder="France..." />

        <button type="submit">
        Search
        </button>

        </form>

        </div>
    );
 }

 export default SearchBox