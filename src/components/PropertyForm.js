import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './PropertyForm.css';
import { Input, TextArea } from './FormElements';



class PropertyForm extends React.Component {
  constructor(props) {
    super(props);

    let property = this.props.property || {
      address: "",
      title: "",
      price: ""
    }
    this.state = {
      ...property,
      is_submiting: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.props.history.push('/');
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // update State ready to list to parent onsubmit
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  addNewProperty() {
    const id = ++this.props.properties.length;
    const new_property = {
      ...this.state,
      id: "p" + id,
      active: true,
      images: ["/images/properties/property4_1.jpg"]
    }
    // POSTTOAPI SUCCESS
    this.props.onPropertyAdded(new_property);
    this.props.history.push("/");
  }

  editProperty() {
    // POSTTOAPI SUCCESS
    this.props.onPropertyEdit(this.state);
    this.props.history.push("/");
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = false;

    if (!errors) {

      this.setState(prevState => ({
        ...prevState,
        is_submiting: true
      }));

      setTimeout(() => {
        if (this.props.property) {
          this.editProperty();
        } else {
          this.addNewProperty();
        }
      }, 1000);

    }
  }


  render() {

    let button_label;
    if (this.props.property) {
      button_label = this.state.is_submiting ? "Updating" : "Update";
    } else {
      button_label = this.state.is_submiting ? "Adding" : "Add";
    }


    return (
      <div className="property_form page">

        <h3>{this.props.property ? "Update this" : "Add a new"} property</h3>


        <form onSubmit={this.handleSubmit}>

          <Input
            label="Address"
            name="address"
            value={this.state.address}
            changeHandler={this.handleChange}
          />

          <Input
            label="Price"
            name="price"
            value={this.state.price}
            changeHandler={this.handleChange}
          />

          <TextArea
            label="Description"
            name="description"
            value={this.state.description}
            changeHandler={this.handleChange}
          />

          <div>
            <label>Bedrooms</label>
            <select name="bedrooms" value={this.state.bedrooms} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label>List on portals?</label>
            <input
              type="checkbox"
              name="active"
              checked={this.state.active ? "checked" : ""}
              value={this.state.status}
              onChange={this.handleChange}
            />
          </div>


          <input type="submit" className="button" value={button_label} />

          <input type="button" className="button button_secondary" onClick={this.handleCancel} value="Close" />

        </form>
      </div>
    );


  }
}

const mapStateToProps = state => {
  return {
    properties: state.properties
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPropertyAdded: (new_property) => dispatch({ type: "ADD_PROPERTY", property: new_property }),
    onPropertyEdit: (new_property) => dispatch({ type: "UPDATE_PROPERTY", property: new_property }),
    onCloseNewProperty: () => dispatch({ type: "ADD_PROPERTY_FORM", status: false })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PropertyForm));