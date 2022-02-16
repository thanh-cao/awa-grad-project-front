import React from 'react';
import placeholderImg from '../photos/placeholder-image.png';

class EditProfile extends React.Component {
    constructor(props){
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
    componentDidMount(){
        const {id} = this.props.match.params

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
        .then(res => res.json())
        .then(user => {
            console.log(user);
            this.setState({
                    isLoading: false,
                    profilePitcure: user.profilePicture,
                    about: user.about,
                    interests: user.interests,
                    languages: user.languages,
                    location: user.locations
                })
        })
    }

    handleSubmit(e){
        const {id} = this.props.match.params
        e.preventDefault();

        const updatedUser = {
            profilePictue: this.state.profilePicture,
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


    handleChange(e, field){
        this.setState({
            [field]: e.target.value
        })
    }

    render(){
        const {isLoading, profilePicture, about, interests, languages, location} = this.state;

        if(isLoading){
            return <div>Loading...</div>
        }
        
        return(
            <div className="edit-profile">
                <form 
                encType="multipart/form-data" 
                className="edit-form"
                onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="imageUpload">
                        {profilePicture ? profilePicture : <img src={placeholderImg} /> }
                        <input 
                        type="file" 
                        id="profilePicture" 
                        name="profilePicture"
                        onChange={(e) => this.handleChange(e, 'profilePicture')}
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
                        <input type="text" value={location} />

                    </div>
                    <div>
                        <label>Language</label>
                        <select 
                        onChange={(e) => this.handleChange(e, 'language')}
                        multiple>
                            <option>English</option>
                            <option>Norwegian</option>
                            <option>Swedish</option>
                            <option>Spanish</option>
                            <option>German</option>
                        </select>
                    </div>
                    <button 
                    className="save-btn"
                    type="submit">Save</button>
                    <button className="cancel-btn">Cancel</button>
                </form>
            </div>
        )
    }
}

export default EditProfile;