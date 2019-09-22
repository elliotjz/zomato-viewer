import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Slider from './Slider';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  flex: 1;

  form {
    display: flex;
    justify-content: space-between;
    padding: 1.8em;
    font-size: 0.8em;
    max-width: 1200px;
    margin: auto;
    color: ${(props) => props.theme.colors.darkGrey};

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
      font-size: 0.9em;
    }

    .section-label {
      font-weight: 600;
      font-size: 0.7em;
      letter-spacing: 0.2em;
    }
  }
`;

const HeaderSection = ({
  categories,
  cuisines,
  checkboxes,
  ratings,
  costs,
  onRatingsChange,
  onCostsChange,
  onCheckboxChange,
}) => (
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
                onChange={onCheckboxChange}
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
                onChange={onCheckboxChange}
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
              onChange={onRatingsChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <label className="section-label" htmlFor="cost">
            COST
            <br />
            <Slider
              values={costs}
              min={1}
              max={4}
              minText="$"
              maxText="$$$$"
              onChange={onCostsChange}
            />
          </label>
        </fieldset>
      </div>
    </form>
  </Container>
);

HeaderSection.propTypes = {
  categories: PropTypes.objectOf(PropTypes.object).isRequired,
  cuisines: PropTypes.objectOf(PropTypes.object).isRequired,
  checkboxes: PropTypes.objectOf(PropTypes.bool).isRequired,
  ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
  costs: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRatingsChange: PropTypes.func.isRequired,
  onCostsChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default HeaderSection;
