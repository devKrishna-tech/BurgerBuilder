import React from 'react'

import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]


const BuildControls = (props) => {
    return (
        <div className='BuildControls'>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                type={ctrl.type}
                added={() => props.ingredientAdded(ctrl.type)}
                subtracted={() =>props.ingredientsSubtracted(ctrl.type)}
                disabled= {props.disabled[ctrl.type]}
                />
    ))}
    <button 
        className='OrderButton' 
            disabled={!props.purchasable}
                onClick={props.ordered}
                    >ORDER NOW</button>
        </div>
    )
}

export default BuildControls
