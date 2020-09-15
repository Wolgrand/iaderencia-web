import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Tooltip from '../Tooltip';
import { Container } from './styles';

type badgeProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  description?: string;
  score: number;
  icon: string;
};

const Badge: React.FC<badgeProps> = ({
  children,
  title,
  description,
  score,
  icon,
}) => (
    <Tooltip title={`${title} - ${score}pts`}>
      <img
        src={require(`../../assets/rewards/${icon}.svg`)}
        alt={title}
        height="64px"
        width="64px"

      />
    </Tooltip>

  );

export default Badge;
