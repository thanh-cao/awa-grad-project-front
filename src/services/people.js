const API_URL = process.env.REACT_APP_API_URL;

export async function getPeople() {
    return fetch(`${API_URL}/users`,
        { credentials: 'include' })
        .then((res) => res.json());
}