import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  flex: 7;
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 3rem;
`;

const DetailsSection = ({ restaurant, loading }) => (
  <Container>
    {loading ? <p>loading...</p> : <p>{restaurant.restaurant.name}</p>}
  </Container>
);

DetailsSection.propTypes = {
  restaurant: PropTypes.objectOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DetailsSection;
