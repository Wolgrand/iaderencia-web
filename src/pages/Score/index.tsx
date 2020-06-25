import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  ChangeEvent,
} from 'react';

import { Link, useLocation } from 'react-router-dom';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiPower, FiArrowUpCircle } from 'react-icons/fi';
import Icon from '@material-ui/core/Icon';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  Section,
  Avatar,
  Form,
  ItemsGrid,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';
import avatarDefaultImg from '../../assets/avatar.png';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Criteria {
  id: string;
  score: number;
  icon: string;
  title: string;
}

interface Player {
  id: number;
  name: string;
  score: number;
  avatar_url: string;
}

interface Appointment {
  id: number;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Score: React.FC = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [selectedMultiply, setSelectedMultiply] = useState(false);
  const [player, setPlayer] = useState<Player | undefined>();
  const [criterias, setCriterias] = useState<Criteria[]>([]);

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const url = location.pathname.split('/score/');

    const user_id = url[1];

    api.get(`/players/${user_id}`).then((response) => {
      setPlayer(response.data);
    });
  }, [location.pathname]);

  useEffect(() => {
    api.get(`/criterias/`).then((response) => {
      setCriterias(response.data);
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

  const handleSelectItem = (id: string, selectedScore: number): void => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
      if (score > 0) {
        setScore(score - selectedScore);
      }
    } else {
      setSelectedItems([...selectedItems, id]);
      setScore(score + selectedScore);
    }
  };

  const handleMultiply = (): void => {
    console.log(selectedItems.length);
    setSelectedMultiply(!selectedMultiply);

    if (selectedItems.length > 0) {
      if (selectedMultiply === false && score > 0) {
        const multipliedScore = score * 1.5;
        setScore(multipliedScore);
        console.log('o valor vai aumentar');
      }

      if (selectedMultiply === true && score > 0) {
        const multipliedScore = score / 1.5;
        setScore(multipliedScore);
        console.log('o valor vai diminuir');
      }
    } else {
      setScore(0);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          {/* <img src={logoImg} alt="GoBarber" /> */}
          <Link to="/">
            <h1>iAderência</h1>
          </Link>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
          <Profile>
            <img
              src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
              alt={user.name}
            />
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
        <Calendar>
          <Avatar>
            <div>
              {player && player.avatar_url ? (
                <img src={player.avatar_url} alt={player.name} />
              ) : (
                <img src={avatarDefaultImg} alt="avatar" />
              )}

              <span>1</span>
              <strong>{player ? player.name : ''}</strong>
              <p>{player ? player.score : ''} pts</p>

              <section>
                <span>Recompensas</span>
                <ul>
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
              </section>

              <section>
                <br />
                <span>Conquistas</span>
              </section>
            </div>
          </Avatar>
        </Calendar>
        <Schedule>
          <h1>Adicionar Pontuação</h1>

          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateasText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <Section>
            <strong>
              Selecionar Critério
              <p>Pontuação: {score}</p>
              <Button
                type="submit"
                onClick={handleMultiply}
                className={selectedMultiply === true ? 'selected' : ''}
              >
                x 1,5
              </Button>
              <Button type="submit">Salvar</Button>
            </strong>

            <ItemsGrid>
              {criterias.map((criteria) => (
                <li
                  key={criteria.id}
                  onClick={() => handleSelectItem(criteria.id, criteria.score)}
                  className={
                    selectedItems.includes(criteria.id) ? 'selected' : ''
                  }
                >
                  <Icon>{criteria.icon}</Icon>
                  <span>{criteria.title}</span>
                </li>
              ))}
            </ItemsGrid>
          </Section>

          <Section>
            <strong>Histórico de Pontuação</strong>
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};
export default Score;
