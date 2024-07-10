import { Component } from 'react';
import loader from '../../assets/loading-svgrepo-com.svg';
import './Loader.css';

export class Loader extends Component {
  render() {
    return (
      <div className="loaderWrapper">
        <img src={loader} className="loaderImg" alt="" />;
      </div>
    );
  }
}

export default Loader;
