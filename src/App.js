import './App.css';
import Home from './Home';
import Header from './Header';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import CheckOut from './CheckOut';
import Login from './Login'

function App() {
  return (

    <BrowserRouter>
        <div className="App">
        
        <Routes>
          <Route path="/" element= {<><Header/><Home/></>}/> 
          <Route path="checkout" element= {<><Header/><CheckOut/></>} />
          <Route path='signup' element={<><Header/><Login/></>} ></Route>
        </Routes>
        
             
        </div>
    </BrowserRouter>
  );
}

export default App;
