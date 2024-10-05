import React from 'react';
import "../assets/styles/SearchResult.css";

const SearchResult = ({ result }) => {
    return (
        <div className='search-result' onClick={() => alert(`You clicked on ${result.productDisplayName}`)}>
            <img 
                src={`http://45.154.27.170:5000/static/images/${result.image}`} 
                alt={result.productDisplayName} 
                style={{ width: '200px' }} 
            />
            <h3>{result.productDisplayName}</h3>
        </div>
    );
};

export default SearchResult;
