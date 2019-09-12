import React from 'react';
import './PropertyForm.css';


// stateless
const Input = ({label, name, value, changeHandler}) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" name={name} value={value} required onChange={changeHandler} />
    </div>
  )
}


class PropertyForm extends React.Component {
  constructor(props) {
    super(props);

    // spread property object into state and it will get lifed to parent onsubmit
    this.state = {
      ...props.property
    };

    this.handleAddProperty = this.handleAddProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddProperty(){
    this.setState(state => ({
      is_adding: !state.is_adding
    }));
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
      is_adding    : false,
      is_submiting : true
    });
    

    if(!errors){

      // lift state to parent
      // FIXME would use Redux and Routing with more time
      this.props.onFormChange(this.state);

      // clear form for next time
      this.setState({
        address : "",
        price   : "",
        description : ""
      });

    }
  }

  render() {

    // User feedback
    let button_label;
    if(this.props.property){
      button_label = this.state.is_submiting ? "Updating" : "Update";
    }else{
      button_label = this.state.is_submiting ? "Adding" : "Add";
    }
    
    // show form when editing (has property object) or adding a new
    if(this.props.property || this.state.is_adding){
      return (
        <div className="property_form">

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

            <Input 
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
     
          </form>
        </div>
     );
   }else{
     return <button className="button" onClick={this.handleAddProperty}>Add new property</button>;
   }
  }
}

export default PropertyForm;