import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  path {
    fill: none;
    stroke: ${(props) => props.theme.colors.red};
    stroke-width: 16;
  }
`;

const Cross = ({ height, width }) => (
  <Svg viewBox="0 0 160 120" height={height} width={width}>
    <path d="M30,10 l100,100 m0,-100 l-100,100" />
  </Svg>
);

Cross.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Cross;
