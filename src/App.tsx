import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Home from './pages/Home/Home';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
  </Routes>
      
     
  );
}

export default App;
