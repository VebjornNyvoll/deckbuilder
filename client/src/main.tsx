import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./service/apolloClient";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <HashRouter>
        <React.StrictMode>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </React.StrictMode>
      </HashRouter>
    </ApolloProvider>
  </AuthProvider>,
);
