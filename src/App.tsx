import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../src/config'
import { actualizarCart } from './redux/actions';
import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import Footer from './Components/Footer/Footer';
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx';
import DeliveryProfile from './Components/DeliveryProfile/DeliveryProfile';
import LogginDelivery from './Components/LogginDelivery/LogginDelivery';



function App() {


  const dispatch = useAppDispatch()

  const token = JSON.parse(localStorage.getItem("token")!);
  const remember = JSON.parse(localStorage.getItem("remember")!);
  const delivery = JSON.parse(localStorage.getItem("delivery")!);
  const foodsLS = JSON.parse(localStorage.getItem("products")!);



  useEffect(() => {
    if (!token) {
      localStorage.setItem("token", JSON.stringify([]));
    }
    if (!foodsLS) {
      localStorage.setItem("products", JSON.stringify([]));
    }
    if (!delivery) {
      localStorage.setItem("delivery", JSON.stringify([]));
    } 
    if (!remember) {
      localStorage.setItem("remember", JSON.stringify(false));
    }
  }, [foodsLS, token, delivery])

 

  useEffect(() => {
    dispatch(actualizarCart(foodsLS));
  }, [dispatch, foodsLS]);

  return (
    <div className=' duration-500 bg-white dark:bg-background'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recupera/:id' element={<ForgotPass />} />
          <Route path='/pedidos' element={<Pedidos />} />
          {
            delivery?.token ?
            <Route path='/delivery' element={<DeliveryProfile/>}></Route>
            :
            <Route path='/delivery' element={<LogginDelivery/>}></Route>
          }
          {/* <Route path='/test' element={<Map/>}/>  */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
// 
export default App;
