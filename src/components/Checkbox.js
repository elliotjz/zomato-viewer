import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 12em;
  font-size: 0.9em;

  input {
    appearance: none;
    -webkit-appearance: none;
    background-color: ${(props) => props.theme.colors.grey};
    padding: 0.6em;
    top: 0.5em;
    display: inline-block;
    position: relative;
  }

  input:active, input:checked:active {
    box-shadow: 0 2px 2px rgba(0,0,0,0.1), inset 0 2px 2px rgba(0,0,0,0.1);
  }

  input:checked {
    background-color: ${(props) => props.theme.colors.teal};
    box-shadow: 0 2px 2px rgba(0,0,0,0.1), inset 0 2px 2px rgba(0,0,0,0.1);
  }

  label {
    font-size: 0.9em;
    margin-left: 0.2em;
  }
`;

const Checkbox = ({
  name, text, categoryName, checked, onChange,
}) => (
  <Container>
    <input
      id={name}
      type="checkbox"
      name={categoryName}
      value={name}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={name}>{text}</label>
  </Container>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
