import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  background-color: #312e38;
  border-color: #312e38;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
    color: #ff9000;
  }
  button {
    margin-top: 48px;
    align-self: flex-end;
  }
  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #ff9000;
    color: #312e38;
    display: flex;
    flex-direction: row;
    align-items: center;
    .text {
      padding: 16px 24px;
    }
    .icon {
      display: flex;
      padding: 16px 16px;
      background: #fe9000;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;
