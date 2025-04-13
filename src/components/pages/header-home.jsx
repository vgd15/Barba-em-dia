import React, { useState } from "react";

import "./style.css";

function HeaderInicial(){

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

return(
<header>
   <div className="header d-flex justify-content-around align-items-center">
      <div className="home-button">
         <a href="/"><button>Home</button></a>
      </div>
      <div className="logo">
        
      </div>
      <div className="login">
         <a href="/login"><button>Login</button></a>
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
            <a href="/"><button>Home</button></a>
         </div>
         <div className="login">
            <a href="/login"><button>Login</button></a>
         </div>
      </div>
   </div>
</header>
)
}
export default HeaderInicial;