import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Tooltip from '../Tooltip';

type badgeProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  score: number;
  key: string;
  icon: string;
};

const Badge: React.FC<badgeProps> = ({ children, title, score, key, icon }) => (
  <Tooltip title={`${title} - ${score}pts`}>
    <img
      src={require(`../../assets/rewards/${icon}.png`)}
      alt={title}
      height="64px"
      width="64px"
    />
  </Tooltip>
);

export default Badge;
