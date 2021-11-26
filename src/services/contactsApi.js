import axios from "axios";

axios.defaults.baseURL = "https://6194e3ff74c1bd00176c69ec.mockapi.io/";

export async function fetchContacts() {
  const { data } = await axios.get("/contacts");
  return data;
}

export async function addContact(contact) {
  const { data } = await axios.post("/contacts", contact);
  return data;
}

export async function deleteContact(id) {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
}
