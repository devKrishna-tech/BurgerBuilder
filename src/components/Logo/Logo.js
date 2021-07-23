import React from 'react';

import Logo from '../../assets/Images/burger-logo.png';
import  './Logo.css';

const logo = (props) => (
    <div className='Logo' >
        <img src={Logo} alt="MyBurger" />
    </div>
);

export default logo;