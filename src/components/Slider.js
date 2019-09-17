import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const Slider = ({
  label, value, min, max, onChange,
}) => (
  <Container>
    <input type="range" min={min} max={max} value={value} id={label} onChange={onChange} />
  </Container>
);

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
