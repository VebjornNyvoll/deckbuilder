import { Route, Routes } from "react-router-dom";
import DetailedView from "./components/DetailedView";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Index from "./pages/Index";
import Deck from "./pages/Deck";
import Navbar from "./components/Navbar";


function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/detail/:cardId" element={<DetailedView />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route index element={<Index />} />
            <Route path="/decks" element={<Deck/>}/>
        </Routes>
        </>
    );
}

export default App;
