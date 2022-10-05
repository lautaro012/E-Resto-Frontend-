import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../src/config'
import { actualizarCart } from './redux/actions';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import DetailProduct from './Components/DetailProduct/DetailProduct';
import Cart from './Components/Cart/Cart';
import Footer from './Components/Footer/Footer';
import Register from './Components/RegisterForm/RegisterForm';
import Form from './Components/Form/Form';

function App() {

  const dispatch = useAppDispatch()

  const token = JSON.parse(localStorage.getItem("token")!);
  const foodsLS = JSON.parse(localStorage.getItem("products")!);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("token", JSON.stringify([]));
    }
    if (!foodsLS) {
      localStorage.setItem("products", JSON.stringify([]));
    }
  }, [foodsLS, token])

  useEffect(() => {
    dispatch(actualizarCart(foodsLS));
  }, [dispatch, foodsLS]);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pedidos' element={<Pedidos />} />
          <Route path='/test' element={<Form />} />
          <Route path='/product/:id' element={<DetailProduct id closeModalDetail />} />
          <Route path='/crear' element={<Form />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
