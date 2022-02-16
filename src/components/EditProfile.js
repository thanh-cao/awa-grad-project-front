import React from 'react';
import placeholderImg from '../photos/placeholder-image.png';

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            profilePicture: null,
            about: '',
            interests: '',
            languages: [],
            location: ''
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(res => res.json())
            .then(user => {
                console.log(user);
                this.setState({
                    isLoading: false,
                    profilePicture: user.profilePicture,
                    about: user.about,
                    interests: user.interests,
                    languages: user.languages,
                    location: user.location
                })
            })
    }

    handleSubmit(e) {
        const { id } = this.props.match.params
        e.preventDefault();

        const updatedUser = {
            profilePicture: this.state.profilePicture,
            about: this.state.about,
            interests: this.state.interests,
            languages: this.state.languages,
            location: this.state.location
        }
        console.log(updatedUser);
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
    }


    handleChange(e, field) {
        let value = this.state.languages;

        if(field === 'languages'){
            value.push(e.target.value)
        } else {
            value = e.target.value;
        }

        this.setState({
            [field]: value
        })
    }

    handleFileUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profilePicture', file);

        fetch(`${process.env.REACT_APP_API_URL}/services/imageupload`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then(response => response.json())
            .then(result => this.setState({profilePicture: result}));
    }

    removeLanguage(lang){
        const languages = this.state.languages;
        const index = languages.indexOf(lang);
        languages.splice(index, 1)
        
        this.setState({languages})

    }

    render() {
        const { isLoading, profilePicture, about, interests, languages, location } = this.state;

        if (isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="edit-profile">
                <form
                    encType="multipart/form-data"
                    className="edit-form"
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="imageUpload">
                        {profilePicture && <img src={profilePicture} />}
                        {!profilePicture && <img src={placeholderImg} />}
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={(e) => this.handleFileUpload(e)}
                        ></input>
                    </div>
                    <div>
                        <label>About me</label>
                        <textarea
                            rows="4"
                            value={about}
                            onChange={(e) => this.handleChange(e, 'about')}
                        ></textarea>
                    </div>
                    <div>
                        <label>Interests</label>
                        <textarea
                            rows="4"
                            value={interests}
                            onChange={(e) => this.handleChange(e, 'interests')}
                        ></textarea>
                    </div>
                    <div className="location">
                        <label>Location</label>
                        <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => this.handleChange(e, 'location')}
                        />

                    </div>
                    <div>
                        <label>Languages</label>
                            <div>
                                {languages && languages.map(lang => <p><button className="remove-language" onClick={() => this.removeLanguage(lang)}>x</button><small>{lang}</small></p> )}
                            </div>
                        <select
                            onChange={(e) => this.handleChange(e, 'languages')}
                            >
                            <option>English</option>
                            <option>Norwegian</option>
                            <option>Swedish</option>
                            <option>Spanish</option>
                            <option>German</option>
                        </select>
                    </div>
                    <button
                        className="save-btn btn"
                        type="submit">Save</button>
                    <button className="cancel-btn btn">Cancel</button>
                </form>
            </div>
        )
    }
}

export default EditProfile;