import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderSection from './HeaderSection';
import MainSection from './MainSection';

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
      ratings: [1, 2],
      costs: [1, 2],
      restaurants: [],
    };
  }

  componentDidMount() {
    const checkboxes = {};
    const categoryKeys = Object.keys(categories);
    const cuisineKeys = Object.keys(cuisines);
    [...categoryKeys, ...cuisineKeys].forEach((item) => {
      checkboxes[item] = false;
    });
    this.getRestaurants();
    this.setState({ checkboxes });
  }

  async getRestaurants() {
    const { checkboxes } = this.state;
    let query = '?entity_id=297&entity_type=city';

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
    let cuisineQuery = '&cuisine=';
    Object.keys(cuisines).forEach((item) => {
      if (checkboxes[item]) {
        cuisineQuery += `${cuisines[item].id},`;
      }
    });
    if (cuisineQuery !== '&cuisine=') {
      query += cuisineQuery.slice(0, -1);
    }

    const url = `https://developers.zomato.com/api/v2.1/search${query}`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'user-key': `${process.env.REACT_APP_ZOMATO_API_KEY}`,
      },
    });
    if (res.status === 200) {
      const resJson = await res.json();
      this.setState({ restaurants: resJson.restaurants });
    } else {
      console.log(`Error. State: ${res.status}`);
    }
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
    }, this.getRestaurants);
  }

  onRatingsChange = (values) => {
    const intValues = values.map((v) => parseInt(v, 10));
    this.setState({
      ratings: intValues,
    }, this.getRestaurants);
  }

  onCostsChange = (values) => {
    const intValues = values.map((v) => parseInt(v, 10));
    this.setState({
      costs: intValues,
    }, this.getRestaurants);
  }

  render() {
    const {
      checkboxes, ratings, costs, restaurants,
    } = this.state;
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
        <MainSection restaurants={restaurants} />
      </Container>
    );
  }
}

export default Page;
