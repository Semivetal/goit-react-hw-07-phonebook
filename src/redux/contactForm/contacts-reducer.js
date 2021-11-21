import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  addContactsError,
  addContactsSuccess,
  addContactsRequest,
  deleteContactsSuccess,
  deleteContactsRequest,
  deleteContactsError,
  fetchContactsError,
  fetchContactsRequest,
  fetchContactsSuccess,
  changeFilter,
} from "./contacts-actions";

const items = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactsSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactsSuccess]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const filter = createReducer("", {
  [changeFilter]: (_, action) => action.payload,
});

const loading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
  [addContactsRequest]: () => true,
  [addContactsSuccess]: () => false,
  [addContactsError]: () => false,
  [deleteContactsRequest]: () => true,
  [deleteContactsSuccess]: () => false,
  [deleteContactsError]: () => false,
});

const error = createReducer(null, {
  [fetchContactsError]: (_, action) => action.payload,
  [addContactsError]: (_, action) => action.payload,
  [deleteContactsError]: (_, action) => action.payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});
