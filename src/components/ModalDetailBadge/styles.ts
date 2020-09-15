import styled from 'styled-components';




export const Container = styled.div`
      height: 256px;
      width: 256px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  align-items: center;

    div {
      width:  450px;
      div {
        margin: 20px;
      strong {
        font-weight: 600;
    font-size: 24px;
    color: #ff9000;
    padding: 0 10px 10px 0;

      }

      span {
        font-size: 18px;
        color: #efefef;
      }
    }
    }

    

    img {
      margin-left: 20px;
      margin-right: 20px;
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

    height: 256px;
    width: 256px;
    margin: auto;
    padding-left: 20px;
   


    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;



}


   
    

    }

    
  }

`;
