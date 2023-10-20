import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';                       // core css
import App from './App';
import HearthStoneCardComponent from './components/HeartStoneCardComponent';
import { HearthStoneInfo } from './service/HearthStoneInfo';

//<HearthStoneCardComponent  card={HearthStoneInfo.getCardsData()[0]}/>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider> 
    <App/>
    </PrimeReactProvider>
    
  </React.StrictMode>,
)
