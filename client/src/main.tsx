import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./service/apolloClient";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { store } from "./service/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Provider store={store}>
    <ApolloProvider client={client}>
      <HashRouter>
        <React.StrictMode>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </React.StrictMode>
      </HashRouter>
    </ApolloProvider>
    </Provider>
  </AuthProvider>,
);
