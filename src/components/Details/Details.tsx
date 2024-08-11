import React, { useEffect } from 'react';
import Loader from '../Loader/Loader';
import styles from './Details.module.css';
import { characterAPI } from '../../services/CharacterService';
import { useDispatch } from 'react-redux';
import {
  setCurrentDetails,
  setIsLoading,
} from '../../store/reducers/DetailsSlice';
import { useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/router';

const Details: React.FC = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { id } = router.query;
  const currentPage = parseInt((query.page as string) || '1', 10);
  const dispatch = useDispatch();
  const currentDetails = useAppSelector(
    (state) => state.characterDetails.currentDetails,
  );
  const { data, error, isLoading } = characterAPI.useFetchCharacterDetailsQuery(
    { id: id as string },
  );

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (data) {
      dispatch(setCurrentDetails(data));
    }
  }, [data, isLoading, dispatch]);

  const handleCloseDetails = () => {
    router.push(`/?page=${currentPage}&name=${router.query.name}`);
    dispatch(setCurrentDetails(null));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>Произошла ошибка при загрузке</h1>
      ) : currentDetails ? (
        <div className={styles.details}>
          <button className={styles.closeDetails} onClick={handleCloseDetails}>
            Close Details
          </button>
          <div className={styles.detailsTitle}>{currentDetails.name}</div>
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
