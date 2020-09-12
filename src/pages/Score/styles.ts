import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background-color: #312e38;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%2328262e' fill-opacity='0.19' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E");
  .loading {
    margin: 25vh auto;
  }
`;

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
    margin-right: 5px;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      margin: 10px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  justify-content: space-around;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin: 0 15px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
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

    div {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;

      p {
        color: #f4ede8;
        font-size: 14px;
      }
    }

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

    margin-top: 10px;
  }
`;

export const Reward = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: #f4ede8;
  padding-top: 20px;
  text-align: left;
  border-top: 1px solid #999591;
  margin-bottom: 50px;

  > strong {
    color: #fff;
    font-size: 22px;
    margin-bottom: 20px;
  }

  > p {
    left: 0px;
    font-size: 16px;
    color: #999591;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      width: 80%;
      height: 80%;
    }

    > p {
      margin: 10px auto;
      font-size: 16px;
      color: #999591;
    }
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
  justify-content: column;

  flex: 1;
  background: #3e3b47;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  border-radius: 10px;
  margin-left: 24px;
`;
export const PlayerProfile = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: center;
  img {
    width: 156px;
    height: 156px;
    border-radius: 50%;
  }

  span {
    position: relative;
    width: 28px;
    height: 28px;
    background: #ff9000;
    border-radius: 50%;
    left: 50px;
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
    text-align: center;
  }

  p {
    color: #fff;
    font-size: 32px;
    margin-bottom: 15px;
    color: #ff9000;
    text-align: center;
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

export const RewardsMain = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: #f4ede8;
  padding-top: 20px;
  text-align: left;
  border-top: 1px solid #999591;
  margin-bottom: 50px;
  > strong {
    color: #fff;
    font-size: 22px;
    margin-bottom: 20px;
  }
`;
export const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  list-style: none;

  div {
    background: #312e38;
    border: 2px solid #3e3b47;
    height: 90px;
    width: 90px;

    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;
    
  }
  .selected {
    opacity: 0.9;
    border: 2px solid #ff9000;
  }
`;
