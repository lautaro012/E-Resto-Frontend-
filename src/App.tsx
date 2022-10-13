import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../src/config'
import { actualizarCart } from './redux/actions';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import Footer from './Components/Footer/Footer';
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx';
<<<<<<< HEAD
import Mapa from './Components/Map/Map';
//import SendMail from './Components/ForgotPass/SendMail';
//import About from './Components/About_us/About';
=======

//import Register from './Components/RegisterForm/RegisterForm';
>>>>>>> Development

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
<<<<<<< HEAD
          {/* <Route path='/about' element={<About />} /> */}
          <Route path='/test' element={<Mapa/>}/>
=======
>>>>>>> Development
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
// 
export default App;
