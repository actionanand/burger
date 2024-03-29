import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const basePrice = 80;
const maxAllowedIng = 3;

const INGREDIENT_PRICES = {
  salad: 15.25,
  cheese: 13.50,
  meat: 28.70,
  bacon: 36.63
};


class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: basePrice,
    purchasable: false,
    purchasing: false,
    basePrice,
    maxAllowedIng,
    purchased: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys( ingredients )
      .map( igKey => {
        return ingredients[igKey];
      } )
      .reduce( ( sum, el ) => {
        return sum + el;
      }, 0 );
    this.setState( { purchasable: sum > 0 } );
  }

  addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    if ( oldCount <= 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseSuccessHandler = () => {
    this.props.history.push('/orders', {purchased: true});
  }

  purchaseContinueHandler = () => {
    if (window.confirm('Are you sure to place the order?')) {
      this.purchaseSuccessHandler();
    }
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    // {salad: true, meat: false, ...}

    const maxAllowedIngsInfo = {...this.state.ingredients};

    for(let key in maxAllowedIngsInfo) {
      maxAllowedIngsInfo[key] = maxAllowedIngsInfo[key] >= this.state.maxAllowedIng;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          maxAllowedIng={maxAllowedIngsInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} 
          basePrice={this.state.basePrice} />
      </Aux>
    );
  }
}

export default withRouter(BurgerBuilder);