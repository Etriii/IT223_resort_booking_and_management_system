import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    {/* /* basename='oceanview' */}
    <BrowserRouter >
      < App />
    </BrowserRouter >
  </StrictMode>
);