import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ResultsSection from './ResultsSection';
import DetailsSection from './DetailsSection';

const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const MainSection = ({
  restaurants,
  selectedRestaurant,
  onRestaurantSelect,
  err,
  loading,
}) => {
  const rProp = restaurants.length > 0 ? restaurants[selectedRestaurant] : {};

  return (
    <Container>
      <ResultsSection
        restaurants={restaurants}
        onRestaurantSelect={onRestaurantSelect}
        selectedRestaurant={selectedRestaurant}
        err={err}
        loading={loading}
      />
      <DetailsSection
        restaurant={rProp}
        loading={loading}
      />
    </Container>
  );
};

MainSection.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRestaurant: PropTypes.number.isRequired,
  onRestaurantSelect: PropTypes.func.isRequired,
  err: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MainSection;
