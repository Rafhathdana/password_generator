import { useState } from "react";
import "./App.css";
import { FaClipboard } from "react-icons/fa";
import { Form } from "./component/Form";
import { toast } from "react-hot-toast";
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
  return (
    <>
      <section>
        <div className="container">
          <div className="result">
            <div id="result">{result}</div>
            <div className="clipboard" onClick={handleClipboard}>
              <FaClipboard />
            </div>
          </div>
          <Form setResult={setResult} />
        </div>
      </section>
    </>
  );
}

export default App;
