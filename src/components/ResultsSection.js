import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  flex: 3;
  background-color: ${(props) => props.theme.colors.grey};
  padding: 1rem 1rem 1rem 0;
  overflow: scroll;

  h3 {
    color: ${(props) => props.theme.colors.darkGrey};
    font-weight: 600;
    font-size: 0.6em;
    letter-spacing: 0.2em;
    padding: 1.5em 2.7em;
  }

  button {
    display: block;
    width: 100%;
    height: 2.5em;
    color: ${(props) => props.theme.colors.darkGrey};
    border: 0;
    background-color: transparent;
    border-top: 1px solid ${(props) => `${props.theme.colors.darkGrey}44`};
    font-size: 0.8em;
    text-align: left;
    padding-left: 2em;
  }

  button.selected {
    background-color: ${(props) => props.theme.colors.teal};
    color: ${(props) => props.theme.colors.white};
    border: 0;
  }

  .err {
    border-top: 1px solid ${(props) => `${props.theme.colors.red}77`};
    border-bottom: 1px solid ${(props) => `${props.theme.colors.red}77`};
    color: ${(props) => props.theme.colors.red};
    padding: 0.5em 2em;
  }

  .loading {
    padding-left: 2em;
  }
`;

const ResultsSection = ({
  restaurants, onRestaurantSelect, selectedRestaurant, err, loading,
}) => (
  <Container>
    <h3>RESULTS</h3>

    {!loading && err === '' ? (
      <menu>
        <ul>
          {restaurants.map((r, index) => (
            <li key={r.restaurant.R.res_id}>
              <button
                className={selectedRestaurant === index ? 'selected' : ''}
                type="button"
                onClick={() => onRestaurantSelect(index)}
              >
                {r.restaurant.name}
              </button>
            </li>
          ))}
        </ul>
      </menu>
    ) : (
      <>
        {loading && <p className="loading">Loading...</p>}
        {err !== '' && <p className="err">{err}</p>}
      </>
    )}
  </Container>
);

ResultsSection.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRestaurantSelect: PropTypes.func.isRequired,
  selectedRestaurant: PropTypes.number.isRequired,
  err: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ResultsSection;
