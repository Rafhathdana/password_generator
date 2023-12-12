import React from "react";
import { FaClipboard, FaTrash } from "react-icons/fa";
import "./Passwords.css";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function Passwords() {
  const [storedPass, setStoredPass] = useState([]);
  useEffect(() => {
    const existingPasswordsString = localStorage.getItem("savedPasswords");
    setStoredPass(
      existingPasswordsString ? JSON.parse(existingPasswordsString) : []
    );
  }, [storedPass]);

  const handleClipboard = async (result: string) => {
    toast.dismiss();
    if (!result) {
      toast.error("No text to copy");
      return;
    }
    await navigator.clipboard.writeText(result);
    toast.success("Text Copied to clipboard");
  };

  const handleDelete = (data: string, index: number) => {
    // Implement your delete logic here
    storedPass.splice(index, 1); // Add to the beginning of the array
    // Save the updated list back to local storage
    localStorage.setItem("savedPasswords", JSON.stringify(storedPass));

    toast.success("Password saved successfully");
    console.log("Delete password:", data, index);
  };

  return (
    <>
      <div className="container">
        {storedPass.map((data: string, index: number) => (
          <div className="stored" key={index}>
            <div className="stored-data">{data}</div>
            <div className="stored-action-buttons">
              <div
                className="clipboard"
                onClick={() => handleClipboard(data)}
                title="Click to Copy Password"
              >
                <FaClipboard />
              </div>
              <div
                className="deleteTo"
                onClick={() => handleDelete(data, index)}
                title="Click to Delete Password"
              >
                <FaTrash />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
