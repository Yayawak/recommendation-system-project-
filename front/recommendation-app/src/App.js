import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Recommendation from './pages/Recommendation';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Recommendation" element={<Recommendation />} />
      </Routes>
    </Router>

  );
}

export default App;
