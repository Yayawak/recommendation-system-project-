import React from 'react';
import '../assets/styles/Recommendation.css';
// import { useLocation } from 'react-router-dom';

// const Recommendation = () => {
//   const location = useLocation();
//   const images = location.state?.images || []; // ตรวจสอบว่ามีข้อมูลหรือไม่

//   return (
//     <div className="App">
//       <h1>ภาพที่คล้ายกัน:</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {images.length > 0 ? (
//           images.map((url, index) => (
//             <div key={index} style={{ margin: '10px' }}>
//               <img src={url} alt={`similar-image-${index}`} style={{ width: '200px', height: '200px' }} />
//             </div>
//           ))
//         ) : (
//           <p>ยังไม่มีภาพที่แสดง</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recommendation;

// import { useLocation } from 'react-router-dom';

// const Recommendation = () => {
//   const location = useLocation();
//   const images = location.state?.images || []; // ตรวจสอบว่ามีข้อมูลหรือไม่

//   return (
//     <div className="App">
//       <h1>Recommended Products</h1>
//       <div className="image-container"> {/* ใช้คลาส image-container */}
//         {images.length > 0 ? (
//           images.map((url, index) => (
//             <div className="card" key={index}> {/* ใช้คลาส card */}
//               <img
//                 src={url}
//                 alt={`similar-image-${index}`}
//                 style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // ทำให้ภาพเต็มการ์ด
//               />
//             </div>
//           ))
//         ) : (
//           <p>ยังไม่มีภาพที่แสดง</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recommendation;



import '../assets/styles/Recommendation.css'; // นำเข้าไฟล์ CSS
import { useLocation } from 'react-router-dom';

const Recommendation = () => {
  const location = useLocation();
  const images = location.state?.images || []; // ตรวจสอบว่ามีข้อมูลหรือไม่

  // กำหนดรูปภาพเริ่มต้นหากไม่มีรูปภาพจาก API
  const defaultImages = [
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200'
  ];

  return (
    <div className="similar-images-container">
      <h1 className="recommendation-title">Recommended Products</h1>
      <div className="image-grid"> {/* ใช้คลาส image-grid */}
        {(images.length > 0 ? images : defaultImages).map((url, index) => (
          <div key={index} className="image-card"> {/* การ์ดครอบภาพ */}
            <img
              src={url}
              alt={`similar-image-${index}`}
              className="recommendation-image" // ใช้คลาส recommendation-image
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;








