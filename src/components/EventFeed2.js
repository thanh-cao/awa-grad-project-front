import React, {useState, useEffect} from 'react';
import Map2 from './Map2'
import dateFormat from "dateformat";


function EventFeed2(props) {
    const [events, setEvents] = useState([]);
    const date = new Date(props.date);
    const startDate = `${props.date}T00:00:00Z`;
    const endDate = dateFormat(date.setDate(date.getDate() + 1), 'isoUtcDateTime');

    useEffect(() => {
       fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&startDateTime=${startDate}&endDateTime=${endDate}&size=20&city=${props.search}`)
        .then(res => res.json())
        .then(data => {
            const events = data._embedded.events;

            setEvents(events);
        })
    }, [props.search, props.date, startDate, endDate]);

        const eventElements = events.map(event => {
            console.log(event);
            return <a href={event.url} key={event.id} className="text-decoration-none" target="_blank" rel="noreferrer">
                <div className="card my-3">
                    <div className="card-bg-gradient"></div>
                    <div className="card-body bg-white d-flex justify-content-between">
                        <div>
                            <img src={event.images[0].url} alt="Event"/>
                        </div>
                        <div className="mx-4 flex-grow-1">
                            <h5>{event.name}</h5>
                            <p className="my-0"><strong>Venue: </strong>{event._embedded.venues[0].name}</p>
                            <p><strong>When:</strong> {event.dates.start.localDate} - {event.dates.start.localTime}</p>
                        </div>
                         </div>
                </div>
            </a>
    })

    return (
        <div className="mb-5">
            <Map2 search={props.search} events={events}/>
             {eventElements}
        </div>
        
    )
}

export default EventFeed2;
