import detailsReducer, {
  setCurrentDetails,
  setIsLoading,
  CharacterDetailsState,
} from './DetailsSlice';
import { ICharacter } from '../../types';
import { describe, expect, it } from 'vitest';

describe('detailsSlice', () => {
  const initialState: CharacterDetailsState = {
    currentDetails: null,
    isLoading: false,
  };

  const sampleCharacter: ICharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    created: '2017-11-04T18:48:46.250Z',
  };

  it('should return the initial state', () => {
    expect(detailsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setCurrentDetails', () => {
    const actual = detailsReducer(
      initialState,
      setCurrentDetails(sampleCharacter),
    );
    expect(actual.currentDetails).toEqual(sampleCharacter);
  });

  it('should handle setIsLoading', () => {
    const actual = detailsReducer(initialState, setIsLoading(true));
    expect(actual.isLoading).toEqual(true);
  });

  it('should handle setCurrentDetails with null', () => {
    const stateWithCharacter: CharacterDetailsState = {
      currentDetails: sampleCharacter,
      isLoading: false,
    };
    const actual = detailsReducer(stateWithCharacter, setCurrentDetails(null));
    expect(actual.currentDetails).toBeNull();
  });

  it('should handle setIsLoading with false', () => {
    const stateWithLoading: CharacterDetailsState = {
      currentDetails: sampleCharacter,
      isLoading: true,
    };
    const actual = detailsReducer(stateWithLoading, setIsLoading(false));
    expect(actual.isLoading).toEqual(false);
  });
});
