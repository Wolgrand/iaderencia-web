import React, { useState, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
import api from '../../services/api';
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

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [players, setPlayers] = useState<Player[]>([]);

  const [top3, setTop3] = useState<Player[]>([]);

  const [top3Department, setTop3Department] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/rank`).then((response) => {
      setPlayers(response.data);
    });

    api.get(`/departments`).then((response) => {
      const { data } = response;
      setTop3Department(data.filter((item: Department) => item.rank <= 3));
    });

    api.get(`/top3`).then((response) => {
      setTop3(response.data);
      setLoading(false);
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

  if (user.role === 'player') {
    history.push('/message');
  }

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
        {loading ? (
          <div className="loading">
            <FacebookCircularProgress />
            <p>Carregando...</p>
          </div>
        ) : (

          <Schedule>
            <h1>Ranking Gerentes de Projetos</h1>
            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              <span>{selectedDateasText}</span>
              <span>{selectedWeekDay}</span>
            </p>
            <TopDepartamentos>
              <strong>Top 3 - Departamentos</strong>
              <div>
                {top3Department.map((item) => (
                  <div key={item.department}>
                    {item.rank === 1 ? (
                      <FaCrown size={28} color="#f1c40f" />
                    ) : null}
                    {item.rank === 2 ? (
                      <FaCrown size={28} color="#95a5a6" />
                    ) : null}
                    {item.rank === 3 ? (
                      <FaCrown size={28} color="#e67e22" />
                    ) : null}

                    <strong>{item.department}</strong>
                    <span>{item.average} pts</span>
                  </div>
                ))}
              </div>
            </TopDepartamentos>
            <TopGerentes>
              <strong>Top 3 - Gerentes de Projetos</strong>
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
                    {item.avatar_url === null ? (
                      <img src={avatarDefaultImg} alt={item.name} />
                    ) : (
                      <img src={item.avatar_url} alt={item.name} />
                    )}
                    <strong>{item.name}</strong>
                    <span>{item.score} pts</span>
                  </div>
                ))}
              </div>
            </TopGerentes>
            <Section>
              <strong>Top 10</strong>
              {user.role === 'player'
                ? players
                    .filter((p) => p.id === user.id)
                    .map((player) => (
                      <Link
                        to={`/score/${player.id}?rank=${player.rank}`}
                        key={player.id}
                      >
                        <Appointment key={player.id}>
                          <span>{player.rank}º</span>

                          <div>
                            {player.avatar_url !== null ? (
                              <img src={player.avatar_url} alt={player.name} />
                            ) : (
                              <img src={avatarDefaultImg} alt={user.name} />
                            )}

                            <strong>{player.name}</strong>
                            <span>{player.score} pts</span>
                          </div>
                        </Appointment>
                      </Link>
                    ))
                : players.map((player) => (
                    <Link
                      to={`/score/${player.id}?rank=${player.rank}`}
                      key={player.id}
                    >
                      <Appointment key={player.id}>
                        <span>{player.rank}º</span>

                        <div>
                          {player.avatar_url !== null ? (
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
        )}
        
      </Content>
    </Container>
  );
};
export default Dashboard;
