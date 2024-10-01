import { useState } from 'react';
import '../assets/styles/Home.css';
import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';
import ButtonGroup from '../components/ButtonGroup';

const fashionItems = [
  { id: 1, src: "https://example.com/dress1.jpg", alt: "Pink dress" },
  { id: 2, src: "https://example.com/pants1.jpg", alt: "Black pants" },
  { id: 3, src: "https://example.com/dress2.jpg", alt: "Blue floral dress" },
  { id: 4, src: "https://example.com/dress3.jpg", alt: "Red dress" },
  { id: 5, src: "https://example.com/dress4.jpg", alt: "Green dress" },
  { id: 6, src: "https://example.com/pants2.jpg", alt: "Blue jeans" },
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
            <div key={item.id} className="card">
              <img src={item.src} alt={item.alt} className="card-image" />
              <div className="card-content">
                <p className="card-title">{item.alt}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p> 
        )}
      </div>
    </div>
  );
};

export default Home;