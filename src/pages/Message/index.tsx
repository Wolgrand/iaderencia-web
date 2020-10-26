import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isToday } from 'date-fns';

import 'react-day-picker/lib/style.css';
import { FiPower, FiSettings } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  TopGerentes,
  Appointment,
  Section,
  TopDepartamentos,
} from './styles';

import avatarDefaultImg from '../../assets/avatar.png';
import logo from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';

import FacebookCircularProgress from '../../components/Loading';

interface Player {
  id: string;
  name: string;
  company: string;
  department: string;
  score: number;
  avatar_url: string;
  rank: number;
}
interface Department {
  department: string;
  average: number;
  rank: number;
}

const Message: React.FC = () => {
  const { signOut, user } = useAuth();
  




  return (
    <Container>
            <Header>
        <HeaderContent>
          <Link to="/">
            <img src={logo} alt="PM-Gamification" />
          </Link>
          <button type="button" />

          <Profile>
            {user.role === 'pmo' ? (
              <Link to="/admin">
                <button type="button">
                  <FiSettings />
                </button>
              </Link>
            ) : null}

            {user.avatar_url === null ? (
              <img src={avatarDefaultImg} alt={user.name} />
            ) : (
              <img src={user.avatar_url} alt={user.name} />
            )}

            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
            <h1 style={{fontWeight: 700, fontSize: 72}}>😎</h1>
            <br />
            <h2 style={{fontWeight: 500, fontSize: 54}}>Oops!&nbsp;<strong style={{fontWeight: 500, fontSize: 54, color: '#FF9000'}}>{user.name}</strong>, </h2>
            <br />
            <br />
            <h3 style={{fontWeight: 500, fontSize: 42, textAlign:  'center'}}>Você está tentando acessar a sua pontuação e o ranking de jogadores e departamentos? Para aumentar o suspense o resultado final será apresentado apenas no dia da premiação!</h3>
      </Content>
    </Container>
  );
};
export default Message;
