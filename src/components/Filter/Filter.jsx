import { useRef } from 'react';
import './Filter.css';

const Filter = ({ filters, setFilters }) => {
  const favouriteFilterRef = useRef();
  const genderFilterRef = useRef();

  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favourite">Favourite</label>
        <select
          className="form-select"
          name="favourite"
          id="favourite"
          onChange={(e) =>
            setFilters({
              ...filters,
              favoured: e.target.value,
            })
          }
          ref={favouriteFilterRef}
        >
          <option value="any">Any</option>
          <option value="favourite">Favourite</option>
          <option value="not favourite">Not Favourite</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">Gender</label>
        <select
          className="form-select"
          name="gender"
          id="gender"
          onChange={(e) =>
            setFilters({
              ...filters,
              gender: e.target.value,
            })
          }
          ref={genderFilterRef}
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="filter-container">
        <button
          className="btn btn-primary"
          onClick={() => {
            setFilters({
              favoured: 'any',
              gender: 'any',
            });
            favouriteFilterRef.current.value = 'any';
            genderFilterRef.current.value = 'any';
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filter;