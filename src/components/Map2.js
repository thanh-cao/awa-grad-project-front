import React, {useEffect, useState} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import mapLogo from '../photos/map-logo.png';

import { latitude } from './getCurrentLocation';
import { longitude } from './getCurrentLocation';



const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;



const libraries = ["places"];
const mapContainerStyle = { width: '100vw', height: '100vh' }
const options = { disableDefaultUI: true, zoomControl: true }

function getJSON(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
    .then(res => res.json())
}

 
function Map2 (props) {
    const {isLoaded, loadError} = useLoadScript({googleMapsApiKey: API_KEY, libraries})

    
    // const [location, setLocation] = useState({lat: 1, lng: 11});
    const [location, setLocation] = useState({lat: 1, lng: 11});
    
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        latitude(position => {
            let lat = position['coords']['latitude'];
            let lng = position['coords']['longitude'];

            setLocation({lat, lng})
        })

        getJSON(props.search)
        .then(data => {
            const newLocation = data.results[0].geometry.location;
            setLocation(newLocation)
        })

        props.events.forEach(event => {
            
            getJSON(event.name)
            .then(data => {
                const id = event.id + (Math.random() * 1000);
                
                const location = data.results[0].geometry.location;
                setMarkers((current) => [...current, {lat: location.lat, lng: location.lng, id: id}])
            })
            .catch(err => err);
        })

    }, [props.search, props.events]);

    console.log('state', location)
    if(loadError) return 'Error loading map'
    if(!isLoaded) return 'Loading Map'

    return (
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={location}
        options={options}
        >
            {markers.map(marker => (
            <Marker 
                key={marker.id} 
                position={{lat: marker.lat, lng: marker.lng}}
                icon={{
                    url: mapLogo,
                    scaledSize: new window.google.maps.Size(20,20)
                }}/>
            ))}
        </ GoogleMap>
    )
}

export default Map2;