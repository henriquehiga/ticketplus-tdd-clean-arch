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
    if (result) {
      setResult(result);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
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
