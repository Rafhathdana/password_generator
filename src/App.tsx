import { useState } from "react";
import "./App.css";
import { FaClipboard, FaPlus } from "react-icons/fa";
import { Form } from "./component/Form";
import { toast } from "react-hot-toast";
import Passwords from "./component/Passwords";
import Heading from "./component/Heading";
function App() {
  const [result, setResult] = useState("");
  const handleClipboard = async () => {
    toast.dismiss();
    if (!result) {
      toast.error("No text to copy");
      return;
    }
    await navigator.clipboard.writeText(result);
    toast.success("Text Copied to clipboard");
  };
  const handleSaveTo = async () => {
    if (!result) {
      toast.error("No text to Save");
      return;
    }

    // Retrieve existing passwords from local storage
    const existingPasswordsString = localStorage.getItem("savedPasswords");
    const existingPasswords = existingPasswordsString
      ? JSON.parse(existingPasswordsString)
      : [];
    if (existingPasswords.length > 9) {
      toast.error("Maximum Password Stored");
      return;
    }
    // Add the new password to the list
    if (existingPasswords.length > 0 && existingPasswords[0] == result) {
      toast.error("Already Password Stored");
      return;
    }
    existingPasswords.unshift(result); // Add to the beginning of the array

    // Save the updated list back to local storage
    localStorage.setItem("savedPasswords", JSON.stringify(existingPasswords));

    toast.success("Password saved successfully");
  };

  return (
    <>
      <center className="mt">
        <Heading Words="Password Generator" />
      </center>
      <div className="flex">
        <section className="column">
          <Heading Words="Generate Password" />
          <div className="container">
            <div className="result">
              <div id="result">{result}</div>
              <div className="action-buttons">
                <div
                  className="clipboard"
                  onClick={handleClipboard}
                  title="Click to Copy Password"
                >
                  <FaClipboard />
                </div>
                <div
                  className="saveto"
                  onClick={handleSaveTo}
                  title="Click to Save Password"
                >
                  <FaPlus />
                </div>
              </div>
            </div>
            <Form setResult={setResult} />
          </div>
        </section>
        <section className="column">
          <Heading Words="Stored Password" />

          <Passwords />
        </section>
      </div>
    </>
  );
}

export default App;
