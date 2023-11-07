import { Route, Routes } from 'react-router-dom';
import DetailedView from './DetailedView';
import Index from '../Index';
import Deck from '../Deck';
import Login from '../Login';
import CreateAccount from '../CreateAccount';

const ReactRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/detail/:cardId" element={<DetailedView />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route index element={<Index />} />
            <Route path="/decks" element={<Deck/>}/>
        </Routes>
    );
};

export default ReactRouter;
