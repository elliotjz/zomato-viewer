import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.span`
  border-radius: 4px;
  color: ${(props) => props.theme.colors.white};
  font-size: 0.6em;
  font-weight: 500;
  padding: 0.4em 0.8em;
  white-space: nowrap;
`;

const Open = styled(Container)`
  background-color: ${(props) => props.theme.colors.green};
`;

const Closed = styled(Container)`
  background-color: ${(props) => props.theme.colors.red};
`;

const OpenIndicator = ({ open }) => (
  <>
    {open ? <Open>OPEN NOW</Open> : <Closed>CLOSED</Closed>}
  </>
);

OpenIndicator.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default OpenIndicator;
