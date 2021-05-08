import React from 'react';

export const SubmitButton = (props) => {
  const { onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="form-control">
      <button className="button" id="filterSubmit" onClick={handleSubmit}>
        Filter
      </button>
    </div>
  );
};
