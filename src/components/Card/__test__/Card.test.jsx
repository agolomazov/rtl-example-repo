import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetsContext } from '../../Pets/Pets';

import Card from '../Card';
import catsMock from '../../../mocks/cats.json';

const cardProps = {
  name:"Sydney",
  phone:"111-222-333",
  email:"laith@hotmail.com",
  image:{
    url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    alt: 'cute cat',
  },
  favoured: false,
  updateFavourite: () => {},
  index: 0
};

const renderCardComponentWithProps = (props) => {
  render(
    <PetsContext.Provider value={{ cats: catsMock, setCats: () => {} }}>
      <Card {...props} />
    </PetsContext.Provider>
  );
}

describe('Card component', () => {
  test('should show name of cat', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.getByRole('heading', {
      name: /sydney/i
    })).toBeInTheDocument();

  });

  test('should show phone number', () => {
    renderCardComponentWithProps(cardProps);

    expect(
      screen.getByText(/111-222-333/i)
    ).toBeInTheDocument();
  });

  test('should show phone email', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.getByText(/laith@hotmail.com/i)).toBeInTheDocument();
  });

  test('should show image with correct src', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test('should show outlined heart', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test('should show filled heart', () => {
    renderCardComponentWithProps({
      ...cardProps,
      favoured: true
    });

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test('should toggle heart status', () => {
    renderCardComponentWithProps(cardProps);

    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
});