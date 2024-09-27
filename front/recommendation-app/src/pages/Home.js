import { useState } from 'react';
import '../assets/styles/Home.css';
import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';
import ButtonGroup from '../components/ButtonGroup';

const Home = () => {
  const [results, setResults] = useState([])
  return (
    <div className="home-page">
      <div className='search-bar-container'>
        <SearchBar setResults={setResults} />
        <div className="search-results-container">
          <SearchResultsList results={results} />
        </div>
        <div className="button-group-container">
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default Home;