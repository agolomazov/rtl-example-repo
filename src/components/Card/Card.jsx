import { useContext, useState } from 'react';

import './Card.css';

import heartOutlined from '../../svgs/heartOutlined.svg';
import heartFilled from '../../svgs/heartFilled.svg';
import { PetsContext } from '../Pets/Pets';

const Card = ({ name, phone, email, image, favoured, index }) => {
  const [isFavoured, setIsFavourder] = useState(favoured);
  const { cats, setCats } = useContext(PetsContext);

  const toggleFavoured = () => {
    updateFavourite(index, !isFavoured);
    setIsFavourder(!isFavoured);
  }

    const updateFavourite = (index, favoured) => {
      const updatedCats = [...cats];
      updatedCats[index].favoured = favoured;
      setCats(updatedCats);
    };

  return (
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={toggleFavoured}>
          <img
            src={isFavoured ? heartFilled : heartOutlined}
            alt={isFavoured ? 'filled heart' : 'outlined heart'}
          />
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;