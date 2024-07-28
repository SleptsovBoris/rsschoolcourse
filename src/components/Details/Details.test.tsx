import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Details from './Details';
import { ICharacter } from '../../types';
import characterDetailsReducer, {
  setCurrentDetails,
  setIsLoading,
} from '../../store/reducers/DetailsSlice';
import { characterAPI } from '../../services/CharacterService';

const mockCharacter: ICharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  created: '2017-11-04T18:48:46.250Z',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const store = configureStore({
  reducer: {
    characterDetails: characterDetailsReducer,
    [characterAPI.reducerPath]: characterAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterAPI.middleware),
});

describe('Details Component', () => {
  beforeEach(() => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setCurrentDetails(null));
  });

  it('should display a loading indicator while fetching data', async () => {
    store.dispatch(setIsLoading(true));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId('Loader')).toBeInTheDocument();
  });

  it('should correctly display the detailed card data', async () => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setCurrentDetails(mockCharacter));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.getByText(/Status:/i)).toHaveTextContent(
        `Status: ${mockCharacter.status}`,
      );
      expect(screen.getByText(/Species:/i)).toHaveTextContent(
        `Species: ${mockCharacter.species}`,
      );
      expect(screen.getByText(/Gender:/i)).toHaveTextContent(
        `Gender: ${mockCharacter.gender}`,
      );
      expect(screen.getByAltText(mockCharacter.name)).toBeInTheDocument();
    });
  });

  // it('should display an error message when there is an error', async () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/details/1']}>
  //         <Routes>
  //           <Route path="/details/:id" element={<Details />} />
  //         </Routes>
  //       </MemoryRouter>
  //     </Provider>,
  //   );

  //   await waitFor(() =>
  //     expect(
  //       screen.getByText('Произошла ошибка при загрузке'),
  //     ).toBeInTheDocument(),
  //   );
  // });

  // it('should display when no data is available', async () => {
  //   store.dispatch(setCurrentDetails(null));

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/details/2']}>
  //         <Routes>
  //           <Route path="/details/:id" element={<Details />} />
  //         </Routes>
  //       </MemoryRouter>
  //     </Provider>,
  //   );

  //   await waitFor(() =>
  //     expect(screen.getByText('Нет данных')).toBeInTheDocument(),
  //   );
  // });
});
