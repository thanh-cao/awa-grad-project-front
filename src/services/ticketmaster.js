const API_URL = "http://localhost:8080";

export function getEvents(location) {
  return fetch(`${API_URL}/ticketmaster?keyword=${location}`).then((res) =>
    res.json()
  );
}
