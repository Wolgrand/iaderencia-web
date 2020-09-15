import React, { useState, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Icon from '@material-ui/core/Icon';

import 'react-day-picker/lib/style.css';
import {
  FiPower,
  FiSettings,
  FiEdit,
  FiTrash,
  FiPlusSquare,
  FiCheck,
  FiX,
} from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  TableContainer,
  Section,
} from './styles';

import avatarDefaultImg from '../../assets/avatar.png';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import ModalNewCriteria from '../../components/ModalNewCriteria';
import ModalEditCriteria from '../../components/ModalEditCriteria';
import ModalNewReward from '../../components/ModalNewReward';
import ModalEditReward from '../../components/ModalEditReward';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  score: string;
  department: string;
  company: string;
}

interface Criteria {
  id: string;
  title: string;
  score: number;
  icon: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  score: number;
}

interface Players {
  id?: string;
  name: string;
  email: number;
  score: string;
  role: string;
  department: string;
  company: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  tabStyle: {
    flexGrow: 1,
  },
}));

const Admin: React.FC = () => {
  const [criterias, setCriterias] = useState<Criteria[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [players, setPlayers] = useState<Players[]>([]);

  const { signOut, user } = useAuth();
  const { addToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const [editRow, setEditRow] = useState<string[]>([]);

  const [editingCriteria, setEditingCriteria] = useState<Criteria>(
    {} as Criteria,
  );

  const [editingReward, setEditingReward] = useState<Reward>({} as Reward);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    api.get(`/criterias`).then((response) => {
      setCriterias(response.data);
    });

    api.get(`/rewards`).then((response) => {
      setRewards(response.data);
    });
  }, [setCriterias, setRewards]);

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

  const handleRowEdition = (title: string): void => {
    const alreadySelected = editRow.findIndex((item) => item === title);

    if (alreadySelected >= 0) {
      const filteredItems = editRow.filter((item) => item !== title);
      setEditRow(filteredItems);
    } else {
      setEditRow([...editRow, title]);
    }
  };

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }
  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditCriteria(data: Criteria): void {
    toggleEditModal();
    setEditingCriteria(data);
  }

  function handleEditReward(data: Reward): void {
    toggleEditModal();
    setEditingReward(data);
  }

  async function handleUpdateReward(reward: Omit<Reward, 'id'>): Promise<void> {
    try {
      const findIndex = rewards.findIndex((f) => f.id === editingReward.id);

      Object.assign(editingReward, {
        title: reward.title,
        description: reward.description,
        icon: reward.icon,
        score: reward.score,
      });

      rewards[findIndex] = editingReward;

      api.put(`rewards/${editingReward.id}`, editingReward).then((response) => {
        setRewards(rewards);
        addToast({
          type: 'success',
          title: 'Conquista Atualizada',
          description: `A conquista ${reward.title} foi atualizada com sucesso!`,
        });
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro na atualização da conquista',
        description: `Houve um erro ao atualizar a conquista, tente novamente!`,
      });
    }
  }

  async function handleAddReward(reward: Omit<Reward, 'id'>): Promise<void> {
    try {
      const newReward = { ...reward };

      await api.post('/rewards', newReward).then((response) => {
        setRewards([...rewards, response.data]);
        addToast({
          type: 'success',
          title: 'Conquista Cadastrada',
          description: `A nova conquista ${reward.title} foi adicionada com sucesso!`,
        });
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro da nova conquista',
        description: `Houve um erro ao adicionar a nova conquista, tente novamente!`,
      });
    }
  }

  async function handleDeleteReward(id: string): Promise<void> {
    try {
      await api.delete(`/rewards/${id}`);

      const updatedList = rewards.filter((reward) => reward.id !== id);
      const deletedReward = rewards.filter((reward) => reward.id === id);

      setCriterias(updatedList);
      addToast({
        type: 'success',
        title: 'Conquista Excluída',
        description: `Exclusão da conquista ${deletedReward[0].title} realizada com sucesso!`,
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: `Erro na exclusão da conquista`,
        description: `Houve um erro ao excluir a conquista, tente novamente!`,
      });
    }
  }

  async function handleUpdateCriteria(
    criteria: Omit<Criteria, 'id'>,
  ): Promise<void> {
    try {
      const findIndex = criterias.findIndex((f) => f.id === editingCriteria.id);

      Object.assign(editingCriteria, {
        title: criteria.title,
        icon: criteria.icon,
        score: criteria.score,
      });

      criterias[findIndex] = editingCriteria;

      api
        .put(`criterias/${editingCriteria.id}`, editingCriteria)
        .then((response) => {
          setCriterias(criterias);
          addToast({
            type: 'success',
            title: 'Critério Atualizado',
            description: `O critério ${criteria.title} foi adicionado com sucesso!`,
          });
        });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro na atualização do critério',
        description: `Houve um erro ao atualizar o critério, tente novamente!`,
      });
    }
  }

  async function handleAddCriteria(
    criteria: Omit<Criteria, 'id'>,
  ): Promise<void> {
    try {
      const newCriteria = { ...criteria };

      await api.post('/criterias', newCriteria).then((response) => {
        setCriterias([...criterias, response.data]);
        addToast({
          type: 'success',
          title: 'Critério Cadastrado',
          description: `O novo critério ${criteria.title} foi adicionado com sucesso!`,
        });
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro do novo critério',
        description: `Houve um erro ao adicionar o novo critério, tente novamente!`,
      });
    }
  }

  async function handleDeleteCriteria(id: string): Promise<void> {
    try {
      await api.delete(`/criterias/${id}`);

      const updatedList = criterias.filter((criteria) => criteria.id !== id);
      const deletedCriteria = criterias.filter(
        (criteria) => criteria.id === id,
      );

      setCriterias(updatedList);
      addToast({
        type: 'success',
        title: 'Critério Excluído',
        description: `Exclusão do critério ${deletedCriteria[0].title} realizada com sucesso!`,
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: `Erro na exclusão do critério`,
        description: `Houve um erro ao excluir o critério, tente novamente!`,
      });
    }
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
        <Schedule>
          <h1>Painel de Configurações</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateasText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <Section>
            <div className={classes.root}>
              <AppBar
                position="static"
                style={{ backgroundColor: '#28262E', color: '#f4ede8' }}
              >
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Critérios" {...a11yProps(0)} />
                  <Tab label="Jogadores" {...a11yProps(1)} />
                  <Tab label="Conquistas" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <TableContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Icone</th>
                        <th>Critério</th>
                        <th>Score</th>
                        <th>
                          {' '}
                          <button type="button" onClick={toggleModal}>
                            <FiPlusSquare />
                          </button>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <ModalNewCriteria
                        isOpen={modalOpen}
                        setIsOpen={toggleModal}
                        handleAddCriteria={handleAddCriteria}
                      />
                      <ModalEditCriteria
                        isOpen={editModalOpen}
                        setIsOpen={toggleEditModal}
                        editingCriteria={editingCriteria}
                        handleUpdateCriteria={handleUpdateCriteria}
                      />
                      {criterias.map((item) => (
                        <tr id={item.id}>
                          <td>{criterias.indexOf(item) + 1}</td>
                          <td>
                            <Icon>{item.icon}</Icon>
                          </td>
                          <td>{item.title}</td>

                          <td>{item.score}</td>

                          <td>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleEditCriteria(item)}
                              >
                                <FiEdit />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCriteria(item.id)}
                              >
                                <FiTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Empresa</th>
                        <th>Departamento</th>
                        <th>Nome</th>
                        <th>Score</th>

                        <th>
                          {' '}
                          <button type="button">
                            <FiPlusSquare />
                          </button>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {players.map((item) => (
                        <tr id={item.id}>
                          <td>{players.indexOf(item) + 1}</td>
                          <td>
                            {editRow.includes(item.name) ? (
                              <input defaultValue={item.company} />
                            ) : (
                                item.company
                              )}
                          </td>
                          <td>
                            {editRow.includes(item.name) ? (
                              <input defaultValue={item.department} />
                            ) : (
                                item.department
                              )}
                          </td>

                          <td>
                            {editRow.includes(item.name) ? (
                              <input defaultValue={item.name} />
                            ) : (
                                item.name
                              )}
                          </td>

                          <td>
                            {editRow.includes(item.name) ? (
                              <input defaultValue={item.score} />
                            ) : (
                                item.score
                              )}
                          </td>

                          <td>
                            {editRow.includes(item.name) ? (
                              <div>
                                {' '}
                                <button type="button" className="accept">
                                  <FiCheck />
                                </button>
                                <button
                                  type="button"
                                  className="ignore"
                                  onClick={() => handleRowEdition(item.name)}
                                >
                                  <FiX />
                                </button>
                              </div>
                            ) : (
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => handleRowEdition(item.name)}
                                  >
                                    <FiEdit />
                                  </button>
                                  <button type="button">
                                    <FiTrash />
                                  </button>
                                </div>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TableContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Imagem</th>
                        <th>Conquista</th>
                        <th>Descrição</th>
                        <th>Score</th>
                        <th>
                          {' '}
                          <button type="button" onClick={toggleModal}>
                            <FiPlusSquare />
                          </button>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <ModalNewReward
                        isOpen={modalOpen}
                        setIsOpen={toggleModal}
                        handleAddReward={handleAddReward}
                      />
                      <ModalEditReward
                        isOpen={editModalOpen}
                        setIsOpen={toggleEditModal}
                        editingReward={editingReward}
                        handleUpdateReward={handleUpdateReward}
                      />
                      {rewards.map((item) => (
                        <tr id={item.id}>
                          <td>{rewards.indexOf(item) + 1}</td>
                          <td>
                            <div>
                              <img
                                src={require(`../../assets/rewards/${item.icon}.svg`)}
                                alt="recruta"
                                height="64px"
                                width="64px"
                              />
                            </div>
                          </td>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{item.score}</td>

                          <td>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleEditReward(item)}
                              >
                                <FiEdit />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteReward(item.id)}
                              >
                                <FiTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableContainer>
              </TabPanel>
            </div>
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};
export default Admin;
