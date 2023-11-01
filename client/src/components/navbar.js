import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./alerts/errorAlert";
import axios from "axios";
import { useState } from "react";

export default function Navbar(){
    const {userContext, setUserContext} = useUser();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    function logout(){
        axios.get("http://localhost:5000/api/auth/logout", {withCredentials : true})
        .then(function(response){
            setUserContext({});
            localStorage.removeItem("user");
            navigate("/login");
        }).catch(function(error){
            setErrorMessage(error.response.data.error);
            setTimeout(()=>{
                setErrorMessage('');
            }, 5000)
        });
    }
    
    return (
        <div>
            <header className='navbar'>
                <div className='navbar__title navbar__item'>Marhaba</div>
                <div className='navbar__item'>About Us</div>
                <div className='navbar__item'>Contact</div>
                <div className='navbar__item'>Help</div>
                <button className='navbar__item logout_button' onClick={logout}>Logout</button>        
            </header>

            {errorMessage && <ErrorAlert message={errorMessage} />}
        </div>
    )
}