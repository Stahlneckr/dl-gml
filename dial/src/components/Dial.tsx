import React, { useEffect, useRef, useState } from 'react';
import { x } from '@xstyled/styled-components';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { io, Socket } from 'socket.io-client';

gsap.registerPlugin(Draggable, InertiaPlugin);

const ENDPOINT = 'http://localhost:3001';
const MONITOR_HEIGHT = 1080;
// const MONITOR_WIDTH = 1920;
const AFF_SIZE = 1340;
const DIAL_SIZE = 900;
const AFF_SINGLE_SIZE = 280;

const getCoords = (
  radius: number,
  thetaDeg: number
): { top: string; left: string } => {
  const thetaRads = thetaDeg * (Math.PI / 180);
  const x = radius * Math.cos(thetaRads);
  const y = radius * Math.sin(thetaRads);
  return {
    top: `${y + radius - AFF_SINGLE_SIZE / 2}px`,
    left: `${x + radius - AFF_SINGLE_SIZE / 2}px`,
  };
};

export const Dial: React.FC = () => {
  const socket = useRef<Socket | undefined>();
  const [selectedAffinity, setSelectedAffinity] = useState(0);

  useEffect(() => {
    socket.current = io(ENDPOINT);

    socket.current?.on('message', (data: string) => {
      console.log(data);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const sendAffinity = () => {
    socket.current?.emit(
      'dial:affinity',
      JSON.stringify({ affinity: selectedAffinity })
    );
  };

  useEffect(() => {
    Draggable.create('.dial', {
      trigger: '.trigger',
      type: 'rotation',
      rotation: 0,
      inertia: true,
      snap: (endValue) => {
        const currAngle = Math.round(endValue / 72) * 72;
        setSelectedAffinity(Math.abs((currAngle / 72) % 5));
        return currAngle;
      },
      maxDuration: 0.33,
      onDragEnd: () => {},
    });
  }, []);

  return (
    <x.div
      position="relative"
      h={`${AFF_SIZE}px`}
      w={`${AFF_SIZE}px`}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <x.div
        position="absolute"
        top={-((AFF_SIZE - MONITOR_HEIGHT) / 2)}
        bottom={0}
        left={0}
        right={0}
        borderRadius="100%"
      >
        <x.div
          w={`${AFF_SINGLE_SIZE}px`}
          h={`${AFF_SINGLE_SIZE}px`}
          bg="#26874D"
          borderRadius="100%"
          p="1rem"
          boxSizing="border-box"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          {...getCoords(AFF_SIZE / 2, 0)}
        >
          <x.p color="white">Sports & Fitness</x.p>
        </x.div>
        <x.div
          w={`${AFF_SINGLE_SIZE}px`}
          h={`${AFF_SINGLE_SIZE}px`}
          bg="#26874D"
          borderRadius="100%"
          p="1rem"
          boxSizing="border-box"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          {...getCoords(AFF_SIZE / 2, 72)}
        >
          <x.p color="white">Cooking Enthusiasts</x.p>
        </x.div>
        <x.div
          w={`${AFF_SINGLE_SIZE}px`}
          h={`${AFF_SINGLE_SIZE}px`}
          bg="#26874D"
          borderRadius="100%"
          p="1rem"
          boxSizing="border-box"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          {...getCoords(AFF_SIZE / 2, 144)}
        >
          <x.p color="white">Do-It-Yourselfers</x.p>
        </x.div>
        <x.div
          w={`${AFF_SINGLE_SIZE}px`}
          h={`${AFF_SINGLE_SIZE}px`}
          bg="#26874D"
          borderRadius="100%"
          p="1rem"
          boxSizing="border-box"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          {...getCoords(AFF_SIZE / 2, 216)}
        >
          <x.p color="white">Music Lovers</x.p>
        </x.div>
        <x.div
          w={`${AFF_SINGLE_SIZE}px`}
          h={`${AFF_SINGLE_SIZE}px`}
          bg="#26874D"
          borderRadius="100%"
          p="1rem"
          boxSizing="border-box"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          {...getCoords(AFF_SIZE / 2, 288)}
        >
          <x.p color="white">Family vacationers</x.p>
        </x.div>
      </x.div>
      <x.div
        className="dial"
        w={`${DIAL_SIZE}px`}
        h={`${DIAL_SIZE}px`}
        p="2rem"
        backgroundColor="#000000" //"#E6F4EA"
        borderRadius="100%"
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        zIndex={10}
      >
        <x.div
          className="trigger"
          w={`${(DIAL_SIZE * 0.25) / 2}px`}
          h={`${(DIAL_SIZE * 0.25) / 2}px`}
          background="#26874D"
          borderRadius="100%"
        />
      </x.div>
      <x.div
        w={`${DIAL_SIZE * 0.75}px`}
        h={`${DIAL_SIZE * 0.75}px`}
        backgroundColor="white"
        borderRadius="100%"
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={11}
      >
        <x.div p="2rem" pt="6rem" textAlign="center">
          <x.div fontSize="1rem" spaceY="0.5rem" lineHeight="1.25">
            <x.p>
              Pick an affinity by using the DV360 button to scroll, then click
              Deploy Ad to see it in action
            </x.p>
          </x.div>
          <x.button
            w="180px"
            h="48px"
            mt="32px"
            color="white"
            backgroundColor="#3C4043"
            borderRadius="24px"
            border="none"
            fontSize="1rem"
            onClick={sendAffinity}
          >
            Deploy Add
          </x.button>
        </x.div>
      </x.div>
    </x.div>
  );
};
