import React from 'react';
import styles from './SearchResults.module.css';
import { ICharacter } from '../../types/types';
import { useAppSelector } from '../../hooks/redux';
import {
  selectCharacter,
  unselectCharacter,
} from '../../store/reducers/SelectedCharactersSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { characters, currentPage } = useAppSelector(
    (state) => state.characters,
  );
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters.selectedCharacters,
  );

  const handleItemClick = (id: number) => {
    router.push(
      `/details/${id}?page=${currentPage}&details=${id}&name=${router.query.name}`,
    );
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
    <div className={styles.results}>
      <div className={styles.resultsTitle}>Search Results:</div>
      {characters.length === 0 ? (
        <div className={styles.resultsTitle}>No results found</div>
      ) : (
        <div className={styles.resultsContainer}>
          {characters.map((character) => (
            <div className={styles.resultCard} key={character.id}>
              <img
                className={styles.resultCardImg}
                src={character.image}
                alt=""
              />
              <div
                className={styles.resultCardTitle}
                data-testid="resultCardTitle"
              >
                {character.name}
              </div>
              <div className={styles.resultCardInteractiveSection}>
                <input
                  className={styles.resultCardCheckbox}
                  type="checkbox"
                  checked={isSelected(character.id)}
                  onChange={() => handleSelectToggle(character)}
                />

                <button
                  className={styles.resultCardOpenDetailsButton}
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
