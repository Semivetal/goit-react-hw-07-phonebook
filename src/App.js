import { connect } from "react-redux";
import PropTypes from "prop-types";
import { contactsSelectors } from "redux/contactForm";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import styles from "./App.module.css";

function App({ contacts }) {
  return (
    <div className={styles.context}>
      <h1 className="text">Phonebook</h1>
      <ContactForm />
      {contacts.length > 0 && (
        <>
          <Filter />
          <h2 className="text">Contacts</h2>
        </>
      )}
      <ContactList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getContacts(state),
});

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps, null)(App);
