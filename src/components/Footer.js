import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="bg-primary py-2 mt-3 text-white fixed-bottom text-center">
                Copyright &copy; {new Date().getFullYear()} Travel App
            </footer>
        )
    }
}