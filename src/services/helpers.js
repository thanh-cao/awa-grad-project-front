export const uploadImage = async (formData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/services/imageupload`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    }).then(response => response.json());
}
