import React, { useState, useEffect } from "react"
import axios from "axios";

function App() {

  const [data, setData] = useState([])
  const [file, setFile] = useState()
  const [name, setName] = useState()

  const getAllImage = async () => {
    await axios.get("http://localhost:8000")
      .then((res) => setData(res.data.allData))
      .catch((err) => console.log(err, " it is an error"))
  }

  useEffect(() => {
    getAllImage();
  }, []);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("testImage", file);
    formData.append("name", name)
    await axios.post("http://localhost:8000", formData)
      .then((res) => {
        console.log("okey")
        setName()
        setFile()
        getAllImage()
      })
      .catch((err) => console.log("not okey"))

  }
  return (
    <div className="App">
      <h1>Image Uploading React</h1>
      <div>
        <input type="text" placeholder="image name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="file" name="textImage" onChange={(e) => { setFile(e.target.files[0]) }} />
        <button onClick={() => handleFileUpload()} type="submit">Upload</button>
      </div>
      <div>
        {
          data.map((singleData, index) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.image.data.data))
            )
            return <img key={index} src={`data:image/png;base64,${base64String}`} width="300" height="200" />

          })
        }
      </div>

    </div>
  );
}

export default App;
