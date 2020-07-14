import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import ReactDOM from 'react-dom';

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
  TableContainer,
  Section,
} from './styles';

import avatarDefaultImg from '../../assets/avatar.png';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Footer from '../../components/Footer';

interface Criteria {
  id?: string;
  title: string;
  score: number;
  icon: string;
}

const Admin: React.FC = () => {
  const [criterias, setCriterias] = useState<Criteria[]>([]);

  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [newCriteria, setNewCriteria] = useState(false);
  const [editRow, setEditRow] = useState<string[]>([]);

  const [criteriaTitle, setCriteriaTitle] = useState('');
  const [criteriaIcon, setCriteriaIcon] = useState('');
  const [criteriaScore, setCriteriaScore] = useState('');

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

  const handleRowEditionIgnore = (): void => {
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
            <h1>iAderência</h1>
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
            <strong>Critérios</strong>
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
                            value={item.icon}
                            onChange={(e) => setCriteriaIcon(e.target.value)}
                          />
                        ) : (
                          <Icon>{item.icon}</Icon>
                        )}
                      </td>
                      <td>
                        {editRow.includes(item.title) ? (
                          <input
                            value={item.title}
                            onChange={(e) => setCriteriaTitle(e.target.value)}
                          />
                        ) : (
                          item.title
                        )}
                      </td>

                      <td>
                        {editRow.includes(item.title) ? (
                          <input
                            value={String(item.score)}
                            onChange={(e) => setCriteriaScore(e.target.value)}
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
          </Section>
        </Schedule>
      </Content>
      <Footer> v1.0.0 © 2020 WN Studio</Footer>
    </Container>
  );
};
export default Admin;
