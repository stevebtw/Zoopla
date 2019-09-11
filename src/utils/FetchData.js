import React, { Component } from 'react';
import axios from 'axios';
import PropertyListing from "../components/PropertyListing";



class FetchData extends Component {
  constructor(props) {
    super(props);

    this.state = {
        properties : {},
        error: null
    };
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