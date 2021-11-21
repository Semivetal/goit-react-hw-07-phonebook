import axios from "axios";

axios.defaults.baseURL = "https://619a3f5a9022ea0017a7b0a2.mockapi.io/";

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
