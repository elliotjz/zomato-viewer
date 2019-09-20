import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ResultsSection from './ResultsSection';
import DetailsSection from './DetailsSection';

const Container = styled.div`
  display: flex;
`;

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantIndex: 0,
    };
  }

  onResultClick = (index) => {
    this.setState({
      restaurantIndex: index,
    });
  }

  render() {
    const { restaurantIndex } = this.state;
    const { restaurants } = this.props;
    const rProp = restaurants.length > 0 ? restaurants[restaurantIndex] : {};
    const loading = restaurants.length === 0;

    return (
      <Container>
        <ResultsSection
          restaurants={restaurants}
          loading={loading}
          onResultClick={this.onResultClick}
          selectedIndex={restaurantIndex}
        />
        <DetailsSection
          restaurant={rProp}
          loading={loading}
        />
      </Container>
    );
  }
}

MainSection.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainSection;
