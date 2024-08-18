import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <h2>Страницы не существует</h2>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
