import { useParams } from 'react-router-dom';
import '../assets/styles/ProductDetail.css';
import { Link } from 'react-router-dom';

const fashionItems = [
    { id: 1, src: "https://i.pinimg.com/564x/12/7f/0d/127f0d2ba8c221f9969084b1a95c7079.jpg", alts: "Pink dress", description: "Beautiful pink dress for any occasion." },
    { id: 2, src: "https://i.pinimg.com/474x/a7/cd/21/a7cd21ef9f6690022b99192eac700a90.jpg", alts: "Black pants", description: "Comfortable black pants suitable for work or casual wear." },
    { id: 3, src: "https://i.pinimg.com/474x/49/7f/55/497f554448e8a45b4055f4bbac6f9a76.jpg", alts: "Blue floral dress", description: "A floral blue dress perfect for summer days." },
    { id: 4, src: "https://i.pinimg.com/474x/bb/04/67/bb0467b77d3524eb6c3a7f878fbed598.jpg", alts: "Red dress", description: "Stunning red dress for evening events." },
    { id: 5, src: "https://i.pinimg.com/474x/44/56/88/445688524356a43305a585b0c17c67f5.jpg", alts: "Green dress", description: "Green dress, a fresh look for any occasion." },
    { id: 6, src: "https://i.pinimg.com/474x/5f/47/a7/5f47a736d11efc985e48252bd8e0a369.jpg", alts: "Blue jeans", description: "Stylish blue jeans, suitable for casual outings." },
];

const ProductDetail = () => {

    const { id } = useParams(); // id form URL
    const product = fashionItems.find(item => item.id === parseInt(id)); // find id

    if (!product) {
        return <p>Product not found.</p>; // if not found
    }

    // filter product
    const relatedItems = fashionItems.filter(item => item.id !== parseInt(id));


    return (
        <>
        <section className="product-detail">
            <div className='imags'>
                <img src={product.src} alt={product.alts} className="product-image" />
            </div> 
            <div className='detail'>
                <h1 className='item-name'>{product.alts}</h1>
                <p className='item-detail'>{product.description}</p> 
            </div>
        </section>   
        

            <section className='recomment-product'>
                <div className="related-products">
                <h2 className='rec-product'>Recommended Products</h2>
                <div className="related-grid">
                    {relatedItems.map((relatedItem) => (
                        <div key={relatedItem.id} className="related-item">
                            <Link to={`/product/${relatedItem.id}`}>
                                <img src={`http://45.154.27.170:5000/static/images/${relatedItem.image}`}
                                    alt={relatedItem.productDisplayName} className="related-image" />
                                <p>{relatedItem.alts}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            </section>
            
        </>
    );
};

export default ProductDetail;