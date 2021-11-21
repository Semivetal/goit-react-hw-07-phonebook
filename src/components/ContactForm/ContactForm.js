import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { contactsOperations, contactsSelectors } from "redux/contactForm";
import { v1 as uuid, v1 } from "uuid";
import styles from "./ContactForm.module.css";

function ContactForm({ contacts, onSubmit, isLoading }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameInputId = uuid(v1);
  const numberInputId = uuid(v1);

  const handleChange = (event) => {
    const { value, name } = event.currentTarget;
    if (name === "name") {
      setName(value);
    }
    if (name === "number") {
      setNumber(value);
    }
  };

  const addContact = (name, number) => {
    const foundNames = contacts.map((contact) =>
      contact.name.toLocaleLowerCase()
    );
    const lowerName = name.toLocaleLowerCase();
    if (foundNames.includes(lowerName)) {
      return alert(`${name} is in contact list`);
    }
    onSubmit(name, number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(name, number);
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          className={styles.input}
          value={name}
          type="text"
          name="name"
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={handleChange}
        />

        <label htmlFor={numberInputId}>Number</label>
        <input
          className={styles.input}
          value={number}
          type="tel"
          name="number"
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handleChange}
        />

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
      {isLoading && <h2>Loading...</h2>}
    </>
  );
}

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getContacts(state),
  isLoading: contactsSelectors.getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) =>
    dispatch(contactsOperations.addContact(name, number)),
});

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
