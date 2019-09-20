import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  flex: 3;
  background-color: ${(props) => props.theme.colors.grey};
  padding: 1rem 1rem 1rem 0;
  height: 80vh;
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
`;

const ResultsSection = ({
  restaurants, loading, onResultClick, selectedIndex,
}) => (
  <Container>
    <h3>RESULTS</h3>

    {loading ? <p>Loading...</p>
      : (
        <menu>
          <ul>
            {restaurants.map((r, index) => (
              <li key={r.restaurant.R.res_id}>
                <button
                  className={selectedIndex === index ? 'selected' : ''}
                  type="button"
                  onClick={() => onResultClick(index)}
                >
                  {r.restaurant.name}
                </button>
              </li>
            ))}
          </ul>
        </menu>
      )}
  </Container>
);

ResultsSection.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  onResultClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default ResultsSection;
