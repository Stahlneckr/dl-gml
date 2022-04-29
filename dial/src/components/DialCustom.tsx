/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { x } from '@xstyled/styled-components';

/**
 * Pretty janky right now
 * need to tighten up the math if we go the custom route
 */

const getDeg = (cX: number, cY: number, pts: { x: number; y: number }) => {
  const x = cX - pts.x;
  const y = cY - pts.y;
  let deg = (Math.atan(y / x) * 180) / Math.PI;
  if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    deg += 90;
  } else {
    deg += 270;
  }
  const finalDeg = deg;
  return finalDeg;
};

export const DialCustom: React.FC<{ size: number }> = ({ size }) => {
  const [currentDeg, setCurrDeg] = useState(270);

  const startDrag = (e: any) => {
    e.preventDefault();

    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e: any) => {
      let tempDeg = getDeg(e.clientX, e.clientY, pts);
      if (tempDeg === 0) tempDeg--;
      setCurrDeg(tempDeg);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveHandler);
    });
  };

  return (
    <x.div w={`${size}px`} h={`${size}px`} display="flex" position="relative">
      <x.div
        w={`${size}px`}
        h={`${size}px`}
        display="flex"
        position="relative"
        borderRadius="50%"
        backgroundColor="#131313"
        onMouseDown={startDrag}
        role="dialog"
      >
        <x.div
          w={`${size}px`}
          h={`${size}px`}
          display="flex"
          position="relative"
          borderRadius="50%"
          backgroundColor="grey"
          transform={`rotate(${currentDeg}deg)`}
        >
          <x.div
            position="absolute"
            w="5%"
            h="5%"
            bottom="0"
            left="50%"
            transform="translateX(-50%)"
            // borderRadius="50%"
            background="#131313"
          />
        </x.div>
      </x.div>
    </x.div>
  );
};
