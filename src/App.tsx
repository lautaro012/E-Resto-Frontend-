import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../src/config'
import { actualizarCart } from './redux/actions';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import Footer from './Components/Footer/Footer';
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx';

//import Register from './Components/RegisterForm/RegisterForm';

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
          <Route path='/recupera/:id' element={<ForgotPass />} />
          <Route path='/pedidos' element={<Pedidos />} />
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
