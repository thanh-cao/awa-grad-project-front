const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password) => {
    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => res.json());
}

export const registerUser = async (name, email, password) => {
    return fetch(`${API_URL}/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    }).then(res => res.json());
}

export const logoutUser = async () => {
    return fetch(`${API_URL}/users/logout`,
        { credentials: 'include' })
        .then(res => res.json());
}

export const authenticateUser = async () => {
    return fetch(`${API_URL}/users/authenticate`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

