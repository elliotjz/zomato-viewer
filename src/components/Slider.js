import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NoUiSlider from 'react-nouislider';

const Container = styled.div`
  width: 100%;
  margin-top: 0.5em;

  p {
    margin-top: 0.5em;
    font-weight: 400;
  }

  .max-text {
    float: right;
  }
`;

const Slider = ({
  values, min, max, minText, maxText, onChange,
}) => (
  <Container>
    <NoUiSlider
      range={{ min, max }}
      start={values}
      connect={[false, true, false]}
      step={1}
      onChange={onChange}
    />
    <p>
      <span className="min-text">{minText}</span>
      <span className="max-text">{maxText}</span>
    </p>
  </Container>
);

Slider.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number,
  max: PropTypes.number,
  minText: PropTypes.string.isRequired,
  maxText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  values: [1, 2],
  min: 0,
  max: 10,
};

export default Slider;
