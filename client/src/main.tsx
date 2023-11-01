import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';                       // core css
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:1001/Hearthstone',
  cache: new InMemoryCache(),
});

//<HearthStoneCardComponent  card={HearthStoneInfo.getCardsData()[0]}/>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
<React.StrictMode>
    <PrimeReactProvider> 
    <App/>
    </PrimeReactProvider>
    
  </React.StrictMode>
  </ApolloProvider>,
)
