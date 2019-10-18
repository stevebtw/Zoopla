const initialState = {
    properties: [],
    error: false,
    is_first_load: true,

    is_adding_new_property: false,
    is_submiting: false
}
const reducer = (state = initialState, action) => {
    if (action.type === "ADD_PROPERTIES") {
        return {
            ...state,
            properties: state.properties.concat(action.properties),
            is_first_load: false
        }
    }
    if (action.type === "ADD_PROPERTY_FORM") {
        return {
            ...state,
            is_adding_new_property: action.status
        }
    }
    if (action.type === "ADD_PROPERTY") {
        const newProperties = state.properties.filter(prop => true);
        newProperties.unshift(action.property);
        return {
            ...state,
            properties: newProperties,
            is_adding_new_property: false
        }
    }

    if (action.type === "UPDATE_PROPERTY") {
        //  const newProperties = Array.from(state.properties);
        const newProperties = state.properties.filter(prop => true);
        let foundIndex = newProperties.findIndex(element => element.id === action.property.id);
        newProperties.splice(foundIndex, 1, action.property);

        return {
            ...state,
            properties: newProperties
        }
    }

    if (action.type === "SELECT_PROPERTY") {
        return {
            ...state,
            is_selected: !state.is_selected
        }
    }
    return state;
}

export default reducer;