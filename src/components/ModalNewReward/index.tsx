import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Reward {
  id: string;
  title: string;
  description: string;
  score: number;
  icon: string;
}

interface CreateReward {
  icon: string;
  title: string;
  description: string;
  score: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddReward: (reward: Omit<Reward, 'id'>) => void;
}

const ModalNewReward: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddReward,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CreateReward) => {
      handleAddReward(data);

      setIsOpen();
    },
    [handleAddReward, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Conquista</h1>
        <Input name="icon" placeholder="Digite o nome do ícone" />

        <Input name="title" placeholder="Digite o título da conquista" />
        <Input
          name="description"
          placeholder="Digite a descrição da conquista"
        />
        <Input name="score" placeholder="Digite a pontuação da conquista" />

        <button type="submit" data-testid="add-criteria-button">
          <p className="text">Adicionar Conquista</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalNewReward;
