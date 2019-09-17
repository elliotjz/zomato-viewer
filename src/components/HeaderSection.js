import React, { Component } from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';
import Slider from './Slider';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 3rem;

  form {
    display: flex;
    justify-content: space-between;

    .checkboxes-container {
      display: flex;

      fieldset {
        margin: 1em;

        .fieldset-label {
          font-weight: 600;
          font-size: 0.8em;
          letter-spacing: 0.2em;
        }
      }
    }

    .sliders-container {
      // float: right;
    }

    .checkboxes {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-auto-flow: column;
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
      rating: '2',
      cost: '1',
    };
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

  onRatingChange = (e) => {
    this.setState({
      rating: e.target.value,
    });
  }

  onCostChange = (e) => {
    this.setState({
      cost: e.target.value,
    });
  }

  render() {
    const { checkboxes, rating, cost } = this.state;

    return (
      <Container>
        <form>
          <div className="checkboxes-container">
            <fieldset id="categories">
              <label className="fieldset-label" htmlFor="categories">CATEGORY</label>
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
              <label className="fieldset-label" htmlFor="cuisines">CUISINE</label>
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
              <label htmlFor="rating">
                Rating
                <br />
                <Slider
                  label="rating"
                  value={rating}
                  min="0"
                  max="5"
                  onChange={this.onRatingChange}
                />
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="cost">
                Cost
                <br />
                <Slider
                  label="cost"
                  value={cost}
                  min="1"
                  max="4"
                  onChange={this.onCostChange}
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
