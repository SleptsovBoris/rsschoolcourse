import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/404ErrorPage/404ErrorPage';
import Details from './components/Details/Details';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
