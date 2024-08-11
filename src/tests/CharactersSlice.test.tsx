import charactersReducer, {
  setCharacters,
  CharactersState,
} from '../store/reducers/CharactersSlice';
import { ICharacter } from '../types/types';
import { describe, expect, it } from 'vitest';

describe('charactersSlice', () => {
  const initialState: CharactersState = {
    characters: [],
    currentPage: 1,
    totalPages: 1,
  };

  const sampleCharacters: ICharacter[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      created: '2017-11-04T18:48:46.250Z',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      created: '2017-11-04T18:48:46.250Z',
    },
  ];

  it('should return the initial state', () => {
    expect(charactersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setCharacters', () => {
    const actual = charactersReducer(
      initialState,
      setCharacters({
        characters: sampleCharacters,
        currentPage: 2,
        totalPages: 10,
      }),
    );

    expect(actual.characters).toEqual(sampleCharacters);
    expect(actual.currentPage).toEqual(2);
    expect(actual.totalPages).toEqual(10);
  });

  it('should handle empty characters', () => {
    const actual = charactersReducer(
      initialState,
      setCharacters({
        characters: [],
        currentPage: 1,
        totalPages: 1,
      }),
    );

    expect(actual.characters).toEqual([]);
    expect(actual.currentPage).toEqual(1);
    expect(actual.totalPages).toEqual(1);
  });
});
