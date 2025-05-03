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

</header>
)
}
export default HeaderLogado;