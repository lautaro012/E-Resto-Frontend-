import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pedidos from '../src/Components/Pedidos/Pedidos'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/pedidos' element={<Pedidos />} />
      </Routes>
    </Router>
  );
}

export default App;
