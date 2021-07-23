import React from 'react'

// import Button from '../../UI/Button/Button'
import Burger from '../../Burger/Burger'
import './CheckoutSummary.css' 

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We Hope it Tastes Well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <button className="Danger Button" onClick={props.checkoutCanceled}>CANCEL</button>
            <button className="Success Button" onClick={props.checkoutContinued}>CONTINUE</button>
        </div>
    )
}

export default checkoutSummary