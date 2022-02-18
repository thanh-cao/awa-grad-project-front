import React from 'react';


class Search extends React.Component {
  

  render() {
    return (
        <div>
            <div className='header'></div>     
            <h1>Find Your destination</h1>   
            <label>
                Destination
                <input type="text" placeholder='Search' id='searchButton'/>
            </label>
                <button>Search</button>
            
            <div className='footer'></div>
      </div>
    );
  }
}

export default Search;