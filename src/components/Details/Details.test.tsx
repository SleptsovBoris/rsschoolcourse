import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';
import { SearchResult } from '../../types';

const mockCharacter: SearchResult = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  created: '2017-11-04T18:48:46.250Z',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const mockFetch = () => {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: () => this as unknown as Response,
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    json: () => Promise.resolve(mockCharacter),
    text: () => Promise.resolve(''),
  } as unknown as Response);
};

describe('Details Component', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);
  });

  it('should display a loading indicator while fetching data', async () => {
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );
    await expect(screen.getByTestId('Loader')).toBeInTheDocument();
  });

  it('should correctly display the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument(),
    );
    expect(screen.getByText(/Status:/i)).toHaveTextContent('Status: Alive');
    expect(screen.getByText(/Species:/i)).toHaveTextContent('Species: Human');
    expect(screen.getByText(/Gender:/i)).toHaveTextContent('Gender: Male');
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });
});
