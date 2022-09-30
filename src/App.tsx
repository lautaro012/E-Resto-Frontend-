import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import Form from './Components/Form/Form';
import DetailProduct from './Components/DetailProduct/DetailProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pedidos' element={<Pedidos />} />
        <Route path='/test' element={<Form/>}/>
        <Route path='/product/:id' element={<DetailProduct/>}/>
      </Routes>
    </Router>
  );
}

export default App;
