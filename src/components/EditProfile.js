import React from 'react';
import placeholderImg from '../photos/placeholder-image.png';
import { Country, City }  from 'country-state-city';
import AutocompleteText from './AutocompleteText';

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.countries = Country.getAllCountries();

        this.state = {
            isLoading: true,
            profilePicture: null,
            about: '',
            interests: '',
            languages: [],
            countrycode: '',
            country: '',
            city: '',
            cityList: [],
            suggestions: []
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params

        await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(res => res.json())
            .then(user => {
                console.log(user)
                let cityList = City.getCitiesOfCountry(user.countrycode)

                this.setState({
                    isLoading: false,
                    profilePicture: user.profilePicture,
                    about: user.about,
                    interests: user.interests,
                    languages: user.languages,
                    countrycode: user.countrycode,
                    country: user.location?.split(', ')[1],
                    city: user.location?.split(', ')[0],
                    cityList
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
            countrycode: this.state.countrycode,
            location: `${this.state.city}, ${this.state.country}`
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
        let input = e.target.value;

        if(field === 'languages'){
            if(value.includes(input)){
                return;
            } else {
                value.push(input)
            }
        } else {
            value = input;
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
        formData.append('oldPicture', this.state.profilePicture);

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

    async changeLocation(field, value, code){
        let cityList = City.getCitiesOfCountry(code)
        console.log(field, value)
        console.log(code, cityList)
        await this.setState({[field]: value, countrycode: code, cityList})
        console.log("editProfileState", this.state)
    }

    
    render() {
        let { isLoading, profilePicture, about, interests, languages, country, city, countrycode, cityList, suggestions} = this.state;
        console.log(countrycode);

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
                        <p>Location</p>
                        <div className="country">
                        <label>Conutry</label>
                            <AutocompleteText 
                            items={this.countries} 
                            currentValue={country}
                            changeLocation={this.changeLocation.bind(this)}
                            type={'country'}
                            countrycode={countrycode}/>

                            {/* <input 
                            type="text" 
                            value={country}
                            onChange={(e) => this.handleChange(e, 'country')}
                            />
                            {activeInput === 'country' && <div style={{background: 'rgb(240,240,240)', margin: 0}}>{suggestions}</div>} */}
                        </div>
                        <div className="city">
                        <label>City {this.state.cityList[2].name}</label>
                            <AutocompleteText 
                            items={cityList} 
                            currentValue={city}
                            //changeLocation={this.changeLocation.bind(this)}
                            type={'city'}
                            countrycode={countrycode}/>

                            {/* <input 
                            disabled={countrycode === ''}
                            type="text" 
                            value={city}
                            onChange={(e) => this.handleChange(e, 'city')}
                            />
                            {activeInput === 'city' && <div>{suggestions}</div>} */}
                        </div>
                    </div>
                    <div>
                        <label>Languages</label>
                            <div>
                                {languages && languages.map((lang, i) => {
                                    return (
                                        <p key={i}><button className="remove-language" onClick={() => this.removeLanguage(lang)}>x</button><small>{lang}</small></p> 
                                    )
                                })}
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