const API_URL = process.env.REACT_APP_API_URL;

export const getUserProfile = async (id) => {
    return fetch(`${API_URL}/users/${id}`)
        .then(res => res.json());
}

export const getUserReviews = async (userId) => {
    return fetch(`${API_URL}/users/${userId}/reviews`)
        .then(res => res.json());
}

export const createUserReview = async (receiverId, content) => {
    return fetch(`${API_URL}/users/${receiverId}/reviews`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    }).then(res => res.json());
}

export const updateUserReview = async (reviewId, content, receiverId) => {
    console.log(`${API_URL}/users/${receiverId}/reviews/${reviewId}`);
    return fetch(`${API_URL}/users/${receiverId}/reviews/${reviewId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    }).then(res => res.json());
}

export const deleteUserReview = async (reviewId, receiverId) => {
    return fetch(`${API_URL}/users/${receiverId}/reviews/${reviewId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}