import React, { useState, useEffect, useMemo } from 'react';

import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { isToday, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiPower, FiSettings } from 'react-icons/fi';
import Icon from '@material-ui/core/Icon';
import { Line } from 'rc-progress';
import { useToast } from '../../hooks/toast';
import ToggleSwitch from '../../components/ToggleSwitch';
import ToggleSwitchDisabled from '../../components/ToggleSwitchDisabled';
import Badge from '../../components/Badge';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  RewardsMain,
  RewardsGrid,
  Calendar,
  Section,
  Avatar,
  ItemsGrid,
  PlayerProfile,
  Reward,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';
import FacebookCircularProgress from '../../components/Loading';

import avatarDefaultImg from '../../assets/avatar.png';
import logo from '../../assets/logo.png';

interface Criteria {
  id: string;
  score: number;
  icon: string;
  title: string;
}
interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  score: number;
}

interface Transaction {
  id: string;
  created_at: string;
  transaction_criterias: [
    {
      criteria: {
        title: string;
        score: string;
      };
    },
  ];
}

interface TransactionReward {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    score: number;
    role: string;
    department: string;
    avatar_url: string;
  };
  reward: {
    id: string;
    title: string;
    description: string;
    icon: string;
    score: number;
  };
  user_id: string;
  reward_id: string;
  score: number;
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
  const [loading, setLoading] = useState(false);

  const [selectedMultiply, setSelectedMultiply] = useState(false);
  const [player, setPlayer] = useState<Player | undefined>();
  const [criterias, setCriterias] = useState<Criteria[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsRewards, setTransactionsRewards] = useState<
    TransactionReward[]
  >([]);

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const rank = location.search.split('?rank=');
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    api.get(`/players/${id}`).then((response) => {
      setPlayer(response.data);
    });

    api.get(`/transactions/${id}`).then((response) => {
      setTransactions(response.data);
    });

    api.get(`/transactions-rewards/${id}`).then((response) => {
      setTransactionsRewards(response.data);
    });

    api.get(`rewards/`).then((response) => {
      setRewards(response.data);
    });

    api.get(`/criterias/`).then((response) => {
      setCriterias(response.data);
    });

    setLoading(false);
  }, [id]);

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

  const emptyRewardsSpaces = Array(rewards.length - transactionsRewards.length);

  const handleSave = (): void | undefined => {
    const newScore = selectedMultiply === true ? multipliedScore : score;
    const newCriteria = [];

    for (const item in selectedCriteria) {
      newCriteria.push({
        id: selectedCriteria[item],
      });
    }

    const data = {
      user_id: id,
      newScore,
      criterias: newCriteria,
    };

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
            <img src={logo} alt="PM-Gamification" />
          </Link>
          <button type="button"></button>

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
      {loading ? (
        <div className="loading">
          <FacebookCircularProgress />
          <p>Carregando...</p>
        </div>
      ) : (
        <Content>
          <Calendar>
            <Avatar>
              <PlayerProfile>
                {player && player.avatar_url ? (
                  <img src={player.avatar_url} alt={player.name} />
                ) : (
                  <img src={avatarDefaultImg} alt="avatar" />
                )}

                <span>{rank}</span>
                <strong>{player ? player.name : ''}</strong>
                <p>{player ? player.score : ''} pts</p>
              </PlayerProfile>
              <RewardsMain>
                <strong>Conquistas</strong>

                <RewardsGrid>
                  {transactionsRewards.map((item) => (
                    <>
                      <Badge
                        icon={item.reward.icon}
                        score={item.reward.score}
                        key={item.id}
                        title={item.reward.title}
                      />
                    </>
                  ))}

                  {emptyRewardsSpaces.fill(<div />)}
                </RewardsGrid>
              </RewardsMain>
              <Reward>
                <strong>Recompensas</strong>
                <p>Caixa de Chocolate - 1000pts</p>
                {player && player.score / 1000 <= 1 ? (
                  <div>
                    <Line
                      percent={(player.score / 1000) * 100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#ff9000"
                      strokeLinecap="round"
                    />
                    <p>{Math.ceil((player.score / 1000) * 100)}%</p>
                  </div>
                ) : (
                  <div>
                    <Line
                      percent={100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#27ae60"
                      strokeLinecap="round"
                    />
                    <p>100%</p>
                  </div>
                )}

                <p>Pen Drive - 2500pts</p>
                {player && player.score / 2500 <= 1 ? (
                  <div>
                    <Line
                      percent={(player.score / 2500) * 100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#ff9000"
                      strokeLinecap="round"
                    />
                    <p>{Math.ceil((player.score / 2500) * 100)}%</p>
                  </div>
                ) : (
                  <div>
                    <Line
                      percent={100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#27ae60"
                      strokeLinecap="round"
                    />
                    <p>100%</p>
                  </div>
                )}

                <p>Livro Técnico - 3500pts</p>
                {player && player.score / 3500 <= 1 ? (
                  <div>
                    <Line
                      percent={(player.score / 3500) * 100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#ff9000"
                      strokeLinecap="round"
                    />
                    <p>{Math.ceil((player.score / 3500) * 100)}%</p>
                  </div>
                ) : (
                  <div>
                    <Line
                      percent={100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#27ae60"
                      strokeLinecap="round"
                    />
                    <p>100%</p>
                  </div>
                )}

                <p>Fone de Ouvido - 5000pts</p>
                {player && player.score / 5000 <= 1 ? (
                  <div>
                    <Line
                      percent={(player.score / 5000) * 100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#ff9000"
                      strokeLinecap="round"
                    />
                    <p>{Math.ceil((player.score / 5000) * 100)}%</p>
                  </div>
                ) : (
                  <div>
                    <Line
                      percent={100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#27ae60"
                      strokeLinecap="round"
                    />
                    <p>100%</p>
                  </div>
                )}

                <p>Leitor de Livros - 7500pts</p>
                {player && player.score / 7500 <= 1 ? (
                  <div>
                    <Line
                      percent={(player.score / 7500) * 100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#ff9000"
                      strokeLinecap="round"
                    />
                    <p>{Math.ceil((player.score / 7500) * 100)}%</p>
                  </div>
                ) : (
                  <div>
                    <Line
                      percent={100}
                      strokeWidth={6}
                      trailWidth={5}
                      strokeColor="#27ae60"
                      strokeLinecap="round"
                    />
                    <p>100%</p>
                  </div>
                )}
              </Reward>
            </Avatar>

            <section>
              <br />
            </section>
          </Calendar>
          <Schedule>
            <h1>Adicionar Pontuação</h1>

            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              <span>{selectedDateasText}</span>
              <span>{selectedWeekDay}</span>
            </p>

            {user.role === 'pmo' ? (
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
                      onClick={() =>
                        handleSelectItem(criteria.id, criteria.score)
                      }
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
            ) : null}

            <Section>
              <strong>Histórico de Pontuação</strong>

              {transactions.map((transaction) => (
                <div key={transaction.id}>
                  {' '}
                  <h3>
                    {format(parseISO(transaction.created_at), 'dd/MM/yyyy')}
                  </h3>
                  {transaction.transaction_criterias.map((criteria) => (
                    <p>
                      {criteria.criteria.title} - {criteria.criteria.score}pts
                    </p>
                  ))}
                </div>
              ))}
            </Section>
          </Schedule>
        </Content>
      )}
    </Container>
  );
};
export default Score;
