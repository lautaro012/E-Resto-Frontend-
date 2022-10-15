import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../src/config'
import { actualizarCart } from './redux/actions';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import Footer from './Components/Footer/Footer';
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx';
import Mapa from './Components/Map/Map';
import OrderTimeline from './Components/OrderTimeline/OrderTimeline';
//import SendMail from './Components/ForgotPass/SendMail';
//import About from './Components/About_us/About';


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
          {/* <Route path='/about' element={<About />} /> */}
          <Route path='/test' element={<OrderTimeline/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
// 
export default App;
