import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class FetchData extends React.Component {
    getData() {
        axios.get("/data.json")
            .then(response => {
                if (response && response.data && response.data.properties && response.data.properties.length) {
                    this.props.onPropertiesFetched(response.data.properties);
                }
            })
            .catch((error) => {
                console.debug(error);
                // this.setState({
                //   error
                // });
            });
    }
    componentDidMount() {
        if (this.props.is_first_load) {
            this.getData();
        }
    }
    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        is_first_load: state.is_first_load,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPropertiesFetched: (property_list) => dispatch({ type: "ADD_PROPERTIES", properties: property_list }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchData);