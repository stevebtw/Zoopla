import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyForm from './PropertyForm';
import { Helpers } from "../utils/Helpers";

import './PropertyListing.css';
import 'typeface-roboto';



class PropertyListing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_form_visible: false
        }

        this.setEditable = this.setEditable.bind(this);
    }

    setEditable() {
        //     this.props.onSetEditable();
        // this.setState({
        //     is_form_visible: !this.state.is_form_visible
        // });
    }



    render() {
        const property = this.props.properties[this.props.idx];

        const defaultImage = "";

        const property_image = (property.images && property.images.length) ?
            property.images[0] : defaultImage;


        // classes
        const classes = ["property_listing"];
        if (!property.active) {
            classes.push("is_archived");
        }
        if (this.state.is_selected) {
            classes.push("is_selected");
        }

        return (
            <Link to={"/" + property.id}> <div className={classes.join(" ")}>
                <div className="property_details" onClick={() => this.setEditable()} title="Edit listing">
                    <div className="property_thumbnail_holder">
                        <img src={property_image} className="property_thumbnail" alt="" />
                    </div>

                    <div className="property_meta">
                        <p className="property_address">
                            {property.address}
                            {property.active ? "" : " [NOT LISTED]"}
                        </p>
                        <p>{property.bedrooms || "1"} bedroom house</p>
                        <p>{Helpers.formatNumber(property.price)}</p>
                    </div>

                </div>

                {this.state.is_form_visible ? <PropertyForm property={property} onSubmitForm={this.setEditable} /> : ""}
            </div></Link >
        )
    }
}

const mapStateToProps = state => {
    return {
        properties: state.properties
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetEditable: () => dispatch({ type: "SELECT_PROPERTY" })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PropertyListing);