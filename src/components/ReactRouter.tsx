import { Route, Routes } from 'react-router-dom';
import CardView from './CardView';
import DetailedView from './DetailedView';

const ReactRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/detail/:cardId" element={<DetailedView />} />
            <Route index element={<CardView />} />
        </Routes>
    );
};

export default ReactRouter;
