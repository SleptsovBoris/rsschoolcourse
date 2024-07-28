import { describe, it, expect } from 'vitest';
import reducer, {
  selectCharacter,
  unselectCharacter,
  unselectAllCharacters,
  SelectedCharactersState,
} from './SelectedCharactersSlice';
import { ICharacter } from '../../types';

const initialState: SelectedCharactersState = {
  selectedCharacters: [],
};

const mockCharacter: ICharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  image: 'https://example.com/rick.png',
  created: '2021-01-01',
};

describe('selectedCharacters slice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle selectCharacter', () => {
    const actual = reducer(initialState, selectCharacter(mockCharacter));
    expect(actual.selectedCharacters).toHaveLength(1);
    expect(actual.selectedCharacters[0]).toEqual(mockCharacter);
  });

  it('should handle unselectCharacter', () => {
    const initialStateWithCharacter: SelectedCharactersState = {
      selectedCharacters: [mockCharacter],
    };
    const actual = reducer(
      initialStateWithCharacter,
      unselectCharacter(mockCharacter.id),
    );
    expect(actual.selectedCharacters).toHaveLength(0);
  });

  it('should handle unselectAllCharacters', () => {
    const initialStateWithCharacters: SelectedCharactersState = {
      selectedCharacters: [mockCharacter],
    };
    const actual = reducer(initialStateWithCharacters, unselectAllCharacters());
    expect(actual.selectedCharacters).toHaveLength(0);
  });
});
