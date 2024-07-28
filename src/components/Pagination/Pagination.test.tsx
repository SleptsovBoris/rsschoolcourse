import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';
import { expect, it, describe, beforeEach } from 'vitest';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { setCharacters } from '../../store/reducers/CharactersSlice';

describe('Pagination Component', () => {
  beforeEach(() => {
    store.dispatch(
      setCharacters({ characters: [], currentPage: 1, totalPages: 2 }),
    );
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?page=1']}>
          <Pagination />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('should update URL query parameter and call handlePageChange when page changes', () => {
    const { container } = renderComponent();
    const secondPageLink = container.querySelector('a[href="/?page=2"]');
    expect(secondPageLink).toBeInTheDocument();
    if (secondPageLink) {
      fireEvent.click(secondPageLink);
    }
    const { currentPage } = store.getState().characters;
    expect(currentPage).toBe(2);
  });
});
