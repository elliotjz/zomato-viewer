import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderSection from './HeaderSection';
import ResultsSection from './ResultsSection';
import DetailsSection from './DetailsSection';

const Container = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-family: sans-serif;

  div.main {
    display: flex;
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class Page extends Component {
  render() {
    return (
      <Container>
        <HeaderSection />
        <div className="main">
          <ResultsSection />
          <DetailsSection />
        </div>
      </Container>
    );
  }
}

export default Page;
