import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Criteria {
  id: string;
  title: string;
  score: number;
  icon: string;
}

interface CreateCriteria {
  icon: string;
  title: string;
  score: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddCriteria: (criteria: Omit<Criteria, 'id'>) => void;
}

const ModalNewCriteria: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddCriteria,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CreateCriteria) => {
      handleAddCriteria(data);

      setIsOpen();
    },
    [handleAddCriteria, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo critério</h1>
        <Input name="icon" placeholder="Digite o nome o ícone" />

        <Input name="title" placeholder="Digite o título do critério" />
        <Input name="score" placeholder="Digite a pontuação do critério" />

        <button type="submit" data-testid="add-criteria-button">
          <p className="text">Adicionar Critério</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalNewCriteria;
