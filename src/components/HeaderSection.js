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

const categories = [
  { value: 'Dining', text: 'Dining' },
  { value: 'Take-Away', text: 'Take-Away' },
  { value: 'Delivery', text: 'Delivery' },
  { value: 'Pubs-And-Bars', text: 'Pubs & Bars' },
];

const cuisines = [
  { value: 'Cafe-Food', text: 'Cafe Food' },
  { value: 'Coffee-and-Tea', text: 'Coffee and Tea' },
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Fast-Food', text: 'Fast Food' },
  { value: 'Asian', text: 'Asian' },
  { value: 'Bakery', text: 'Bakery' },
  { value: 'Italian', text: 'Italian' },
  { value: 'Sandwich', text: 'Sandwich' },
  { value: 'Chinese', text: 'Chinese' },
  { value: 'Pub-Food', text: 'Pub Food' },
  { value: 'Other', text: 'Other' },
];

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
    [...categories, ...cuisines].forEach((item) => {
      checkboxes[item.value] = false;
    });
    this.setState({ checkboxes });
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
                {categories.map((category) => (
                  <Checkbox
                    key={category.value}
                    name={category.value}
                    text={category.text}
                    categoryName="category"
                    checked={!!checkboxes[category.value]}
                    onChange={this.onCheckboxChange}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset id="cuisines">
              <label className="section-label" htmlFor="cuisines">CUISINE</label>
              <div className="checkboxes">
                {cuisines.map((cuisine) => (
                  <Checkbox
                    key={cuisine.value}
                    name={cuisine.value}
                    text={cuisine.text}
                    categoryName="cuisine"
                    checked={!!checkboxes[cuisine.value]}
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
