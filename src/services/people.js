const API_URL = 'http://localhost:8080'; 

export function getPeople() {
    return fetch(`${API_URL}/users`)
    .then((res) => res.json()); 
}