import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import CustomForm from './forms/CustomForm';
import HookForm from './forms/HookForm';
import NotFoundPage from './404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/custom_form" element={<CustomForm />} />
        <Route path="/hook_form" element={<HookForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
