import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropertyForm from '../components/PropertyForm';

class PropertyDetails extends Component {
    render() {
        const property_id = this.props.match.params.id;

        if (this.props.properties) {
            const property = this.props.properties.filter(prop => prop.id === property_id);

            if (property.length) {
                return <PropertyForm property={property[0]} />
            } else {
                return <p>No property</p>
            }

        } else {
            return <p>Loading...</p>
        }
    }
}

const mapStateToProps = state => {
    return {
        properties: state.properties
    }
}

export default connect(mapStateToProps)(PropertyDetails);