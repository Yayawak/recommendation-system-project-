import React from 'react';
import SearchResult from './SearchResult';
import '../assets/styles/SearchResultsList.css';

const SearchResultsList = ({ results = [] }) => {
    if (!Array.isArray(results) || results.length === 0) {
        return <p>No results found.</p>;
    }

    return (
        <div className="results-list">
            {results.map((result, id) => (
                <SearchResult key={id} result={result} />
            ))}
        </div>
    );
};

export default SearchResultsList;
