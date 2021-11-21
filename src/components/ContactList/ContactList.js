import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { contactsSelectors, contactsOperations } from "redux/contactForm";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact, fetchContacts }) => {
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    contacts.length > 0 && (
      <ul className={styles.contactList}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={styles.contactItem}>
            <span className={styles.contactName}>{name}</span>
            <span className={styles.contactNumber}>{number}</span>
            <button
              className={styles.contactBtn}
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteContact: (id) => dispatch(contactsOperations.deleteContact(id)),
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  OnDeleteContact: PropTypes.func,
  fetchContacts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
