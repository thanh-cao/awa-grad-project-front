import React from 'react';

const adress = 'Oslo'.replace(' ', '+')




fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress},+CA&key=AIzaSyAGIPSSAJGsWmI8LPCFg5gqo4TZDRthXf8`)
  .then(response => response.json())
  .then(data => console.log(data.results[0].geometry.location));

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      //console.log("Latitude is :", position.coords.latitude);
      //console.log("Longitude is :", position.coords.longitude);
    });
  }



  render() {
    return (
        <div>
            <div className='header'></div>     
            <h1>Find Your destination</h1>   
            <label>
                Destination
                <input name='location' onChange={this.handleChange} type="text" placeholder='Search' id='searchButton'/>
            </label>
                <button onClick={this.handleSubmit}>Search</button>
            
            <div className='footer'></div>
      </div>
    );
  }
}

export default Search;