import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import DetailProduct from './Components/DetailProduct/DetailProduct';
import Footer from './Components/Footer/Footer';
import { Z_ASCII } from 'zlib';
import Loggin from './Components/LogginForm/Loggin';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pedidos' element={<Pedidos />} />
        <Route path='/product/:id' element={<DetailProduct id closeModalDetail/>}/>
        <Route path='/crear' element={<Loggin/>}/>89e09fe21e5cdd3c47e56c80e00d25562d2fae
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
