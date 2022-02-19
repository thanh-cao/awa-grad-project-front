const API_URL = process.env.REACT_APP_API_URL;

export const getUserProfile = async (id) => {
    return fetch(`${API_URL}/users/${id}`)
            .then(res => res.json());
}

export const getUserReviews = async (userId) => {
    return fetch(`${API_URL}/users/${userId}/reviews`)
            .then(res => res.json());
}