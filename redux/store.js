import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";

export const store = configureStore({
	reducer: {
		basket: basketReducer
	},
	middlewares: gDM => gDM(),
	devtools: process.env.NODE_ENV === "development"
});
