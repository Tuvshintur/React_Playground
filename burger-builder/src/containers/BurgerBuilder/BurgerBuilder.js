import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionType from "../../store/actions";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        console.log(this.props);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    render() {
        const disableInfo = {
            ...this.props.ings,
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    puchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ings}
                    price={this.props.price}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENTS, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENTS, ingredientName: ingName }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
