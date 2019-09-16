import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 3rem;
`;

const HeaderSection = () => (
  <Container>
    <p>HeaderSection</p>
  </Container>
);

export default HeaderSection;
