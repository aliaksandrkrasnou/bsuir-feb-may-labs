import React from 'react';

export const Select = (props) => {
  const { onChange, fieldName, label, options } = props;

  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <div className="form-control">
      <label htmlFor={fieldName}>{label}</label>
      <select name={fieldName} id={fieldName} onChange={handleChange}>
        {options.map((option) => (
          <option key={`${fieldName}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
