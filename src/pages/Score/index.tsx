import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';

import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiPower } from 'react-icons/fi';
import Icon from '@material-ui/core/Icon';
import { useToast } from '../../hooks/toast';
import ToggleSwitch from '../../components/ToggleSwitch';
import ToggleSwitchDisabled from '../../components/ToggleSwitchDisabled';

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
  ItemsGrid,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';
import avatarDefaultImg from '../../assets/avatar.png';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Criterias {
  id: string;
}

interface Criteria {
  id: string;
  score: number;
  icon: string;
  title: string;
}

interface Player {
  id: string;
  name: string;
  score: number;
  avatar_url: string;
}

const Score: React.FC = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const { addToast } = useToast();
  const history = useHistory();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [score, setScore] = useState(0);
  const [multipliedScore, setMultipliedScore] = useState(0);
  const [toggleDisabled, setToggleDisabled] = useState(false);

  const [selectedMultiply, setSelectedMultiply] = useState(false);
  const [player, setPlayer] = useState<Player | undefined>();
  const [criterias, setCriterias] = useState<Criteria[]>([]);

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const rank = location.search.split('?rank=');
  const { id } = useParams();

  useEffect(() => {
    api.get(`/players/${id}`).then((response) => {
      setPlayer(response.data);
    });
  }, [id]);

  useEffect(() => {
    api.get(`/criterias/`).then((response) => {
      setCriterias(response.data);
    });
  }, []);

  useEffect(() => {
    setMultipliedScore(score * 1.5);

    score === 0 ? setSelectedMultiply(false) : setToggleDisabled(true);
  }, [score]);

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
    const alreadySelected = selectedCriteria.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedCriteria.filter((item) => item !== id);
      setSelectedCriteria(filteredItems);
      if (score > 0) {
        setScore(score - selectedScore);
        setMultipliedScore(Math.ceil(score * 1.5));
      }
    } else {
      setSelectedCriteria([...selectedCriteria, id]);
      setScore(score + selectedScore);
      setMultipliedScore(Math.ceil(score * 1.5));
    }
  };

  const toggleMultiply = (): void => {
    setSelectedMultiply(!selectedMultiply);
  };
  const handleSave = (): void | undefined => {
    const newScore = selectedMultiply === true ? multipliedScore : score;
    const data = {
      user_id: id,
      newScore,
      criterias: selectedCriteria,
    };

    console.log(data);
    api.post('/transactions', data).then((response) => {
      addToast({
        type: 'success',
        title: 'Pontuação Atualizada',
        description: `Pontuação de ${player?.name} foi atualizada com sucesso!`,
      });

      history.push('/dashboard');
    });
  };

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

              <span>{rank}</span>
              <strong>{player ? player.name : ''}</strong>
              <p>{player ? player.score : ''} pts</p>

              <section>
                <span>Conquistas</span>
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
              {selectedMultiply === true ? (
                <p>Pontuação: {Math.ceil(multipliedScore)}</p>
              ) : (
                <p>Pontuação: {score}</p>
              )}
              <div>
                {score > 0 ? (
                  <ToggleSwitch toggleMultiply={toggleMultiply} />
                ) : (
                  <ToggleSwitchDisabled toggleMultiply={toggleMultiply} />
                )}

                <p>1,5x</p>
              </div>
              <Button type="submit" onClick={handleSave}>
                Salvar
              </Button>
            </strong>

            <ItemsGrid>
              {criterias.map((criteria) => (
                <li
                  key={criteria.id}
                  onClick={() => handleSelectItem(criteria.id, criteria.score)}
                  className={
                    selectedCriteria.includes(criteria.id) ? 'selected' : ''
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
