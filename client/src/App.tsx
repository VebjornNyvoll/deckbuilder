import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Index from './pages/Index';
import Deck from './pages/Deck';
import Navbar from './components/Navbar';
import RequireAuth from './service/RequireAuth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css'; // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css'; // core css
import { ApolloProvider } from '@apollo/client';
import client from './service/apolloClient';
import { AuthProvider } from './context/authContext';
import { store } from './service/store';
import { Provider } from 'react-redux';

const HeaderLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  [
    {
      element: <HeaderLayout />,
      children: [
        {
          path: '/',
          element: <Index />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/create-account',
          element: <CreateAccount />,
        },
        {
          path: '/decks',
          element: (
            <RequireAuth>
              <Deck />
            </RequireAuth>
          ),
        },
      ],
    },
  ],
  { basename: '/project2/' },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <PrimeReactProvider>
            <RouterProvider router={router} />
          </PrimeReactProvider>
        </React.StrictMode>
      </ApolloProvider>
    </Provider>
  </AuthProvider>,
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
