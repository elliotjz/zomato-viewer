import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  flex: 3;
  background-color: ${(props) => props.theme.colors.grey};
  padding: 1rem 1rem 1rem 0;
`;

const ResultsSection = ({ restaurants }) => (
  <Container>
    <h3>ResultsSection</h3>
    {restaurants.map((r) => (
      <p key={r.restaurant.R.res_id}>{r.restaurant.name}</p>
    ))}
  </Container>
);

ResultsSection.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultsSection;
