import React, { Component } from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';
import Slider from './Slider';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  flex: 1;

  form {
    display: flex;
    justify-content: space-between;
    padding: 3em;
    font-size: 0.8em;
    max-width: 1200px;
    margin: auto;

    .checkboxes-container {
      display: flex;

      fieldset {
        margin: 1em;
      }
    }

    .sliders-container {
      width: 100%;
      min-width: 150px;
      max-width: 250px;
      margin-right: 3em;

      fieldset {
        margin: 1em 0;
      }
    }

    .checkboxes {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-auto-flow: column;
    }

    .section-label {
      font-weight: 600;
      font-size: 0.8em;
      letter-spacing: 0.2em;
    }
  }
`;

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

class HeaderSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: {},
      ratings: [1, 2],
      costs: [1, 2],
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

  async componentDidUpdate() {
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
        'user-key': `${process.env.REACT_APP_ZOMATO_API_KEY}a`,
      },
    });
    if (res.status === 200) {
      const resJson = await res.json();
      console.log(resJson);
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
    });
  }

  onRatingsChange = (values) => {
    const intValues = values.map((v) => parseInt(v, 10));
    this.setState({
      ratings: intValues,
    });
  }

  onCostsChange = (values) => {
    const intValues = values.map((v) => parseInt(v, 10));
    this.setState({
      costs: intValues,
    });
  }

  render() {
    const { checkboxes, ratings, costs } = this.state;
    return (
      <Container>
        <form>
          <div className="checkboxes-container">
            <fieldset id="categories">
              <label className="section-label" htmlFor="categories">CATEGORY</label>
              <div className="checkboxes">
                {Object.keys(categories).map((category) => (
                  <Checkbox
                    key={category}
                    name={category}
                    text={categories[category].text}
                    categoryName="category"
                    checked={!!checkboxes[category]}
                    onChange={this.onCheckboxChange}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset id="cuisines">
              <label className="section-label" htmlFor="cuisines">CUISINE</label>
              <div className="checkboxes">
                {Object.keys(cuisines).map((cuisine) => (
                  <Checkbox
                    key={cuisine}
                    name={cuisine}
                    text={cuisines[cuisine].text}
                    categoryName="cuisine"
                    checked={!!checkboxes[cuisine]}
                    onChange={this.onCheckboxChange}
                  />
                ))}
              </div>
            </fieldset>
          </div>
          <div className="sliders-container">
            <fieldset>
              <label className="section-label" htmlFor="rating">
                RATING
                <br />
                <Slider
                  values={ratings}
                  min={0}
                  max={5}
                  minText="0"
                  maxText="5"
                  onChange={this.onRatingsChange}
                />
              </label>
            </fieldset>
            <fieldset>
              <label className="section-label" htmlFor="cost">
                COST
                <br />
                <Slider
                  values={costs}
                  min={0}
                  max={3}
                  minText="$"
                  maxText="$$$$"
                  onChange={this.onCostsChange}
                />
              </label>
            </fieldset>
          </div>
        </form>
      </Container>
    );
  }
}

export default HeaderSection;
