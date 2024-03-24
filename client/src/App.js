import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import Navbar from './components/navbar';
import Home from './pages/home';
import './App.css';
import {Route, Routes , useLocation, Navigate} from "react-router-dom";
import { UserContextProvider } from './contexts/userContext';
import ForgotPassword from './pages/auth/forgotPassword';
import ResetPassword from './pages/auth/resetPassword';
import VerifyAccount from './pages/auth/verifyAccount';
import IsNotAuth from './guards/IsNotAuth.js';
import IsAuth from './guards/IsAuth.js';
import PageNotFound from './pages/pageNotFound';
import Clients from './pages/Clients.js';

function App() {

  const location = useLocation();

  const shouldRenderNavbar = location.pathname == '/home'
                            || location.pathname == '/'


  return (
    <UserContextProvider>
      {shouldRenderNavbar && <Navbar/>}
      <Routes>
        <Route path="/clients" element={< Clients />}/>
        <Route path="/" element={<IsNotAuth component={Home} />}/>
        <Route path="/home" element={<IsNotAuth component={Home} />}/>
        <Route path='/register' element={<IsAuth component={RegisterPage}/>}></Route>
        <Route path='/login' element={<IsAuth component={LoginPage}/>}></Route>
        <Route path="/forgot" element={<IsAuth component={ForgotPassword}/>}></Route>
        <Route path='/reset/:token' element={<IsAuth component={ResetPassword}/>}></Route>
        <Route path='/verify' element={<IsAuth component={VerifyAccount}/>}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
