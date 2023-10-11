import { Route, Routes } from 'react-router-dom';
import DetailedView from './DetailedView';
import Index from '../Index';
import Deck from '../Deck';

const ReactRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/detail/:cardId" element={<DetailedView />} />
            <Route index element={<Index />} />
            <Route path="/decks" element={<Deck/>}/>
        </Routes>
    );
};

export default ReactRouter;
