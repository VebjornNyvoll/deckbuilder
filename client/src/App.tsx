import { Route, Routes } from "react-router-dom";
import DetailedView from "./components/DetailedView";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Index from "./pages/Index";
import Deck from "./pages/Deck";
import Navbar from "./components/Navbar";
import RequireAuth from "./service/RequireAuth";
import { useState } from "react";

function App() {
  const [layout, setLayout] = useState<"grid" | "list">("list");

  return (
    <>
      <Navbar layout={layout} setLayout={setLayout} />
      <Routes>
        <Route path="/detail/:cardId" element={<DetailedView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route index element={<Index layout={layout} />} />
        <Route
          path="/decks"
          element={
            <RequireAuth>
              <Deck layout={layout} />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
