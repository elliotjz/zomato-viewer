import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  flex: 3;
  background-color: ${(props) => props.theme.colors.grey};
  padding: 1rem 1rem 1rem 0;

  button {
    display: block;
  }
`;

const ResultsSection = ({ restaurants, loading, onResultClick }) => (
  <Container>
    <h3>ResultsSection</h3>

    {loading ? <p>Loading...</p>
      : (
        <menu>
          <ul>
            {restaurants.map((r, index) => (
              <li key={r.restaurant.R.res_id}>
                <button
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
};

export default ResultsSection;
