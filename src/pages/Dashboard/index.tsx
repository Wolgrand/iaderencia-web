import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  rank: number;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [players, setPlayers] = useState<Player[]>([]);
  const [top3, setTop3] = useState<Player[]>([]);

  useEffect(() => {
    api.get(`/rank`).then((response) => {
      setPlayers(response.data);
    });

    api.get(`/top3`).then((response) => {
      setTop3(response.data);
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
              {top3.map((item) => (
                <div key={item.id}>
                  {item.rank === 1 ? (
                    <FaCrown size={28} color="#f1c40f" />
                  ) : null}
                  {item.rank === 2 ? (
                    <FaCrown size={28} color="#95a5a6" />
                  ) : null}
                  {item.rank === 3 ? (
                    <FaCrown size={28} color="#e67e22" />
                  ) : null}
                  {item.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} />
                  ) : (
                    <img src={avatarDefaultImg} alt={user.name} />
                  )}
                  <strong>{item.name}</strong>
                  <span>{item.score} pts</span>
                </div>
              ))}
            </div>
          </NextAppointment>

          <Section>
            <strong>Top 10</strong>
            {players.map((player) => (
              <Link
                to={`/score/${player.id}?rank=${player.rank}`}
                key={player.id}
              >
                <Appointment key={player.id}>
                  <span>{player.rank}º</span>

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
