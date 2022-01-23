import { useContext } from 'react';
import Card from '../Card/Card';
import { PetsContext } from '../Pets/Pets';

import './Cards.css';

const Cards = () => {
  const { cats } = useContext(PetsContext);

  return (
    <div className="pet-cards-container">
      {cats.map((cat, index) => (
        <Card key={cat.id} {...cat} index={index} />
      ))}
    </div>
  );
}

export default Cards;