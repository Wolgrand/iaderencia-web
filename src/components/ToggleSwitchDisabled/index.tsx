import React, { useState } from 'react';
import Switch from 'react-switch';

interface Props {
  toggleMultiply(): void;
}

const ToggleSwitchDisabled: React.FC<Props> = ({ toggleMultiply }) => {
  const [checked, setChecked] = useState(false);

  const checkedState = (): void => {
    setChecked(!checked);
    toggleMultiply();
  };

  return (
    <Switch
      onChange={checkedState}
      onDrag={toggleMultiply}
      checked={checked}
      checkedIcon={false}
      disabled
      uncheckedIcon={false}
      height={10}
      width={40}
      handleDiameter={20}
      offColor="#95a5a6"
      onColor="#2ecc71"
    />
  );
};

export default ToggleSwitchDisabled;
