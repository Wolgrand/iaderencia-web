import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Criteria {
  id: string;
  title: string;
  icon: string;
  score: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateCriteria: (criteria: Omit<Criteria, 'id'>) => void;
  editingCriteria: Criteria;
}

interface EditCriteriaData {
  icon: string;
  title: string;
  score: number;
}

const ModalEditCriteria: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  editingCriteria,
  handleUpdateCriteria,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditCriteriaData) => {
      // EDIT A FOOD PLATE AND CLOSE THE MODAL
      handleUpdateCriteria(data);
      setIsOpen();
    },
    [handleUpdateCriteria, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingCriteria}>
        <h1>Editar Critério</h1>

        <Input name="icon" placeholder="Digite o nome o ícone" />

        <Input name="title" placeholder="Digite o título do critério" />
        <Input name="score" placeholder="Digite a pontuação do critério" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Critério</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditCriteria;
