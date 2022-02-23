import React, {useState, useEffect} from 'react';
import Map2 from './Map2'
import {Link} from 'react-router-dom';
// import { getEvents } from "../services/ticketmaster";


function EventFeed2(props) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=Q8gNHKGy7bs82CG6jd3z8kuLS1MNHa2S&keyword=${props.search}`)
        .then(res => res.json())
        .then(data => {
            // setEvents(data._embedded.events);
            const events = data._embedded.events;
            const filteredEvents = events.filter(event => {
                return event.dates.start.localDate === props.date;
            })

            setEvents(filteredEvents);
        })
    }, [props.search, props.date]);

        const eventElements = events.map(event => {
            return <Link to={event.url} key={event.id} className="text-decoration-none">
                <div className="card my-3">
                    <div className="card-bg-gradient"></div>
                    <div className="card-body bg-white d-flex justify-content-between">
                        <img src={event.images[0].url} alt="Event"/>
                        <h4>{event.name}</h4>
                        <p><small><strong>When:</strong> {event.dates.start.localDate} - {event.dates.start.localTime}</small></p>
                    </div>
                </div>
            </Link>
    })

    return (
        <div>
            <Map2 search={props.search} events={events}/>
            {eventElements}
        </div>
        
    )
}

export default EventFeed2;
