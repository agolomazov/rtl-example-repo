import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import './Pets.css';

import Filter from '../Filter/Filter';
import Cards from '../Cards/Cards';

export const PetsContext = createContext({
  cats: [],
  setCats: () => {}
});

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({
    gender: 'any',
    favoured: 'any'
  });

  const fetchCats = async () => {
    const catsResponse = await axios.get('http://localhost:4000/cats');
    setCats(catsResponse.data);
    setFilteredCats(catsResponse.data);
  }

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];

    if (filters.gender !== 'any') {
      catsFiltered = catsFiltered.filter(
        (cat) => cat.gender === filters.gender
      );
    }

    if (filters.favoured !== 'any') {
      catsFiltered = catsFiltered.filter(
        (cat) => {
          if (filters.favoured === 'favourite' && cat.favoured === true) {
            return true;
          }

          if (filters.favoured === 'not favourite' && cat.favoured === false) {
            return true;
          }

          return false;
        }
      );
    }

    setFilteredCats(catsFiltered);
  }, [filters, setFilteredCats, cats])

  return (
    <div className="container">
      <div className="app-container">
        <PetsContext.Provider value={{ cats: filteredCats, setCats }}>
          <Filter filters={filters} setFilters={setFilters} />
          <Cards />
        </PetsContext.Provider>
      </div>
    </div>
  );
};

export default Pets;