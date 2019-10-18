import React, { Component } from 'react';

class About extends Component {
    componentDidMount() {
        document.title = "About";
    }
    render() {
        return (
            <div className="page">
                <h3>About</h3>

                <p>This is the about page</p>
            </div>
        )
    }
}

export default About;