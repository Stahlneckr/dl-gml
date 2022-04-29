import React from 'react';
import styled, { x } from '@xstyled/styled-components';

export interface ToggleSliderProps {
  active?: boolean;
  activeColor?: string;
  onClick: (active: boolean) => void;
}

const Indicator = styled.div<{ checked: boolean }>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  background-color: ${(p) => (p.checked ? '#333333' : '#e0e0e0')};
  transition: background 0.33s ease;
  :after {
    content: '';
    height: 1.25rem;
    width: 1.25rem;
    position: absolute;
    top: 4px;
    left: 4px;
    background: white;
    border-radius: 100%;
    transition: transform 0.33s ease;
    transform: translateX(${(p) => (p.checked ? '1.25rem' : '0')});
  }
`;

export const ToggleSlider: React.FC<ToggleSliderProps> = ({
  active = false,
  onClick,
}) => {
  return (
    <x.div
      display="inline-block"
      w="2.5rem"
      h="1.25rem"
      p="4px"
      position="relative"
      overflow="hidden"
      borderRadius="1.25rem"
      cursor="pointer"
    >
      <Indicator checked={active} />
      <x.input
        w="100%"
        h="100%"
        zIndex="overlay"
        cursor="pointer"
        m={0}
        opacity={0}
        onChange={(val) => onClick(val.target.checked)}
        type="checkbox"
        checked={active}
      />
    </x.div>
  );
};
