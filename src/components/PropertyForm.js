import React from 'react';
import './PropertyForm.css';

class PropertyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.property};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    // update State ready to list to parent onsubmit
    this.setState({
      [name]: value
    });
    
  }

  handleSubmit(event) {
    event.preventDefault();

    // FIXME form validation here. Switch statement to set error state
    const errors = false;

    this.setState({
      is_submiting : true
    });
    

    if(!errors){

      // lift state to parent
      // FIXME would use Redux and Routing with more time
      this.props.onFormChange(this.state);

    }
  }

  render() {
    return (
      <div className="property_form">

        <h3>Update this listing</h3>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Address</label>
            <input name="address" value={this.state.address} onChange={this.handleChange} />
          </div>

          <div>
            <label>Price</label>
            <input name="price" type="number" value={this.state.price} onChange={this.handleChange} />
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

          <div>
            <label>Bedrooms</label>
            <select name="bedrooms" value={this.state.bedrooms} onChange={this.handleChange}>
              {[1,2,3,4,5,6].map(n => (
                <option key={this.state.id + n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <input type="submit" className="button" value={this.state.is_submiting ? "Updating" : "Update"} />
        </form>
      </div>
    );
  }
}

export default PropertyForm;