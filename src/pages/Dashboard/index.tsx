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
  Calendar,
  NextAppointment,
  Appointment,
  Section,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
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

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

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

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

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

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

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
            <Link to="/score">
              <Appointment key="1">
                <span>1º</span>

                <div>
                  <img
                    src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                    alt="teste"
                  />
                  <strong>Wolgrand</strong>
                  <span>1200 pts</span>
                </div>
              </Appointment>
            </Link>

            <Appointment key="2">
              <span>2º</span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                  alt="teste"
                />
                <strong>Wolgrand</strong>
                <span>1200 pts</span>
              </div>
            </Appointment>
            <Appointment key="3">
              <span>3º</span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                  alt="teste"
                />
                <strong>Wolgrand</strong>
                <span>1200 pts</span>
              </div>
            </Appointment>
            <Appointment key="4">
              <span>10º</span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                  alt="teste"
                />
                <strong>Wolgrand</strong>
                <span>1200 pts</span>
              </div>
            </Appointment>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        {/* <Calendar>
          <Appointment key="1">
            <span>
              <FiClock />
              08:00
            </span>

            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/24507574?s=460&u=59d56dda6d58cd54a0981d5ed6ea5d3f2dba0e81&v=4"
                alt="wolgrand"
              />
              <strong>Wolgrand</strong>
            </div>
          </Appointment>
        </Calendar> */}
      </Content>
    </Container>
  );
};
export default Dashboard;
