import React, { Component } from 'react';
import axios from 'axios';
import PropertyListing from "./PropertyListing";
import PropertyForm from "./PropertyForm";


class FetchData extends Component {
  constructor(props) {
    super(props);

    this.state = {
        properties : [],
        is_adding : false,
        error: null
    };

    this.addNewProperty = this.addNewProperty.bind(this);
  }

  getData(){
    axios.get("data.json")
    .then(response => {
        if(response && response.data && response.data.properties && response.data.properties.length){
            this.setState({
                properties: response.data.properties
            });
        }
    })
    .catch( (error) => {
        // silent fail for live - activate state for debugging in dev
        console.debug(error);
        // this.setState({
        //   error
        // });
    });
  }

  addNewProperty(property){

    // FIXME - for brevity, add missing form fields 
    const params = {
      ...property,
      id : "p4",
      active : true,
      images : ["/images/properties/property4_1.jpg"]
    }

    axios.post("FIXME", params)
    .catch( (error) => {
      // FIXME - this would be the resolved promise if the API worked
      this.setState(prevState => ({
        properties: [params, ...prevState.properties]
      }));
    });     
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { error, properties } = this.state;

    if(properties && properties.length){
        // build property list here for performance
        const property_list = properties.map(property => 
            <PropertyListing key={property.id} property={property} />
        );

        return (
          <React.Fragment>
            <div id="new_property" className="card">
               <PropertyForm onFormChange={this.addNewProperty} property={null} />
            </div>
            
            <div id="property_list" className="card">
              {property_list}
            </div>

          </React.Fragment>
        );
    }else{
      if (error) {
        return <p>{error.message}</p>;
      }
  
      return <p className="loading">Loading</p>;

    }
  }
}

export default FetchData;