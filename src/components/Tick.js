import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  path {
    fill: none;
    stroke: ${(props) => props.theme.colors.green};
    stroke-width: 16;
  }
`;

const Tick = ({ height, width }) => (
  <Svg viewBox="0 0 160 120" height={height} width={width}>
    <path d="M10,70 l40,40 l100,-100" />
  </Svg>
);

Tick.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Tick;
