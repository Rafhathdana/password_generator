import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
export const Form = () => {
  const formdetails = [
    { checkbox: true, label: "Capital", name: "capital" },
    { checkbox: true, label: "Small", name: "small" },
    { checkbox: true, label: "Number", name: "number" },
    { checkbox: true, label: "Symbol", name: "symbol" },
    { number: true, label: "Length", name: "length", min: 6, max: 15 },
  ];
  const [values, setValues] = useState({
    capital: false,
    small: false,
    number: false,
    symbol: false,
    length: 6,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleCheckboxChange = (name) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: !prevValues[name],
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: parseInt(value, 10),
    }));
  };

  return (
    <>
      <form id="pg-form" onSubmit={handleSubmit}>
        {formdetails.map((data, index) => (
          <div className="field" key={index}>
            <label htmlFor={data.name}>{data.label}</label>
            {data.checkbox ? (
              <input
                type="checkbox"
                role="switch"
                id={data.name}
                name={data.name}
                onChange={setValues}
                checked={values[data.name]}
              />
            ) : (
              <>
                <input
                  type="number"
                  id={data.name}
                  min={data.min}
                  max={data.max}
                  name={data.name}
                  onChange={setValues}
                  value={values[data.name]}
                />
              </>
            )}
          </div>
        ))}
        <div className="btn-group">
          <button type="submit">Generate Password</button>
          <button className="clear" type="button" onClick={handleClear}>
            <MdOutlineClear />
          </button>
        </div>
      </form>
    </>
  );
};
