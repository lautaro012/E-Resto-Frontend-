import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import Form from './Components/Form/Form';
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
        <Route path='/test' element={<Form/>}/>
        <Route path='/crear' element={<Loggin/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
