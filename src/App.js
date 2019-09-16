import React from 'react';
import styled from 'styled-components';
import HeaderSection from './components/HeaderSection';
import ResultsSection from './components/ResultsSection';
import DetailsSection from './components/DetailsSection';

const Container = styled.div`
  div {
    display: flex;
  }
`;

function App() {
  return (
    <Container>
      <HeaderSection />
      <div>
        <ResultsSection />
        <DetailsSection />
      </div>
    </Container>
  );
}

export default App;
