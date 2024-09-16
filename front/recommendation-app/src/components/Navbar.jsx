import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [recommendedImages, setRecommendedImages] = useState([]);
  const [fileName, setFileName] = useState("No selected file");
  const navigate = useNavigate(); // Hook for navigation

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setRecommendedImages(response.data.recommendedImages);

        // Navigate to the recommendations page
        navigate('/Recommendation');
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-links">
          <Link to="/"><h1 style={{ color: 'white', marginBottom: '1rem' }}>Fashion Recommender</h1></Link>
          
          {/* Add other links if necessary */}
        </ul>

        <form
          className="upload-form"
          onClick={() => document.querySelector(".input-field").click()}
        >
          <input 
            type="file" 
            accept='image/*' 
            className='input-field' 
            hidden
            onChange={handleFileChange}
          />

          {uploadedImage ? (
            <img src={uploadedImage} width={150} height={150} alt={fileName} />
          ) : (
            <>
              <MdCloudUpload color='#ffffff' size={60} />
              <p style={{ color: '#ffffff' }}>Browse Files to upload</p>
            </>
          )}
        </form>

        <section className='uploaded-row'>
          <AiFillFileImage color='#ffffff' />
          <span className='upload-content' style={{ color: '#ffffff' }}>
            {fileName} - 
            <MdDelete
              onClick={() => {
                setFileName("No selected File");
                setUploadedImage(null);
                setSelectedFile(null);
              }}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
          </span>
        </section>

        <button 
          onClick={handleUpload}
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px',
            backgroundColor: '#f0c040',
            border: 'none',
            color: '#333',
            cursor: 'pointer'
          }}
        >
          Upload and Get Recommendations
        </button>

        {recommendedImages.length > 0 && (
          <>
            <h2 style={{ color: 'white', marginTop: '20px' }}>Recommended Images</h2>
            <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
              {recommendedImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Recommendation ${index + 1}`} width="150" />
                </div>
              ))}
            </div>
          </>
        )}
      </nav>

      <div className="content">
        {/* Other page content */}
      </div>
    </div>
  );
};

export default Navbar;
