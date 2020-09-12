import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
padding: 0 20px;
justify-content: flex-end;
display: flex;


button {
  width: 240px;
  right: 0;

}

`;

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

export const Title = styled.div`
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
    color: #ff9000;
    padding: 0 20px;
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  list-style: none;
  padding: 0px 20px;
  margin-bottom: 5px;



  .selected {
    opacity: 0.9;
    border: 2px solid #ff9000;

      }

  > div {
    border: 2px solid #3e3b47;
    
    border-radius: 8px;

div {

    height: 106px;
    width: 106px;
    margin: auto;
   


    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;



}


   
    

    }

    img {
      width: 84px;
      height: 84px;
      margin: auto;

    }
  }

`;
