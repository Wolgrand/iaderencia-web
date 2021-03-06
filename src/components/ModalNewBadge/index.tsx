import React, { useCallback, useState, FormEvent } from 'react';


import { Title, ItemsGrid, Container } from './styles';
import Modal from '../Modal';
import Badge from '../Badge';
import Button from '../Button';


interface Badge {
  id: string;
  title: string;
  description: string;
  score: number;
  icon: string;
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

interface CreateBadge {
  icon: string;
  title: string;
  description: string;
  score: number;
}
interface SelectedBadge {
  id: string;
  score: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddBadge: (badge: Badge) => void;
  badges: Badge[];
  rewards: Badge[];
  availableBadges: Badge[];
}


const ModalNewReward: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddBadge,
  availableBadges,

}) => {

  const [selectedBadge, setSelectedBadge] = useState<Badge>();



  const handleSelectItem = (badge: Badge): void => {
    setSelectedBadge(badge);
  };



  const handleSubmit = useCallback(
    async (badge: Badge, event: FormEvent) => {
      event.preventDefault();

      handleAddBadge(badge);

      setIsOpen();
    },
    [handleAddBadge, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title>Selecione a Conquista</Title>
      <ItemsGrid>
        {availableBadges.map((reward) => (
          <div
            key={reward.id}
            onClick={() => handleSelectItem(reward)}
            className={
              selectedBadge && selectedBadge.id === reward.id ? 'selected' : ''
            }
          >
            <Badge
              icon={reward.icon}
              score={reward.score}
              key={reward.id}
              title={reward.title}
              className={
                selectedBadge && selectedBadge.id === reward.id
                  ? 'selected'
                  : ''
              }
            />
          </div>
        ))}
      </ItemsGrid>

      <Container>
        {selectedBadge ? (
          <Button
            onClick={(event: FormEvent) => handleSubmit(selectedBadge, event)}
          >
            Selecionar
          </Button>
        ) : null}
      </Container>
    </Modal>
  );
};

export default ModalNewReward;
