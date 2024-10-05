import React, { useState } from 'react'; 
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import ThemeToggle from './ThemeToggle'; // Ensure this path is correct

import '../assets/styles/Sidebar.css'; 

const Sidebar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [recommendedImages, setRecommendedImages] = useState([]);
  const [fileName, setFileName] = useState("No selected file");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
        // const response = await axios.post("http://localhost:5000/upload", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });

        // setRecommendedImages(response.data.recommendedImages);
        navigate('/Recommendation');
        
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <nav className="sidebar">
        <ul className="">
          <Link to="/"><h1>Fashion Recommender</h1></Link>
        </ul>

        <button 
          onClick={toggleModal}
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px',
            backgroundColor: '#ffffff',
            border: 'none',
            color: '#333',
            cursor: 'pointer'
          }}
        >
          Upload File
        </button>
        <ThemeToggle />
      </nav>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form
              className="upload-form"
              onClick={() => document.querySelector(".input-field").click()}
            >
              <input 
                type="file" 
                accept="image/*" 
                className="input-field" 
                hidden
                onChange={handleFileChange}
              />

              {uploadedImage ? (
                <img src={uploadedImage} width={150} height={150} alt={fileName} />
              ) : (
                <>
                  <MdCloudUpload color="#333" size={60} />
                  <p>Browse Files to upload</p>
                </>
              )}
            </form>

            <section className="uploaded-row">
              <AiFillFileImage color="#333" />
              <span className="upload-content">
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
                backgroundColor: '#8C8C8C',
                border: 'none',
                color: '#000000',
                cursor: 'pointer'
              }}
            >
              Get Recommendations
            </button>

            <button onClick={toggleModal} className="close-modal">
              Close
            </button>

            {recommendedImages.length > 0 && (
              <>
                <h2 style={{ marginTop: '20px' }}>Recommended Images</h2>
                <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                  {recommendedImages.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`Recommendation ${index + 1}`} width="150" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="content">
        {/* Other page content */}
      </div>
    </div>
  );
};

export default Sidebar;