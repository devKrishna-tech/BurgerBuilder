import React, { Component } from 'react'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Aux from '../../hoc/Auxial'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 1.0
}


 class BurgerBuilder extends Component  {

    state={
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('https://my-react-burger-ap-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
    }

    updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => {
        return ingredients[igKey]
    })
    .reduce((sum, el) =>{
        return sum + el
    }, 0)
    this.setState({purchasable: sum > 0})
}


    addIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            const updatedCount  = oldCount +  1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
           const priceAddition = INGREDIENT_PRICES[type]
           const oldPrice = this.state.totalPrice;
           const newPrice = oldPrice + priceAddition;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
            this.updatePurchaseState(updatedIngredients);
        }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
            const updatedCount  = oldCount -  1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
           const priceDeduction = INGREDIENT_PRICES[type]
           const oldPrice = this.state.totalPrice;
           const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
            this.updatePurchaseState(updatedIngredients);
        }


        purchaseHandler = () => {
            this.setState({purchasing: true})
        }

        purchaseCancel = () => {
            this.setState({purchasing: false})
        }


        purchaseContinueHandler = () => {
            const queryParams = [];
            for(let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
            }
            queryParams.push('price='+ this.state.totalPrice)
            const queryString = queryParams.join('&')
            this.props.history.push({
                pathname: '/checkout',
                search: '?' + queryString
            })

        }

    render(){
        
        const disabledInfo ={
            ...this.state.ingredients
        }
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients Cant be Loaded!</p> : <Spinner />
        
        
        if(this.state.ingredients){

        burger = (<Aux>
        <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
        ingredientAdded={this.addIngredientHandler}
        ingredientsSubtracted={this.removeIngredientHandler}
        disabled = {disabledInfo}
        purchasable={this.state.purchasable}
        price={this.state.totalPrice}
        ordered={this.purchaseHandler}
        />
        </Aux>)
        orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        continue={this.purchaseContinueHandler}
        purchaseCancel={this.purchaseCancel}
        price={this.state.totalPrice}
        />
        } 
        
        
        if(this.state.loading){
            orderSummary = <Spinner />
       }
        
       return (
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed = {this.purchaseCancel}
                >
                    {orderSummary}
                </Modal>
                <div>
                    {burger}
                </div>
            </Aux>
        );
    }


    }


export default withErrorHandler(BurgerBuilder, axios)