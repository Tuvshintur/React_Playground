import * as actionType from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0,
    },
    totalPrice: 4,
};

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
            };
        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
            };
        default:
            return state;
    }
};

export default reducer;
