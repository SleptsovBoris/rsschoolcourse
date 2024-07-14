import { useState, useEffect } from 'react';

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedTerm = localStorage.getItem('searchTerm');
    return savedTerm !== null ? savedTerm : '';
  });

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm.trim());
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;
