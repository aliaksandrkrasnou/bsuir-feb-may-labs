import React from 'react';

export const Input = (props) => {
  const { onChange, fieldName, label, placeholder } = props;

  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <div className="form-control">
      <label htmlFor={fieldName}>{label}</label>
      <input id={fieldName} name={fieldName} placeholder={placeholder || ''} type="text" onChange={handleChange} />
    </div>
  );
};
