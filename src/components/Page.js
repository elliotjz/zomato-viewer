import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderSection from './HeaderSection';
import MainSection from './MainSection';

import {
  BATCH_SIZE, WAITING, SET, DEFAULT,
} from '../utils';

const categories = {
  Dining: { text: 'Dining', id: 2 },
  'Take-Away': { text: 'Take-Away', id: 5 },
  Delivery: { text: 'Delivery', id: 1 },
  'Pubs-And-Bars': { text: 'Pubs & Bars', id: 11 },
};

const cuisines = {
  'Cafe-Food': { text: 'Cafe Food', id: 1039 },
  'Coffee-and-Tea': { text: 'Coffee and Tea', id: 161 },
  Pizza: { text: 'Pizza', id: 82 },
  'Fast-Food': { text: 'Fast Food', id: 40 },
  Asian: { text: 'Asian', id: 3 },
  Bakery: { text: 'Bakery', id: 5 },
  Italian: { text: 'Italian', id: 55 },
  Sandwich: { text: 'Sandwich', id: 304 },
  Chinese: { text: 'Chinese', id: 25 },
  'Pub-Food': { text: 'Pub Food', id: 983 },
  Other: { text: 'Other', id: 110 },
};

const Container = styled.div`
  color: ${(props) => props.theme.colors.black};
`;

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: {},
      ratings: [0, 5],
      costs: [1, 4],
      latitude: null,
      longitude: null,
      locationState: WAITING,
      restaurants: [],
      err: '',
      loading: false,
      selectedRestaurant: 0,
    };
  }

  componentDidMount() {
    const checkboxes = {};
    const categoryKeys = Object.keys(categories);
    const cuisineKeys = Object.keys(cuisines);
    [...categoryKeys, ...cuisineKeys].forEach((item) => {
      checkboxes[item] = false;
    });
    this.setState({ checkboxes });
  }

  async getRestaurants(start = 0) {
    const {
      checkboxes,
      latitude,
      longitude,
      locationState,
    } = this.state;

    // Don't get restaurants until the location is set
    if (locationState === WAITING) return;

    // Set the state
    if (start === 0) {
      this.setState({
        err: '',
        loading: true,
        restaurants: [],
      });
    } else {
      this.setState({
        err: '',
        loading: true,
      });
    }

    // Construct query
    let query = '';
    if (locationState === SET) {
      // Use user coordinates
      query = `?lat=${latitude}&lon=${longitude}&radius=30000`;
    } else {
      // Search in Adelaide
      query += '?entity_id=297&entity_type=city';
    }

    // Offset the restaurants that are being fetched
    query += `&start=${start}`;

    // Append category queries
    let categoryQuery = '&category=';
    Object.keys(categories).forEach((item) => {
      if (checkboxes[item]) {
        categoryQuery += `${categories[item].id},`;
      }
    });
    if (categoryQuery !== '&category=') {
      query += categoryQuery.slice(0, -1);
    }

    // Append cuisine queries
    let cuisineQuery = '&cuisines=';
    Object.keys(cuisines).forEach((item) => {
      if (checkboxes[item]) {
        cuisineQuery += `${cuisines[item].id},`;
      }
    });
    if (cuisineQuery !== '&cuisines=') {
      query += cuisineQuery.slice(0, -1);
    }

    const url = `https://developers.zomato.com/api/v2.1/search${query}`;
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'user-key': `${process.env.REACT_APP_ZOMATO_API_KEY}`,
        },
      });
      const resJson = await res.json();

      let restaurants;
      if (start === 0) {
        // Replace the restaurants in state
        restaurants = resJson.restaurants;
      } else {
        // Append to the restaurants in state
        const { restaurants: restaurantsFromState } = this.state;
        restaurants = [...restaurantsFromState, ...resJson.restaurants];
      }
      this.setState({
        restaurants,
        err: '',
        loading: false,
      });

      // Get another batch from the API
      if (restaurants.length < 100) {
        this.getRestaurants(start + BATCH_SIZE);
      }
    } catch (err) {
      this.setState({
        err: 'Error accessing restaurant data',
        loading: false,
      });
    }
  }

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
          latitude,
          longitude,
          locationState: SET,
        }, this.getRestaurants);
      }, () => {
        // Success
        this.setState({
          err: 'Unable to get location. Searching for results in Adelaide.',
          locationState: DEFAULT,
        }, this.getRestaurants);
      });
    } else {
      // Error
      this.setState({
        err: 'Unable to get location. Searching for results in Adelaide.',
        locationState: DEFAULT,
      }, this.getRestaurants);
    }
  }

  acceptDefaultLocation = () => {
    this.setState({
      locationState: DEFAULT,
    }, this.getRestaurants);
  }

  onCheckboxChange = (e) => {
    const { checkboxes } = this.state;
    const { target } = e;
    const { checked, value } = target;

    this.setState({
      checkboxes: {
        ...checkboxes,
        [value]: checked,
      },
      selectedRestaurant: 0,
    }, this.getRestaurants);
  }

  onRatingsChange = (values) => {
    const intValues = values.map((v) => parseInt(v, 10));
    this.setState({
      ratings: intValues,
      selectedRestaurant: 0,
    });
  }

  onCostsChange = (values) => {
    const intValues = values.map((v) => parseInt(v, 10));
    this.setState({
      costs: intValues,
      selectedRestaurant: 0,
    });
  }

  onRestaurantSelect = (selectedRestaurant) => {
    this.setState({
      selectedRestaurant,
    });
  }

  render() {
    const {
      checkboxes,
      ratings,
      costs,
      restaurants,
      selectedRestaurant,
      locationState,
      err,
      loading,
    } = this.state;
    const filteredRestaurants = restaurants.filter((r) => {
      if (!r.restaurant) return false;
      const rating = parseFloat(r.restaurant.user_rating.aggregate_rating, 10);
      const { price_range: cost } = r.restaurant;
      const ratingInRange = rating >= ratings[0] && rating <= ratings[1];
      const costInRange = cost >= costs[0] && cost <= costs[1];
      return ratingInRange && costInRange;
    });

    const error = filteredRestaurants.length === 0
      && !loading && locationState !== WAITING
      ? 'No restaurants found with these queries' : err;

    return (
      <Container>
        <HeaderSection
          categories={categories}
          cuisines={cuisines}
          checkboxes={checkboxes}
          ratings={ratings}
          costs={costs}
          onRatingsChange={this.onRatingsChange}
          onCostsChange={this.onCostsChange}
          onCheckboxChange={this.onCheckboxChange}
        />
        <MainSection
          restaurants={filteredRestaurants}
          locationState={locationState}
          acceptDefaultLocation={this.acceptDefaultLocation}
          getUserLocation={this.getUserLocation}
          selectedRestaurant={selectedRestaurant}
          onRestaurantSelect={this.onRestaurantSelect}
          err={error}
          loading={loading}
        />
      </Container>
    );
  }
}

export default Page;
