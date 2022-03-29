import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
}

const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state,{ payload }) => { state.items.push(payload); },
		removeFromBasket: (state,{ payload }) => {
			const index = state.items.findIndex(item => item.id === payload);
			state.items.splice(index,1);
		},
		addItem: (state,{payload}) => {
			const item = state.items.findIndex(item => item.id === payload);
			const quantity = state.items[item].quantity;

			state.items[item].quantity = quantity + 1;
		},
		subtractItem: (state,{payload}) => {
			const item = state.items.findIndex(item => item.id === payload);
			const quantity = state.items[item].quantity;

			if (quantity > 1) {
				state.items[item].quantity = quantity - 1;
			}
		},
		setSavedItems: (state,{payload}) => { state.items = payload; },
		emptyBasket: state => { state.items = []; }
	}
});

const { reducer, actions } = basketSlice;

export const selectItems = state =>  state.basket.items;
export const { addToBasket, removeFromBasket, addItem, subtractItem, setSavedItems, emptyBasket } = actions;
export default reducer;