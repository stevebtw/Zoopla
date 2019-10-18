import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import 'typeface-roboto';


const Header = (props) => {
  return (
    <React.Fragment>
      <header>
        Manage your {props.properties.length ? props.properties.length : ""} property listings
      </header>
      <nav>
        <NavLink to="/" activeClassName="selected" exact>Home</NavLink>
        <NavLink to={{
          pathname: '/new/',
          search: '?new=1'
        }} activeClassName="selected">New listing</NavLink>
        <NavLink to="/about/" activeClassName="selected">About</NavLink>
      </nav>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Header);