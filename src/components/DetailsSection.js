import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 7;
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 3rem;
`;

const DetailsSection = () => (
  <Container>
    <p>DetailsSection</p>
  </Container>
);

export default DetailsSection;
