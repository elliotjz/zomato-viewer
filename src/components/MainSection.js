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
  locationState,
  getUserLocation,
  acceptDefaultLocation,
  err,
  loading,
}) => {
  const rProp = restaurants.length > 0 ? restaurants[selectedRestaurant] : {};
  const detailsLoading = loading && restaurants.length === 0;

  return (
    <Container>
      <ResultsSection
        restaurants={restaurants}
        onRestaurantSelect={onRestaurantSelect}
        selectedRestaurant={selectedRestaurant}
        locationState={locationState}
        getUserLocation={getUserLocation}
        acceptDefaultLocation={acceptDefaultLocation}
        err={err}
        loading={loading}
      />
      <DetailsSection
        restaurant={rProp}
        loading={detailsLoading}
      />
    </Container>
  );
};

MainSection.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRestaurant: PropTypes.number.isRequired,
  onRestaurantSelect: PropTypes.func.isRequired,
  locationState: PropTypes.number.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  acceptDefaultLocation: PropTypes.func.isRequired,
  err: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MainSection;
