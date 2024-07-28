import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { unselectAllCharacters } from '../../store/reducers/SelectedCharactersSlice';
import './FlyoutBar.css';

const FlyoutBar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters.selectedCharacters,
  );
  const handleUnselectAll = () => {
    dispatch(unselectAllCharacters());
  };

  const handleDownload = () => {
    if (selectedCharacters.length === 0) return;

    const titleKeys = Object.keys(selectedCharacters[0]);
    const refinedData = [];
    refinedData.push(titleKeys);

    selectedCharacters.forEach((item) => {
      refinedData.push(Object.values(item));
    });

    let csvContent = '';
    refinedData.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  };

  if (selectedCharacters.length > 0) {
    return (
      <div className="flyout">
        <button onClick={handleUnselectAll}>Unselect all</button>
        <p>{selectedCharacters.length} items are selected</p>
        <a
          className="flyout-download"
          href={handleDownload()}
          download={`${selectedCharacters.length}_selectedCharacters.csv`}
        >
          Download
        </a>
      </div>
    );
  }
};

export default FlyoutBar;
