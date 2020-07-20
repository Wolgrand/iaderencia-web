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
import api from '../../services/api';
import Footer from '../../components/Footer';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  score: string;
  department: string;
  company: string;
}

interface Criteria {
  id?: string;
  title: string;
  score: number;
  icon: string;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [players, setPlayers] = useState<Players[]>([]);

  const { signOut, user } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [newCriteria, setNewCriteria] = useState(false);
  const [editRow, setEditRow] = useState<string[]>([]);

  const [criteriaTitle, setCriteriaTitle] = useState('');
  const [criteriaIcon, setCriteriaIcon] = useState('');
  const [criteriaScore, setCriteriaScore] = useState('');

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    api.get(`/criterias`).then((response) => {
      setCriterias(response.data);
    });
  }, [criterias]);

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

  const handleShowEditRow = (): void => {
    setNewCriteria(!newCriteria);
  };

  const handleIgnoreNewCriteria = (): void => {
    setNewCriteria(!newCriteria);
  };

  const handleRowEdition = (title: string): void => {
    const alreadySelected = editRow.findIndex((item) => item === title);

    if (alreadySelected >= 0) {
      const filteredItems = editRow.filter((item) => item !== title);
      setEditRow(filteredItems);
    } else {
      setEditRow([...editRow, title]);
    }
  };

  const addCriteria = async (): Promise<void> => {
    const newCriteriaItem = {
      title: criteriaTitle,
      icon: criteriaIcon,
      score: criteriaScore,
    };

    setNewCriteria(!newCriteria);

    await api.post('/criterias', newCriteriaItem);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <h1>PM-Gamification</h1>
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
                          <button type="button" onClick={handleShowEditRow}>
                            <FiPlusSquare />
                          </button>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {newCriteria ? (
                        <tr>
                          <td></td>
                          <td>
                            <input
                              onChange={(e) => setCriteriaIcon(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              onChange={(e) => setCriteriaTitle(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              onChange={(e) => setCriteriaScore(e.target.value)}
                            />
                          </td>
                          <td>
                            <div>
                              {' '}
                              <button
                                type="button"
                                className="accept"
                                onClick={addCriteria}
                              >
                                <FiCheck />
                              </button>
                              <button
                                type="button"
                                className="ignore"
                                onClick={handleIgnoreNewCriteria}
                              >
                                <FiX />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                      {criterias.map((item) => (
                        <tr>
                          <td>{criterias.indexOf(item) + 1}</td>
                          <td>
                            {editRow.includes(item.title) ? (
                              <input
                                defaultValue={item.icon}
                                onChange={(e) =>
                                  setCriteriaIcon(e.target.value)
                                }
                              />
                            ) : (
                              <Icon>{item.icon}</Icon>
                            )}
                          </td>
                          <td>
                            {editRow.includes(item.title) ? (
                              <input
                                defaultValue={item.title}
                                onChange={(e) =>
                                  setCriteriaTitle(e.target.value)
                                }
                              />
                            ) : (
                              item.title
                            )}
                          </td>

                          <td>
                            {editRow.includes(item.title) ? (
                              <input
                                defaultValue={String(item.score)}
                                onChange={(e) =>
                                  setCriteriaScore(e.target.value)
                                }
                              />
                            ) : (
                              item.score
                            )}
                          </td>

                          <td>
                            {editRow.includes(item.title) ? (
                              <div>
                                {' '}
                                <button type="button" className="accept">
                                  <FiCheck />
                                </button>
                                <button
                                  type="button"
                                  className="ignore"
                                  onClick={() => handleRowEdition(item.title)}
                                >
                                  <FiX />
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => handleRowEdition(item.title)}
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
                          <button type="button" onClick={handleShowEditRow}>
                            <FiPlusSquare />
                          </button>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {players.map((item) => (
                        <tr>
                          <td>{players.indexOf(item) + 1}</td>
                          <td>
                            {editRow.includes(item.name) ? (
                              <input
                                defaultValue={item.company}
                                onChange={(e) =>
                                  setCriteriaIcon(e.target.value)
                                }
                              />
                            ) : (
                              item.company
                            )}
                          </td>
                          <td>
                            {editRow.includes(item.name) ? (
                              <input
                                defaultValue={item.department}
                                onChange={(e) =>
                                  setCriteriaTitle(e.target.value)
                                }
                              />
                            ) : (
                              item.department
                            )}
                          </td>

                          <td>
                            {editRow.includes(item.name) ? (
                              <input
                                defaultValue={item.name}
                                onChange={(e) =>
                                  setCriteriaTitle(e.target.value)
                                }
                              />
                            ) : (
                              item.name
                            )}
                          </td>

                          <td>
                            {editRow.includes(item.name) ? (
                              <input
                                defaultValue={item.score}
                                onChange={(e) =>
                                  setCriteriaTitle(e.target.value)
                                }
                              />
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
            </div>
          </Section>
        </Schedule>
      </Content>
      <Footer> v1.0.0 © 2020 WN Studio</Footer>
    </Container>
  );
};
export default Admin;
