import React, { Component } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm';
import {Helpers} from "../utils/Helpers";

import './PropertyListing.css';
import 'typeface-roboto';




// stateful
class PropertyListing extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          property : {...props.property},
          is_selected : false
      };

      this.setEditable = this.setEditable.bind(this);

      // lift state from child component
      this.handleFormChange = this.handleFormChange.bind(this);
    }

    setEditable(){
        this.setState(state => ({
            is_selected: !state.is_selected
        }));
    }
    postToAPI(){
        axios.post("FIXME")
        .then(response => {
            // FIXME - will fail with test data - see catch 
        })
        .catch( (error) => {
            // fake network delay for UX
            setTimeout(() => this.setEditable(), 500);
        });  
        
    }

    handleFormChange(property){
        console.debug(property)
        this.setState(state => ({
            property : {...property}
        }));

        // update API
        this.postToAPI();
    }


    render() {
        let property = this.state.property;

        // FIXME for real world scenario - some properties might not have photos yet
        const defaultImage = ""; 
        
        const property_image = (property.images && property.images.length) ? 
                property.images[0]  : defaultImage;
        
        // classes
        const classes = ["property_listing"];
        if(!property.active){
            classes.push("is_archived");
        }

        return (
            <div className={classes.join(" ")}>
                <div className="property_details" onClick={() => this.setEditable()}>
                    <div className="property_thumbnail_holder">
                        <img src={property_image} className="property_thumbnail" alt="" />
                    </div>

                    <div className="property_meta">
                        <p className="property_address">{property.address}</p>
                        <p>{property.bedrooms} bedroom house</p>
                        <p>{Helpers.formatNumber(property.price)}</p>
                    </div>
                
                </div>

                {this.state.is_selected ? <PropertyForm onFormChange={this.handleFormChange} property={property} /> : null}
            </div>
        )
    }
}

export default PropertyListing;