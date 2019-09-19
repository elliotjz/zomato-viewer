import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 3;
  background-color: ${(props) => props.theme.colors.grey};
  padding: 1rem 1rem 1rem 0;
`;

const ResultsSection = ({ restaurants }) => (
  <Container>
    <p>ResultsSection</p>
  </Container>
);

export default ResultsSection;
