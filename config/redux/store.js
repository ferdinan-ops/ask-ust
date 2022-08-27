import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

/* Redux adlh library yg berguna utk membuat 
state global, karena state itu biasanya hanya 
dapat digunakan pada sebuah component local. 
Untuk menggunakan Redux pd React kita harus 
install jg react-redux */
export const store = createStore(reducer, applyMiddleware(thunk));
