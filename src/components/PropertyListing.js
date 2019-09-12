import React, { Component } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm';
import {Helpers} from "../utils/Helpers";

import './PropertyListing.css';
import 'typeface-roboto';



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
        const params = this.state.property;

        axios.post("FIXME", params)
        .then(response => {
            // FIXME - will fail with test data - see catch instead
        })
        .catch( (error) => {
            // fake network delay for UX
            setTimeout(() => this.setEditable(), 500);
        });      
    }

    handleFormChange(property){
        // update state and POST when done
        this.setState(state => ({
            property : {...property}
        }), () => this.postToAPI() );
    }


    render() {
        const property = this.state.property;

        // FIXME for real world scenario - some properties might not have photos yet
        const defaultImage = ""; 
        
        const property_image = (property.images && property.images.length) ? 
                property.images[0] : defaultImage;
                
        
        // classes
        const classes = ["property_listing"];
        if(!property.active){
            classes.push("is_archived");
        }
        if(this.state.is_selected){
            classes.push("is_selected");
        }

        return (
            <div className={classes.join(" ")}>
                <div className="property_details" onClick={() => this.setEditable()} title="Edit listing">
                    <div className="property_thumbnail_holder">
                        <img src={property_image} className="property_thumbnail" alt="" />
                    </div>

                    <div className="property_meta">
                        <p className="property_address">
                            {property.address} 
                            {property.active ? "" : " [NOT LISTED]"}
                        </p>
                        <p>{property.bedrooms || "1" } bedroom house</p>
                        <p>{Helpers.formatNumber(property.price)}</p>
                    </div>
                
                </div>

                {this.state.is_selected ? <PropertyForm onFormChange={this.handleFormChange} property={property} /> : null}
            </div>
        )
    }
}

export default PropertyListing;