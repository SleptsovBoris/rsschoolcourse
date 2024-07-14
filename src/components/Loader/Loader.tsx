import loader from '../../assets/loading-svgrepo-com.svg';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div data-testid="Loader" className="loaderWrapper">
      <img src={loader} className="loaderImg" alt="" />
    </div>
  );
};

export default Loader;
