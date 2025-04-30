import React, { useState } from "react";
import "../pages/style.css";
import logo from "../img/logo.png";

function HeaderLogado(){

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

return(
<header>
   <div className="header d-flex justify-content-between align-items-center">
   <a href="/" className="logo">
          <img src={logo} alt="Paulinho Barbearia" />
   </a>
      <div className="home-button">
         <a href="/">Logout</a>
      </div>
      
   </div>
   <div className="header d-flex justify-content-around align-items-center header-mob">
    <div class="d-flex justify-content-between align-items-center p-3">
      <div className="logo">
      
      </div>
      <button onClick={handleClick}>
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L26 2" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M2 11H26" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M2 20H26" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
     </svg>
      </button>
      
    </div>
      <div class={`sidebar--menu ${isActive ? 'active' : ''}`}>
      <div class="close d-flex justify-content-start align-items-center">
               <button onClick={handleClick} className="close-button">
                    
                </button>
         </div>
         <div className="home-button">
            <a href="/"><button>Logout</button></a>
         </div>
         
      </div>
   </div>
</header>
)
}
export default HeaderLogado;