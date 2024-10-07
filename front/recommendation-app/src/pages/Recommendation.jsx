import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Recommendation.css';

const Recommendation = () => {
  const location = useLocation();
  const { images, jsonData, uploadedImage } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

  return (
    <div>

      <h1>Your Uploaded Image</h1>
      {/* แสดงภาพที่ผู้ใช้อัปโหลด */}
      {uploadedImage && (

        <div className="uploaded-image-container">

          <img
            src={uploadedImage}
            alt="Uploaded by user"

          />
        </div>
      )}

      <h2>Recommended Products</h2>

      <div className="recommendation-container"> {/* ใช้คลาส recommendation-container */}
        {images && images.map((image, index) => {
          const imageId = image.split('/').pop().split('.')[0]; // ดึง imageId จาก URL ของภาพ
          const productName = jsonData.similar_images[index]?.productDisplayName; //ดึงชื่อ
          return (
            <Link
              key={index}
              to={`/image-details/${imageId}`} // ส่งเฉพาะ imageId ไปยังหน้าแสดงรายละเอียด
            >
              <img src={image} alt={`Recommendation ${index + 1}`} />
              {productName && <p className="product-name">{productName}</p>} {/* แสดงชื่อสินค้า */}

            </Link>
          );
        })}
      </div>

      {/* แสดงข้อมูล JSON */}
      {/*<pre>{JSON.stringify(jsonData, null, 2)}</pre>*/}
    </div>
  );
};

export default Recommendation;