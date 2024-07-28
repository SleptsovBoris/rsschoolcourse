import React from 'react';
import './SearchResults.css';
import { ICharacter } from '../../types';
import { useAppSelector } from '../../hooks/redux';
import {
  selectCharacter,
  unselectCharacter,
} from '../../store/reducers/SelectedCharactersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { characters, currentPage } = useAppSelector(
    (state) => state.characters,
  );
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters.selectedCharacters,
  );

  const handleItemClick = (id: number) => {
    navigate(`/details/${id}?page=${currentPage}&details=${id}`);
  };

  const isSelected = (id: number) => {
    return selectedCharacters.some(
      (character: ICharacter) => character.id === id,
    );
  };

  const handleSelectToggle = (character: ICharacter) => {
    if (isSelected(character.id)) {
      dispatch(unselectCharacter(character.id));
    } else dispatch(selectCharacter(character));
  };

  return (
    <div className="results">
      <div className="resultsTitle">Search Results:</div>
      {characters.length === 0 ? (
        <div className="noResultsMessage">No results found</div>
      ) : (
        <div className="resultsContainer">
          {characters.map((character) => (
            <div className="resultCard" key={character.id}>
              <img className="resultCardImg" src={character.image} alt="" />
              <div className="resultCardTitle" data-testid="resultCardTitle">
                {character.name}
              </div>
              <div className="resultCardInteractiveSection">
                <input
                  className="resultCardCheckbox"
                  type="checkbox"
                  checked={isSelected(character.id)}
                  onChange={() => handleSelectToggle(character)}
                />

                <button
                  className="resultCardOpenDetailsButton"
                  onClick={() => handleItemClick(character.id)}
                >
                  Open Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
