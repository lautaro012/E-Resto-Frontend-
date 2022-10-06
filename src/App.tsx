import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pedidos from '../src/Components/Pedidos/Pedidos'
import Home from '../src/Components/Home/Home'
import DetailProduct from './Components/DetailProduct/DetailProduct';
import Footer from './Components/Footer/Footer';
import Register from './Components/RegisterForm/RegisterForm';
import UserMenu from './Components/UserMenu/UserMenu';
import Check from './Components/CheckoutPayment/Check';
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx';
import Admin from './Components/Admin/Admin';
import { useEffect, useState } from 'react';
import SendMail from './Components/ForgotPass/SendMail';


function App() {

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);
  
  return (
    <>
    
    <Router>  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/modal' element={<SendMail/>} />
        <Route path='/recupera/:id' element={<ForgotPass />} />
        <Route path='/check' element={<Check/>} />
        <Route path='/pedidos' element={<Pedidos />} />
        <Route path='/product/:id' element={<DetailProduct id closeModalDetail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/test' element={<UserMenu/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
