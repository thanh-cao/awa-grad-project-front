import React from 'react';
import { Country, City } from 'country-state-city';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import placeholderImg from '../photos/placeholder-image.png';
import AutocompleteText from './AutocompleteText';
import { getUserProfile, updateUserProfile } from '../services/users';
import { uploadImage } from '../services/helpers';

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.countries = Country.getAllCountries();

        this.state = {
            isLoading: true,
            profilePicture: null,
            about: ' ',
            interests: ' ',
            languages: '',
            countrycode: '',
            country: '',
            city: '',
            cityList: [],
            suggestions: []
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const user = await getUserProfile(id);
        let cityList = City.getCitiesOfCountry(user.countrycode)

        this.setState({
            isLoading: false,
            profilePicture: user.profilePicture,
            about: user.about || '',
            interests: user.interests || '',
            languages: user.languages,
            countrycode: user.countrycode,
            country: user.location?.split(', ')[1],
            city: user.location?.split(', ')[0],
            cityList
        })
    }


    async handleSubmit(e) {
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
        try {
            await updateUserProfile(id, updatedUser);
            this.props.history.replace(`/user/${id}`);
        } catch (error) {
            console.log(error);
        }
    }


    handleChange(e, field) {
        // let value = this.state.languages;
        // let input = e.target.value;

        // if (field === 'languages') {
        //     if (value.includes(input)) {
        //         return;
        //     } else {
        //         value.push(input)
        //     }
        // } else {
        //     value = input;
        // }

        this.setState({
            [field]: e.target.value
        })
    }

    async handleFileUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('oldPicture', this.state.profilePicture);

        try {
            const imgUrl = await uploadImage(formData);
            this.setState({ profilePicture: imgUrl });
        } catch (error) {
            console.log(error);
        }
    }

    removeLanguage(lang) {
        const languages = this.state.languages;
        const index = languages.indexOf(lang);
        languages.splice(index, 1)

        this.setState({ languages })

    }

    async changeLocation(field, value, code) {
        let cityList = City.getCitiesOfCountry(code)
        this.setState({ [field]: value, countrycode: code, cityList })
    }


    render() {
        let { isLoading, profilePicture, about, interests, languages, country, city, countrycode, cityList, suggestions } = this.state;

        if (isLoading) {
            return <div>Loading...</div>
        }

        return (
            <Container className="edit-profile">
                <Form
                    encType="multipart/form-data"
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group className="imageUpload">
                        {profilePicture ? <img src={profilePicture} alt="profile" /> : <img src={placeholderImg} alt="profile"/>}
                        
                        <Form.Label>Upload profile picture</Form.Label>
                        <Form.Control
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={(e) => this.handleFileUpload(e)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>About me</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={about}
                            onChange={(e) => this.handleChange(e, 'about')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Interests</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={interests}
                            onChange={(e) => this.handleChange(e, 'interests')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Langauges</Form.Label>
                        <Form.Control
                            type="text"
                            value={languages}
                            onChange={(e) => this.handleChange(e, 'languages')}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <AutocompleteText
                                label="Country"
                                items={this.countries}
                                currentValue={country}
                                onLocationChange={this.changeLocation.bind(this)}
                                type={'country'}
                                countrycode={countrycode} />
                        </Col>
                        <Col>
                            <AutocompleteText
                                label="City"
                                items={cityList}
                                currentValue={city}
                                onLocationChange={this.changeLocation.bind(this)}
                                type={'city'}
                                countrycode={countrycode} />
                        </Col>
                    </Row>

                    <Button className="mt-3 me-2" variant="primary" type="submit">
                        Update
                    </Button>
                    <Button className="mt-3" variant="outline-secondary" onClick={() => this.props.history.goBack()}>
                        Cancel
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default EditProfile;