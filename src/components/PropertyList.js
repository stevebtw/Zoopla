import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropertyListing from "./PropertyListing";

class PropertyList extends Component {

  componentDidMount() {
    document.title = "Listing Manager";
  }

  render() {
    const { properties, error } = this.props;

    if (properties && properties.length) {
      // build property list here for performance
      const property_list = properties.map((property, i) =>
        <PropertyListing idx={i} key={property.id} property={property} />
      );

      return (
        <React.Fragment>

          <div id="property_list" className="card">
            {property_list}
          </div>

        </React.Fragment>
      );
    } else {
      if (error) {
        return <p>{error.message}</p>;
      }

      return <p className="loading">Loading</p>;

    }
  }
}


const mapStateToProps = state => {
  return {
    properties: state.properties
  }
}

export default connect(mapStateToProps)(PropertyList);