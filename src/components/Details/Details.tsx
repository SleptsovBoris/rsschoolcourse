import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Details.css';
import { SearchResult } from '../../types';
import useQuery from '../Hooks/useQuery';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<SearchResult>();
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const handleCloseDetails = () => {
    navigate(`/?page=${currentPage}`);
  };

  return (
    <>
      {details ? (
        <div className="details">
          <button className="closeDetails" onClick={handleCloseDetails}>
            Close Details
          </button>
          <div className="detailsTitle">{details.name}</div>
          <div>
            Status: <b>{details.status}</b>{' '}
          </div>
          <div>
            Species: <b>{details.species}</b>
          </div>
          <div>
            Type: <b>{details.type}</b>
          </div>
          <div>
            Gender: <b>{details.gender}</b>
          </div>
          <div>
            Created: <b>{details.created}</b>
          </div>
          <img src={details.image} alt={details.name} />
        </div>
      ) : (
        <p>No details found</p>
      )}
    </>
  );
};

export default Details;
