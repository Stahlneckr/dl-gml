import React from 'react';
import styled from 'styled-components';

import { Dial } from './components/Dial';

const Container = styled.div<{
  noBorder?: boolean;
}>`
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(p) => (p.noBorder ? 0 : '8px solid #191919')};
`;

export const App: React.FC = () => {
  return (
    <Container>
      <Dial />
    </Container>
  );
};
