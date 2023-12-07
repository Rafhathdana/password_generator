import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import "./Form.css";
import toast from "react-hot-toast";
import { getRandomChar, getSpecialChar } from "../utils/getRandomChar";

interface FormValues {
  capital: boolean;
  small: boolean;
  number: boolean;
  symbol: boolean;
  length: number;
}
interface FormProps {
  setResult: React.Dispatch<React.SetStateAction<string>>;
}
export const Form: React.FC<FormProps> = ({ setResult }) => {
  const formdetails = [
    { checkbox: true, label: "Capital", name: "capital" },
    { checkbox: true, label: "Small", name: "small" },
    { checkbox: true, label: "Number", name: "number" },
    { checkbox: true, label: "Symbol", name: "symbol" },
    { checkbox: false, label: "Length", name: "length", min: 6, max: 15 },
  ];

  const [values, setValues] = useState<FormValues>({
    capital: false,
    small: false,
    number: false,
    symbol: false,
    length: 6,
  });
  useEffect(() => {
    toast.dismiss();
    toast.error(
      "Did you know that over 80% of data breaches occur due to weak or reused passwords",
      {
        duration: 4000,
      }
    );
  }, []);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let generatedPassword: string = "";
    const fieldsArray = [
      values.capital ? { getChar: () => getRandomChar(65, 90) } : null,
      values.small ? { getChar: () => getRandomChar(97, 122) } : null,
      values.number ? { getChar: () => getRandomChar(48, 57) } : null,
      values.symbol ? { getChar: () => getSpecialChar() } : null,
    ].filter(Boolean) as { getChar: () => string }[];
    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * fieldsArray.length);
      console.log(fieldsArray[index], index);

      const letter = fieldsArray[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
      toast.success("Well! Well! Look who got a strong password", {
        duration: 3000,
      });
    } else {
      toast.error("Please select at least one option");
    }

    // Add your form submission logic here
  };

  const handleCheckboxChange = (name: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: !prevValues[name],
    }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: parseInt(value, 10),
    }));
  };

  const handleClear = () => {
    setValues({
      capital: false,
      small: false,
      number: false,
      symbol: false,
      length: 6,
    });
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
                onChange={() => handleCheckboxChange(data.name)}
                checked={values[data.name]}
              />
            ) : (
              <input
                type="number"
                id={data.name}
                min={data.min}
                max={data.max}
                name={data.name}
                onChange={handleNumberChange}
                value={values[data.name]}
              />
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
