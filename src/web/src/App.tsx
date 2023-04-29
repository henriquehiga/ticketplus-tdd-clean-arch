import { useState } from "react";
import QrReader from "react-web-qr-reader";

const App = () => {
  const delay = 500;
  const previewStyle = {
    height: 240,
    width: 320,
  };

  const [result, setResult] = useState<string>("");

  const handleScan = (result: string | null) => {
    alert(JSON.stringify(result));
    if (result) {
      setResult(JSON.stringify(result));
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
