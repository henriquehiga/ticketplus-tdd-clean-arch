import axios from "axios";
import { useState } from "react";
import QrReader from "react-web-qr-reader";

const App = () => {
  const delay = 500;
  const previewStyle = {
    height: 240,
    width: 320,
  };
  const [result, setResult] = useState<any>(null);

  const handleScan = async (result: any) => {
    if (result) {
      alert(result.data);
      try {
        const data = await axios.post("http://localhost:3035/use-ticket", {
          id: result.data,
        });
        if (data.data.statusCode > 200) {
          alert(data.data.message);
        } else {
          alert("Autorizado");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleError = (error: any) => {
    alert(JSON.stringify(error));
  };

  return (
    <>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result}</p>
    </>
  );
};

export default App;
