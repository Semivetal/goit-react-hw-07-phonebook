import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { contactsSelectors } from "redux/contactForm";
import * as contactsActions from "redux/contactForm/contacts-actions";
import { v1 as uuid, v1 } from "uuid";
import styles from "./Filter.module.css";

const Filter = ({ value, onChange }) => {
  const inputId = uuid(v1);
  const labelId = uuid(v1);

  return (
    <>
      <div className={styles.form}>
        <label htmlFor={labelId} className={styles.label}>
          Find contacts by
        </label>
        <input
          id={inputId}
          type="text"
          value={value}
          name="filter"
          onChange={onChange}
          className={styles.filterInput}
        />
      </div>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) =>
    dispatch(contactsActions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
