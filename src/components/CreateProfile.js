import React from 'react';
import placeholderImg from '../photos/placeholder-image.png';

class CreateProfile extends React.Component {
    render(){
        return(
            <div className="create-profile">
                <form enctype="multipart/form-data">
                    <div className="imageUpload">
                        <img src={placeholderImg} />
                        <input type="file" id="profilePicture" name="profilePicture"></input>
                    </div>
                    <div>
                        <label>About me</label>
                        <textarea rows="4"></textarea>
                    </div>
                    <div>
                        <label>Interests</label>
                        <textarea rows="4"></textarea>
                    </div>
                    <div className="location">
                        <p>Location</p>
                        <label>Country</label>
                        <select>
                            <option>England</option>
                        </select>
                        <label>City </label>
                        <select>
                            <option>London</option>
                        </select>
                    </div>
                    <div>
                        <label>Language</label>
                        <select>
                            <option>English</option>
                            <option>Norwegian</option>
                            <option>Swedish</option>
                            <option>Spanish</option>
                            <option>German</option>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateProfile;