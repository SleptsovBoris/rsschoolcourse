import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useSearchTerm = () => {
  const router = useRouter();
  const searchTerm = (router.query.name as string) || '';

  const setSearchTerm = (newTerm: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, name: newTerm || undefined, page: '1' },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (!searchTerm && typeof window !== 'undefined') {
      setSearchTerm('');
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;
