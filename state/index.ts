import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as _reducers from "./reducers";
import * as _actions from "./actions";

export const actions = Object.freeze({..._actions});

const reducers = persistReducer({
    key: "root",
    storage,
    whitelist: ["currentUser"]
}, combineReducers(_reducers));

const store = configureStore({ reducer: reducers });
export const persistor = persistStore(store);

export default store;