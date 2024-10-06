// import React from 'react';
// import '../assets/styles/Recommendation.css';
// import { useLocation } from 'react-router-dom';

// const Recommendation = () => {
//   const location = useLocation();
//   const images = location.state?.images || []; // ตรวจสอบว่ามีข้อมูลหรือไม่

//   // กำหนดรูปภาพเริ่มต้นหากไม่มีรูปภาพจาก API
//   const defaultImages = [
//     'https://via.placeholder.com/200',
//     'https://via.placeholder.com/200',
//     'https://via.placeholder.com/200',
//     'https://via.placeholder.com/200',
//     'https://via.placeholder.com/200'
//   ];

//   return (
//     <div className="similar-images-container">
//       <h1 className="recommendation-title">Recommended Products</h1>
//       <div className="image-grid"> {/* ใช้คลาส image-grid */}
//         {(images.length > 0 ? images : defaultImages).map((url, index) => (
//           <div key={index} className="image-card"> {/* การ์ดครอบภาพ */}
//             <img
//               src={url}
//               alt={`similar-image-${index}`}
//               className="recommendation-image" // ใช้คลาส recommendation-image
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recommendation;


// import React from 'react';
// import '../assets/styles/Recommendation.css';
// import { useLocation } from 'react-router-dom';


// const Recommendation = () => {
//   const location = useLocation();
//   const { images, jsonData } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

//   return (
//     <div>
//       <h1>Recommendations</h1>
//       <div>
//         {images && images.map((image, index) => (
//           <img key={index} src={image} alt={`Recommendation ${index + 1}`} />
//         ))}
//       </div>

//       {/* คุณสามารถใช้ jsonData เพื่อแสดงข้อมูลอื่นๆ ที่มาจาก API ได้ */}
//       <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//     </div>
//   );
// };
// export default Recommendation;
//ล่า
// import React from 'react';
// import '../assets/styles/Recommendation.css';
// import { useLocation } from 'react-router-dom';

// const Recommendation = () => {
//   const location = useLocation();
//   const { images, jsonData } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

//   return (
//     <div>
//       <h1>Recommendations</h1>
//       <div className="recommendation-container"> {/* ใช้คลาส recommendation-container */}
//         {images && images.map((image, index) => (
//           <img key={index} src={image} alt={`Recommendation ${index + 1}`} />
//         ))}
//       </div>

//       {/* คุณสามารถใช้ jsonData เพื่อแสดงข้อมูลอื่นๆ ที่มาจาก API ได้ */}
//       <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//     </div>
//   );
// };

//export default Recommendation;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom'; // import Link
// import '../assets/styles/Recommendation.css';

// const Recommendation = () => {
//   const location = useLocation();
//   const { images, jsonData } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

//   return (
//     <div>
//       <h1>Recommendations</h1>
//       <div className="recommendation-container"> {/* ใช้คลาส recommendation-container */}
//         {images && images.map((image, index) => (
//           <Link
//             key={index}
//             to={`/image-details/${index}`} // ลิงก์ไปยังหน้าแสดงรายละเอียดของภาพ
//             state={{ image, jsonData }} // ส่งข้อมูลของภาพและ jsonData ไปยังหน้าใหม่
//           >
//             <img src={image} alt={`Recommendation ${index + 1}`} />
//           </Link>
//         ))}
//       </div>

//       {/* แสดงข้อมูล JSON */}
//       <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//     </div>
//   );
// };

// export default Recommendation;


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom'; // Import Link เพื่อใช้ลิงก์ไปยังหน้าอื่น
// import '../assets/styles/Recommendation.css';

// const Recommendation = () => {
//   const location = useLocation();
//   const { images, jsonData } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

//   return (
//     <div>
//       <h1>Recommendations</h1>
//       <div className="recommendation-container"> {/* ใช้คลาส recommendation-container */}
//         {images && images.map((image, index) => (
//           <Link
//             key={index}
//             to={`/details/${index}`} // ลิงก์ไปยังหน้ารายละเอียดของรูปภาพที่มีอยู่แล้ว
//             state={{ image, jsonData }} // ส่งข้อมูลภาพและ JSON ไปยังหน้าแสดงรายละเอียด
//           >
//             <img src={image} alt={`Recommendation ${index + 1}`} />
//           </Link>
//         ))}
//       </div>

//       {/* แสดงข้อมูล JSON */}
//       <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//     </div>
//   );
// };

// export default Recommendation;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Recommendation.css';

const Recommendation = () => {
  const location = useLocation();
  const { images, jsonData } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

  return (
    <div>
      <h1>Recommendations</h1>
      <div className="recommendation-container"> {/* ใช้คลาส recommendation-container */}
        {images && images.map((image, index) => {
          const imageId = image.split('/').pop().split('.')[0]; // ดึง imageId จาก URL ของภาพ
          return (
            <Link
              key={index}
              to={`/image-details/${imageId}`} // ส่งเฉพาะ imageId ไปยังหน้าแสดงรายละเอียด
            >
              <img src={image} alt={`Recommendation ${index + 1}`} />
            </Link>
          );
        })}
      </div>

      {/* แสดงข้อมูล JSON */}
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default Recommendation;













