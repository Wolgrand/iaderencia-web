import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  h1 {
    text-decoration: none;
    color: #f4ede8;
  }

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 38px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 46px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
      background: #3e3b47;
      display: flex;
      align-items: center;
      padding: 14px 20px;
      border-radius: 10px;
      margin-top: 16px;
      margin-right: 16px;
      position: relative;

      > svg {
        margin-right: 20px;
      }

      &::before {
        position: absolute;
        height: 80%;
        width: 1px;
        left: 0;
        top: 10%;
        content: '';
        background: #ff9000;
      }

      img {
        width: 54px;
        height: 54px;
        border-radius: 50%;
      }

      strong {
        margin-left: 20px;
        margin-right: 10px;
        color: #fff;
      }

      span {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #999591;
        font-size: 18px;

        svg {
          color: #ff9000;
          margin-right: 8px;
        }
      }
    }
  }
`;
export const Section = styled.section`
  margin-top: 48px;
  align-items: center;

  > strong {
    display: flex;
    flex-direction: row;
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 16px;

    > p {
      color: #ff9000;
      font-size: 16px;
    }

    button {
      width: 10%;
      height: 26px;
      background: #312e38;
      color: #f4ede8;
      margin-top: 0px;
      padding: 0;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        opacity: 0.8;
        background: transparent;
      }
      .selected {
        opacity: 0.9;
        border: 2px solid #ff9000;
        color: #ff9000;
      }
    }
  }

  > p {
    color: #999591;
    margin-top: 30px;
  }

  h3 {
    color: #f4ede8;
    padding: 10px;
    margin-top: 30px;
  }
`;

export const Form = styled.section`
  display: flex;

  section {
    > span {
      border-top: 1px solid #999591;
      margin-bottom: 20px;
      padding-top: 40px;
    }
    span {
      padding: 10px;
      color: #f4ede8;
      font-size: 20px;

      display: flex;
      justify-content: center;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      list-style: none;

      li {
        background: #3e3b47;
        font-size: 14px;
        height: 120px;
        width: 120px;
        border-radius: 8px;
        padding: 16px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        text-align: center;

        cursor: pointer;

        span {
          flex: 1;
          margin-top: 12px;

          display: flex;
          align-items: center;
        }
      }
    }
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    flex: 1;
    display: block;
    background: #3e3b47;
    border-radius: 8px;
    border: 0;
    padding: 12px 24px;
    font-size: 18px;
    color: #6c6c80;
    margin-right: 10px;
  }

  > button {
    width: 20%;
    padding: 12px 18px;
    font-size: 16px;
    margin-right: 0;
  }

  button {
    width: 20%;
    padding: 12px 18px;
    font-size: 16px;
    margin: 0 auto;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  > span {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ff9000;
    width: 70px;
    font-size: 24px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }
  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #f4ede8;
    }
    font-size: 20px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }

    display: block;
  }
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  > span {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ff9000;
    width: 70px;
    font-size: 24px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }
  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 148px;
      height: 148px;
      border-radius: 50%;
    }
    > span {
      position: relative;
      width: 28px;
      height: 28px;
      background: #ff9000;
      border-radius: 50%;
      right: 30%;
      bottom: 30px;
      border: 0;
      cursor: pointer;
      transition: background-color 0.2s;
      color: #312e38;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    strong {
      color: #fff;
      font-size: 28px;
      margin-bottom: 10px;
    }

    p {
      color: #fff;
      font-size: 32px;
      margin-bottom: 15px;
      color: #ff9000;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #f4ede8;
      font-size: 20px;
    }
    section {
      > span {
        border-top: 1px solid #999591;
        margin-bottom: 20px;
        padding-top: 40px;
        flex: 1;
      }
      span {
        padding: 10px;
        color: #f4ede8;
        font-size: 20px;

        display: flex;
        justify-content: center;
      }
      ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        list-style: none;

        li {
          background: #312e38;

          height: 60px;
          border-radius: 8px;
          padding: 32px 32px 16px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          text-align: center;

          cursor: pointer;

          span {
            flex: 1;
            margin-top: 12px;

            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  list-style: none;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  li {
    background: #3e3b47;
    border: 2px solid #3e3b47;
    height: 120px;
    width: 140px;
    font-size: 14px;
    border-radius: 8px;
    padding: 12px 12px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;
    span {
      flex: 1;

      display: flex;
      align-items: center;
      color: var(--title-color);
    }
  }
  .selected {
    opacity: 0.9;
    border: 2px solid #ff9000;
  }
`;
export const Calendar = styled.aside`
  margin-right: 50px;
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
