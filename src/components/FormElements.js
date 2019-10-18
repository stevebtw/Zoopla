import React from 'react';

// stateless
const Input = ({ label, name, value, changeHandler }) => {
    return (
        <div>
            <label>{label}</label>
            <input type="text" name={name} value={value} required onChange={changeHandler} />
        </div>
    )
}

const TextArea = ({ label, name, value, changeHandler }) => {
    return (
        <div>
            <label>{label}</label>
            <textarea name={name} value={value} required onChange={changeHandler} />
        </div>
    )
}

export { Input, TextArea };