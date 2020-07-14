import React from 'react';

import { Container, Phanton, Main } from './styles';

const Footer: React.FC = ({ children }) => {
  return (
    <Container>
      <Phanton />
      <Main>{children}</Main>
    </Container>
  );
};

export default Footer;
