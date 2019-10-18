import React, { Component } from 'react';
import PropertyForm from "./PropertyForm";

class AddProperty extends Component {
    constructor(props) {
        super(props);
        this.handleAddProperty = this.handleAddProperty.bind(this);
    }

    handleAddProperty() {
        this.props.handleAddProperty();
    }

    render() {
        return (
            <div id="new_property" className="card">

                {!this.props.is_adding_new_property ?
                    <button className="button" onClick={this.handleAddProperty}>Add new property</button> : ""}

                {this.props.is_adding_new_property ? <PropertyForm property={null} /> : ""}
            </div>
        )
    }
}

export default AddProperty;