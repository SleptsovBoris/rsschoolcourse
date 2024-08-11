import { wrapper } from '../store/store';
import { characterAPI } from '../services/CharacterService';
import MainPage from '../components/Main/Main';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(
      characterAPI.endpoints.searchCharacters.initiate({
        name: '',
        page: 1,
      }),
    );
    await Promise.all(
      store.dispatch(characterAPI.util.getRunningQueriesThunk()),
    );

    return {
      props: {},
    };
  },
);

const HomePage = () => {
  return (
    <MainPage>
      <></>
    </MainPage>
  );
};

export default HomePage;
