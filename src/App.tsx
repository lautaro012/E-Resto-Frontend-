import './App.css';
import { useEffect, useState } from 'react';
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
import UserMenu from './Components/UserMenu/UserMenu';
import Check from './Components/CheckoutPayment/Check';
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx';
import Admin from './Components/Admin/Admin';
import SendMail from './Components/ForgotPass/SendMail';


function App() {

  const dispatch = useAppDispatch()

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

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
          <Route path='/admin' element={<Admin />} />
          <Route path='/modal' element={<SendMail />} />
          <Route path='/recupera/:id' element={<ForgotPass />} />
          <Route path='/check' element={<Check />} />
          <Route path='/pedidos' element={<Pedidos />} />
          <Route path='/product/:id' element={<DetailProduct id closeModalDetail />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<UserMenu />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
