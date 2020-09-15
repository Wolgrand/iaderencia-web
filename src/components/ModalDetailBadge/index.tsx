import React from 'react';

import { Title, Container } from './styles';
import Modal from '../Modal';
import Badge from '../Badge';


interface Badge {
  id: string;
  title: string;
  description: string;
  score: number;
  icon: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  badge: Badge;
}



const ModalDetailBadge: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  badge,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title>Detalhe da Conquista</Title>
      <Container key={badge.id}>
        <img
          src={require(`../../assets/rewards/${badge.icon}.svg`)}
          alt={badge.title}
          height="196px"
          width="196px"
        />
        <div>
          <div>

            <strong>Título:</strong>
            <br />
            <span>{badge.title}</span>
          </div>
          <div>

            <strong>Descrição:</strong>
            <br />
            <span>{badge.description}</span>
          </div>
          <div>

            <strong>Pontuação:</strong>
            <br />
            <span>{badge.score} pts</span>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default ModalDetailBadge;
