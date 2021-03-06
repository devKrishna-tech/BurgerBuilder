import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import './Burger.css'

const Burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []) 

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start Adding Ingredients</p>
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type="bread_top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread_bottom"/>
        </div>
    )
}

export default Burger
