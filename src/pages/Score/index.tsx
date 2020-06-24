import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  ChangeEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiPower, FiSave, FiClipboard } from 'react-icons/fi';
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

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Criteria {
  name: string;
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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const items = [
    {
      id: 1,
      score: 100,
      icon: 'file_copy',
      title: 'Atualizar Cronograma com Qualidade',
    },
    {
      id: 2,
      score: 100,
      icon: 'content_paste',
      title: 'Elaborar Relatório com Qualidade',
    },
    {
      id: 3,
      score: 100,
      icon: 'computer',
      title: 'Elaborar Apresentação com Qualidade',
    },
    {
      id: 4,
      score: 100,
      icon: 'offline_bolt',
      title: 'Atualizar Riscos no Sistema',
    },
    {
      id: 5,
      score: 100,
      icon: 'report_problem',
      title: 'Atualizar Problemas no Sistema',
    },
    {
      id: 6,
      score: 100,
      icon: 'trending_up',
      title: 'Atingir a meta do IP',
    },
    {
      id: 7,
      score: 100,
      icon: 'rule',
      title: 'Resolver Pendências de Reuniões',
    },
    {
      id: 8,
      score: 100,
      icon: 'note_add',
      title: 'Cadastrar Lições Aprendidas',
    },
    {
      id: 9,
      score: 100,
      icon: 'update',
      title: 'Atualizar Cronograma no Prazo',
    },
    {
      id: 10,
      score: 100,
      icon: 'restore',
      title: 'Entregar Relatório no Prazo',
    },
    {
      id: 11,
      score: 100,
      icon: 'alarm_on',
      title: 'Entregar Apresentação no Prazo',
    },
    {
      id: 12,
      score: 100,
      icon: 'addchart',
      title: 'Atualizar Documentos do Projeto',
    },
    {
      id: 13,
      score: 100,
      icon: 'message',
      title: 'Interagir no Whatsapp',
    },
    {
      id: 14,
      score: 100,
      icon: 'group_add',
      title: 'Participar das reuniões',
    },
    {
      id: 15,
      score: 100,
      icon: 'notifications',
      title: 'Pontualidade nas Reuniões',
    },
    {
      id: 16,
      score: 100,
      icon: 'edit',
      title: 'Contribuir com o Blog',
    },
  ];

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

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

  const handleSelectItem = (id: number, selectedScore: number) => {
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
              <img
                src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                alt="teste"
              />
              <span>1</span>
              <strong>Wolgrand</strong>
              <p>1200 pts</p>

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
              <Button type="submit">Salvar</Button>
            </strong>

            <ItemsGrid>
              {items.map(({ id, title, icon, score }) => (
                <li
                  key={id}
                  onClick={() => handleSelectItem(id, score)}
                  className={selectedItems.includes(id) ? 'selected' : ''}
                >
                  <Icon>{icon}</Icon>
                  <span>{title}</span>
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
