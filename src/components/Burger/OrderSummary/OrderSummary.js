import React, { Component } from 'react'

import Aux from '../../../hoc/Auxial'
import './OrderSummary.css'

class OrderSummary extends Component {
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>: 
                {this.props.ingredients[igKey]}
                </li>)
        })
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                    {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Check Out</p>
            <button className='Danger Button' onClick={this.props.purchaseCancel}>CANCEL</button>
            <button className='Success Button' onClick={this.props.continue}>CONTINUE</button>
        </Aux>
        )
    }
} 

export default OrderSummary
