const API_URL = process.env.REACT_APP_API_URL;

export const getEvents = async (location) => {
  return fetch(`${API_URL}/services/ticketmaster?keyword=${location}`,
    { 'credentials': 'include' })
    .then(res => res.json());
}