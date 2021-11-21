import {
  addContactsError,
  addContactsSuccess,
  addContactsRequest,
  deleteContactsError,
  deleteContactsSuccess,
  deleteContactsRequest,
  fetchContactsError,
  fetchContactsSuccess,
  fetchContactsRequest,
} from "./contacts-actions";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactsRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch((error) => dispatch(fetchContactsError(error)));
};

export const addContact = (name, number) => (dispatch) => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactsRequest());

  axios
    .post("/contacts", contact)
    .then(({ data }) => dispatch(addContactsSuccess(data)))
    .catch((error) => dispatch(addContactsError(error)));
};

export const deleteContact = (id) => (dispatch) => {
  dispatch(deleteContactsRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(({ id }) => dispatch(deleteContactsSuccess(id)))
    .catch((error) => dispatch(deleteContactsError(error)));
};
