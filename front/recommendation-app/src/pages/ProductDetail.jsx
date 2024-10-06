import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/ProductDetail.css';

const ProductDetail = () => {
    const { imageId } = useParams();  // ดึงค่า imageId จาก URL
    console.log("Image ID from URL:", imageId); // ตรวจสอบว่าค่า imageId ไม่เป็น undefined

    const [mainImage, setMainImage] = useState(Number(imageId));  // ใช้ imageId แปลงเป็นตัวเลขเป็นค่ารูปหลักเริ่มต้น
    const [images, setImages] = useState([]);  // เก็บรูปภาพที่ได้จาก API
    const [productDetails, setProductDetails] = useState(null);  // เก็บรายละเอียดสินค้า
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ฟังก์ชันสำหรับการดึงข้อมูลรูปภาพและรายละเอียดสินค้า
    const fetchProductDetails = async (imageId) => {
        const apiUrl = `http://45.154.27.170:5000/api/predict/${imageId}`;

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(apiUrl);
            const imageUrls = response.data.similar_images.map((item) =>
                `http://45.154.27.170:5000/static/images/${item.image}`
            );
            setImages(imageUrls);
            setProductDetails(response.data.similar_images[0]); // เก็บรายละเอียดสินค้าจาก API
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเรียก API:', error);
            setError('เกิดข้อผิดพลาดในการเรียก API');
        } finally {
            setLoading(false);
        }
    };

    // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component mount
    useEffect(() => {
        fetchProductDetails(imageId);
    }, [imageId]);

    // ฟังก์ชันเมื่อคลิกที่รูปคล้ายกัน
    const handleSimilarImageClick = (imageName) => {
        setMainImage(imageName);  // ตั้งค่ารูปหลักใหม่
        fetchProductDetails(imageName);  // ดึงข้อมูลรูปที่คล้ายกันใหม่
    };

    return (
        <div className="App">
            <h1 className='Header'>PRODUCT</h1>
            <section className='Main-Group'>
                {/* แสดงรูปหลัก */}
                <div className="product-Img">
                    <h2 className='ImgMain'></h2>
                    <img
                        src={`http://45.154.27.170:5000/static/images/${mainImage}.jpg`}
                        alt="Main"
                        style={{ width: '300px', cursor: 'pointer' }}
                    />
                </div>

                {/* แสดงรายละเอียดสินค้า */}
                {productDetails && (
                    <div className="product-details">
                        <h2>รายละเอียดสินค้า</h2>
                        <p><strong>ชื่อสินค้า:</strong> {productDetails.productDisplayName}</p>
                        <p><strong>หมวดหมู่:</strong> {productDetails.masterCategory}</p>
                        <p><strong>หมวดหมู่ย่อย:</strong> {productDetails.subCategory}</p>
                        <p><strong>สี:</strong> {productDetails.baseColour}</p>
                        <p><strong>เพศ:</strong> {productDetails.gender}</p>
                        <p><strong>ฤดูกาล:</strong> {productDetails.season}</p>
                        <p><strong>การใช้งาน:</strong> {productDetails.usage}</p>
                        <p><strong>ปี:</strong> {productDetails.year}</p>
                    </div>
                )}
            </section>

            {loading && <p>กำลังโหลด...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* แสดงรูปที่คล้ายกัน */}
            <div>
                <h2 className="recommendation-title">RECOMMENDATION</h2>
                <div className="image-container">
                    {images.length > 0 ? (
                        images.map((url, index) => {
                            const imageName = url.split('/').pop().split('.')[0];
                            return (
                                <div key={index} className="image-item">
                                    <img
                                        src={url}
                                        alt={`similar-image-${index}`}
                                        className="recommendation-image"
                                        onClick={() => handleSimilarImageClick(imageName)}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p>ยังไม่มีภาพที่แสดง</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
