import React from 'react';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

import theme from '../theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Spinner = () => (
  <Container>
    <BeatLoader
      sizeUnit="px"
      size={10}
      color={theme.colors.teal}
      loading
    />
  </Container>
);

export default Spinner;
