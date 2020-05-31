import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
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
        if (this.props.isAuth) this.setState({ purchasing: true });
        else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
                        isAuth={this.props.isAuth}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredidents()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
