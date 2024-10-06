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
  const [images, setImages] = useState([]);//URL
  const [showUploadSection, setShowUploadSection] = useState(true); //add


  const handleFileChange = (event) => {
    // setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file != null) {
      setFileName(file.name);
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      alert('กรุณาเลือกไฟล์ก่อน!');
      return;
    }

    // สร้าง form data เพื่อส่งไปยัง API
    const formData = new FormData();
    formData.append('img', selectedFile); // ใช้ 'img' เป็น key ตามที่ API กำหนด

    try {
      // ส่งคำขอ POST ไปยัง API
      const response = await axios.post('http://45.154.27.170:5000/api/predict/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // จัดการผลลัพธ์ที่ได้จาก API ที่นี่ (เช่น การตั้งค่า URL รูปภาพ)
      const resultData = response.data;//รับเป็น json
      const imageUrls = response.data.similar_images.map((item) =>
        `http://45.154.27.170:5000/static/images/${item.image}`
      );

      setImages(imageUrls); // อัปเดตสถานะด้วย URL ของภาพที่คล้ายกัน
      //navigate('/Recommendation');
      //navigate('/recommendation', { state: { images: imageUrls } });
      navigate('/recommendation', { state: { images: imageUrls, jsonData: resultData } });
      setShowUploadSection(false);//add

    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error); // จัดการข้อผิดพลาดที่เกิดขึ้น
    }
  };

  const handleNewUpload = () => {
    // รีเซ็ตค่าทั้งหมดเพื่อให้สามารถอัปโหลดภาพใหม่ได้

    // รีเซ็ตค่าที่จำเป็นสำหรับการอัพโหลดใหม่
    setFileName("No selected file");
    setSelectedFile(null);
    setUploadedImage(null);
    setImages([]); // รีเซ็ต URL ของภาพที่แนะนำ
    setShowUploadSection(true); // แสดงส่วนการอัพโหลดใหม่
    //setShowSidebar(true); // แสดง Sidebar ใหม่
  };






  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  const toggleModal = () => {
    if (isModalOpen) {
      // ถ้า modal ถูกเปิดอยู่ ก็ให้ทำการรีเซ็ตเมื่อปิด modal
      handleNewUpload();
    }
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
        {/* <ThemeToggle /> */}
      </nav>

      {isModalOpen && showUploadSection && (
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