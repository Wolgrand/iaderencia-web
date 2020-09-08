import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import Icon from '@material-ui/core/Icon';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  score: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateReward: (reward: Omit<Reward, 'id'>) => void;
  editingReward: Reward;
}

interface EditRewardData {
  icon: string;
  title: string;
  description: string;
  score: number;
}

const ModalEditReward: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  editingReward,
  handleUpdateReward,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditRewardData) => {
      // EDIT A FOOD PLATE AND CLOSE THE MODAL
      handleUpdateReward(data);
      setIsOpen();
    },
    [handleUpdateReward, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingReward}>
        <h1>Editar Conquista</h1>

        <Input name="icon" placeholder="Digite o nome o ícone" />

        <Input name="title" placeholder="Digite o título da conquista" />
        <Input
          name="description"
          placeholder="Digite a descrição da conquista"
        />
        <Input name="score" placeholder="Digite a pontuação da conquista" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Conquista</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditReward;
