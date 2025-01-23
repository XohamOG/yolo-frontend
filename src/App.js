import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDetect = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/detect/", formData);


      print("hiii");





      setResults(response.data.detections);
    } catch (error) {
      console.error("Error detecting objects:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>YOLO Image Detection</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleDetect} disabled={!image}>Detect</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.label} - Confidence: {(result.confidence * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
