import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Recommendation.css';

const Recommendation = () => {
  const location = useLocation();
  const { images, jsonData, uploadedImage } = location.state || {};

  return (
    <div>

      <h1>Your Uploaded Image</h1>
      {uploadedImage && (

        <div className="uploaded-image-container">

          <img
            src={uploadedImage}
            alt="Uploaded by user"

          />
        </div>
      )}

      <h2>Recommended Products</h2>

      <div className="recommendation-container">
        {images && images.map((image, index) => {
          const imageId = image.split('/').pop().split('.')[0];
          const productName = jsonData.similar_images[index]?.productDisplayName;
          return (
            <Link
              key={index}
              to={`/image-details/${imageId}`}
            >
              <img src={image} alt={`Recommendation ${index + 1}`} />
              {productName && <h2 className="product-name">{productName}</h2>} {/* แสดงชื่อสินค้า */}

            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default Recommendation;