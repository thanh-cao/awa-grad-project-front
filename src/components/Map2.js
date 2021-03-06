import React, {useEffect, useState} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];
const mapContainerStyle = { width: '100%', height: '100%' }
const options = { disableDefaultUI: true, zoomControl: true }

function getJSON(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
    .then(res => res.json())
}

function Map2 (props) {
    const {isLoaded, loadError} = useLoadScript({googleMapsApiKey: API_KEY, libraries})

    const [location, setLocation] = useState({});
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {

        getJSON(props.search)
        .then(data => {
            const newLocation = data.results[0].geometry.location;
            setLocation(newLocation)
        })

        props.events.forEach(event => {
            getJSON(event._embedded.venues[0].name)
            .then(data => {
                const id = event.id;
                
                const location = data.results[0].geometry.location;
                setMarkers((current) => [...current, {lat: location.lat, lng: location.lng, id: id}])
            })
            .catch(err => err);
        })

    }, [props.search, props.events]);

    function handleMouseOver(marker){
        const events = props.events.filter(event => {
            return event.id === marker.id;
        })
        setSelected({event: events[0].name, lat: marker.lat, lng: marker.lng});
    }

    if(loadError) return 'Error loading map'
    if(!isLoaded) return 'Loading Map'

    return (
        <div style={{ height: "40vh", width: "100%" }}>
            <GoogleMap 
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={location}
            options={options}
            >
            {markers.map(marker => (
            <Marker 
                key={marker.id + (Math.random() * 1000)} 
                position={{lat: marker.lat, lng: marker.lng}}
                // icon={{
                //     url: mapLogo,
                //     scaledSize: new window.google.maps.Size(20,20)
                // }}
                onMouseOver={() => handleMouseOver(marker)}/>
            ))}

            {selected ? (
            <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=>{
                setSelected(null);
            }}>
                <div>
                    <p>
                        {selected.event}
                    </p>
                </div>
            </InfoWindow>
            ) : null}
        </ GoogleMap>
        </div>
      
    )
}

export default Map2;