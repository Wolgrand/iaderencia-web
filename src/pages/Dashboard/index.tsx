import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Appointment,
  Section,
} from './styles';

import avatarDefaultImg from '../../assets/avatar.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Player {
  id: number;
  name: string;
  score: number;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    api.get(`/rank`).then((response) => {
      setPlayers(response.data);
    });
  }, []);

  const selectedDateasText = useMemo(() => {
    return format(selectedDate, " 'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <h1>iAderência</h1>
          </Link>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
          <Profile>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} />
            ) : (
              <img src={avatarDefaultImg} alt={user.name} />
            )}
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Ranking Gerentes de Projetos</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateasText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Top 3</strong>
            <div>
              <Link to="/score">
                <div>
                  <FaCrown size={28} color="#f1c40f" />
                  <img
                    src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                    alt="teste"
                  />
                  <strong>Wolgrand</strong>
                  <span>1200 pts</span>
                </div>
              </Link>
              <Link to="/score">
                <div>
                  <FaCrown size={28} color="#95a5a6" />
                  <img
                    src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                    alt="teste"
                  />
                  <strong>Wolgrand</strong>
                  <span>1200 pts</span>
                </div>
              </Link>
              <Link to="/score">
                <div>
                  <FaCrown size={28} color="#e67e22" />
                  <img
                    src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                    alt="teste"
                  />
                  <strong>Wolgrand</strong>
                  <span>1200 pts</span>
                </div>
              </Link>
            </div>
          </NextAppointment>

          <Section>
            <strong>Top 10</strong>
            {players.map((player) => (
              <Link to={`/score/${player.id}`}>
                <Appointment key={player.id}>
                  <span>1º</span>

                  <div>
                    {player.avatar_url ? (
                      <img src={player.avatar_url} alt={player.name} />
                    ) : (
                      <img src={avatarDefaultImg} alt={user.name} />
                    )}

                    <strong>{player.name}</strong>
                    <span>{player.score} pts</span>
                  </div>
                </Appointment>
              </Link>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};
export default Dashboard;
