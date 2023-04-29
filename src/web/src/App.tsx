import { useState } from "react";
import QrReader from "react-web-qr-reader";

const App = () => {
  const delay = 500;
  const previewStyle = {
    height: 240,
    width: 320,
  };

  const [result, setResult] = useState<any>(null);

  const handleScan = (result: any) => {
    if (result.data) {
      setResult(result.data);
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
