import { useState } from 'react';
import '../assets/styles/Home.css';
import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';
import ButtonGroup from '../components/ButtonGroup';
import { Link } from 'react-router-dom';


const fashionItems = [
  { id: 1, src: "https://i.pinimg.com/564x/12/7f/0d/127f0d2ba8c221f9969084b1a95c7079.jpg", alt: "Pink dress" },
  { id: 2, src: "https://i.pinimg.com/474x/a7/cd/21/a7cd21ef9f6690022b99192eac700a90.jpg", alt: "Black pants"},
  { id: 3, src: "https://i.pinimg.com/474x/49/7f/55/497f554448e8a45b4055f4bbac6f9a76.jpg", alt: "Blue floral dress" },
  { id: 4, src: "https://i.pinimg.com/474x/bb/04/67/bb0467b77d3524eb6c3a7f878fbed598.jpg", alt: "Red dress" },
  { id: 5, src: "https://i.pinimg.com/474x/44/56/88/445688524356a43305a585b0c17c67f5.jpg", alt: "Green dress" },
  { id: 6, src: "https://i.pinimg.com/474x/5f/47/a7/5f47a736d11efc985e48252bd8e0a369.jpg", alt: "Blue jeans" },
];



const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = (fashionItems || []).filter((item) =>
    item.alt.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  return (
    <div className="home-page">
      <div className='search-bar-container'>
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className="search-results-container">
          <SearchResultsList searchTerm={searchTerm} />
        </div>
        <div className="button-group-container">
          <ButtonGroup />
        </div>
      </div>
      <div className="grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="card"> 
              <img src={item.src} alt={item.alt} className="card-image" />
              <div className="card-content">
                <p className="card-title">{item.alt}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No items found.</p> 
        )}
      </div>
    </div>
  );
};

export default Home;