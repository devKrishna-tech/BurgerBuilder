import React from 'react'

import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../../assets/Images/burger-logo.png'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxial'
import './SideDrawer.css'

const SideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close']
    if(props.open) {
        attachedClasses = ['SideDrawer', 'Open']
    }
    
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <img src={Logo} alt='Burger Joint' className='Logo1'></img>
            <nav>
                <ul>
                    <NavigationItems/>
                </ul>
            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer
