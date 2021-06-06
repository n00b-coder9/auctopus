/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import io from 'socket.io-client';


export default function MyTimer({ expiryTimestamp }) {
  // let socket;
  const socket = io('http://localhost:4000');
  const {
    seconds,
    minutes,
    start,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    start();

    // if (resetTimer === true) {
    //   const time = new Date();
    //   time.setSeconds(time.getSeconds() + 120);
    //   restart(time);
    // }
  }, []);

  // useEffect(() => {
  //   console.log('changing');
  //   console.log(socket);

  //   // socket.on('reset-timer', () => {
  //   //   console.log('receiving');
  //   //   const time = new Date();
  //   //   time.setSeconds(time.getSeconds() + 120);
  //   //   restart(time);
  //   // });
  //   socket.on('reset-timer', () => {
  //     console.log('hello');
  //   });
  // }, [seconds]);


  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '50px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
