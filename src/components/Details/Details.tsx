import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Details.css';
import useQuery from '../../hooks/useQuery';
import { characterAPI } from '../../services/CharacterService';
import { useDispatch } from 'react-redux';
import {
  setCurrentDetails,
  setIsLoading,
} from '../../store/reducers/DetailsSlice';
import { useAppSelector } from '../../hooks/redux';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get('page') || '1', 10);
  const dispatch = useDispatch();
  const currentDetails = useAppSelector(
    (state) => state.characterDetails.currentDetails,
  );
  const { data, error, isLoading } = characterAPI.useFetchCharacterDetailsQuery(
    { id: id },
  );

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (data) {
      dispatch(setCurrentDetails(data));
    }
  }, [data, isLoading, dispatch]);

  const handleCloseDetails = () => {
    navigate(`/?page=${currentPage}`);
    dispatch(setCurrentDetails(null));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>Произошла ошибка при загрузке</h1>
      ) : currentDetails ? (
        <div className="details">
          <button className="closeDetails" onClick={handleCloseDetails}>
            Close Details
          </button>
          <div className="detailsTitle">{currentDetails.name}</div>
          <div>
            Status: <b>{currentDetails.status}</b>{' '}
          </div>
          <div>
            Species: <b>{currentDetails.species}</b>
          </div>
          <div>
            Type: <b>{currentDetails.type}</b>
          </div>
          <div>
            Gender: <b>{currentDetails.gender}</b>
          </div>
          <div>
            Created: <b>{currentDetails.created}</b>
          </div>
          <img src={currentDetails.image} alt={currentDetails.name} />
        </div>
      ) : (
        <h1>Нет данных</h1>
      )}
    </>
  );
};

export default Details;
