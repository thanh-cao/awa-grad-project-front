import React from "react";

class AutocompleteText extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            suggestions: [],
            countrycode: '',
            input: '',
            items: []
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            input: this.props.currentValue,
            countrycode: this.props.countrycode,
            items: this.props.items
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.setState({
                ...this.state,
                items: this.props.items
            })
        }
    }

    selectedSuggestion(code, value) {
        this.setState({
            ...this.state,
            input: value,
            suggestions: [],
            countrycode: code ? code : this.state.countrycode
        })

        this.props.onLocationChange && this.props.onLocationChange(this.props.type, value, code);
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            items: this.props.items
        })

        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.items.sort().filter(item => {
                return item.name.match(regex)
            });
        }

        this.setState({ ...this.state, suggestions, input: value });
    }

    renderSuggestions() {
        const suggestions = this.state.suggestions;

        if (suggestions.length === 0) {
            return null
        }

        return (
            <ul>
                {suggestions.map((item, i) => {
                    return <li
                        key={item.isoCode || i + item.name}
                        onClick={() => this.selectedSuggestion(item.isoCode, item.name)}
                    >{item.name}</li>
                })}
            </ul>
        )
    }

    render() {
        const { input } = this.state;

        return (
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => this.handleChange(e)} />
                {this.renderSuggestions()}
            </div>
        )
    }
}

export default AutocompleteText;