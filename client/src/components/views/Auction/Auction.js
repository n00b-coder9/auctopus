/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './auctioncss.css';
import Bid from './Bid';
import Notify from './Notify';
import io from 'socket.io-client';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useTimer, useTime } from 'react-timer-hook';
import axios from 'axios';

const bids = [];
const socket = io('http://localhost:4000');
let c = 1;
const time = new Date();
time.setSeconds(time.getSeconds() + 120);
const expiryTimestamp = time;


export default function Auction(props) {
  let counter = 1;
  let hourSlot;

  const messagesEndRef = useRef(null);


  const productId = props.match.params.productId;
  const user = useSelector((state) => state.user);

  const [newBid, setNewBid] = useState(0);
  const [currentBid, setCurrentBid] = useState();
  const [leave, setLeave] = useState(false);
  const [isAllowed, setAllowed] = useState(true);
  const [welcome, setWelcome] = useState('');
  const [newUser, setNewUser] = useState('');
  const [onDisconnect, setDisconnect] = useState('');
  const [onStartAuction, startAuction] = useState(false);


  const {
    seconds,
    minutes,
    start,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const clock = useTime({ format: '12-hour' });


  useEffect(() => {
    if (user.userData !== undefined) {
      // start();
      if (productId !== undefined) {
        axios.get(`/api/product/products_by_id?id=${productId}`).then(
            (response) => {
              console.log(response);
              setCurrentBid(response.data[0].basePrice);

              if (response.data[0].timeslot === 1) {
                hourSlot = 10;
              } else if (response.data[0].timeslot === 2) {
                hourSlot = 16;
              } else if (response.data[0].timeslot === 3) {
                hourSlot = 20;
              } else {
                hourSlot = 2;
              }


              const time = new Date();
              const minutes = time.getMinutes();
              const hrs = time.getHours();
              // if (hrs !== hourSlot || (hrs == hourSlot && minutes >= 5)) {
              //   alert('Sorry..!!You cannot enter the auction now..');
              //   socket.disconnect();
              //   setLeave(true);
              // }
            },
        );
      }
      socket.emit('join', {
        name: user.userData.name,
        room: productId,
      }, (error) => {
        if (error) {
          alert(error);
        }
      });

      socket.on('new-user-joined', (data) => {
        setNewUser(data.text);
      });
    }
  }, [user, productId]);

  useEffect(() => {
    if (clock.minutes == 5) {
      startAuction(true);
      start();
    }
  }, [clock.minutes]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      alert('Auction over');
      socket.disconnect();
      setLeave(true);
    }
  }, [seconds]);


  useEffect(() => {
    const nb = Math.floor(Math.log10(currentBid));
    const p = Math.pow(10, nb);
    setNewBid(currentBid + p);
  }, [currentBid]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    socket.on('update-bid', (data) => {
      console.log('data', data);
      bids.push({
        pos: 'left',
        name: data.user,
        bidValue: data.newBid.bidValue,
      });
      setCurrentBid(data.newBid.bidValue);
      const audioEl = document.getElementsByClassName('audio-element')[0];
      audioEl.play();
      scrollToBottom();
    });


    socket.on('your-bid', (data) => {
      bids.push({
        pos: 'right',
        name: 'You',
        bidValue: data.newBid.bidValue,
      });
      setCurrentBid(data.newBid.bidValue);
      scrollToBottom();
    });

    socket.on('left', (data) => {
      setDisconnect(data.text);
    });

    socket.on('message', (data) => {
      setWelcome(data.text);
    });
    socket.on('reset-timer', () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 120);
      restart(time);
    });
  }, [bids]);

  const onBid = (e) => {
    const time = new Date();
    const minutes = time.getMinutes();
    const hrs = time.getHours();
    // if (hrs == hourSlot && minutes < 5) {
    //   alert(`Sorry..!!Auction has not started yet.It wil start at ${hrs}:58`);
    // } else {
    e.preventDefault();
    socket.emit('new-bid', {
      bidValue: newBid,
    });
    counter++;
    // }
  };


  const leaveAuction = (e) => {
    e.preventDefault();
    socket.disconnect();
    setLeave(true);
  };

  return (
    <div className='auction-container'>
      <div style={{ width: '60%', margin: 'auto', marginTop: '10px' }}>
        {
          leave === true &&
               <Redirect to='/leave' />
        }
        {
          welcome !== '' &&
        <Notify variant="success" content={welcome} />
        }
        {
          newUser !== '' &&
        <Notify variant="warning" content={newUser} />
        }
        {
          onDisconnect !== '' &&
        <Notify variant="danger" content={onDisconnect} />
        }
        {
          onStartAuction === true &&
        <Notify variant="light" content="Auction has started..You can bid now..All the Best" />
        }
      </div>

      <audio className="audio-element">
        <source src="/sound.ogg"></source>
      </audio>
      <div className="auction-bar">
        <Link to={`/product/${productId}`}
          className='btn btn-primary' style={{ width: '130px' }}>Product Info</Link>
        <div className="clock-container">
          <Badge variant='warning'><h4 style={{
            color: 'black',
            fontFamily: 'cursive',
          }}><b>Clock</b></h4></Badge>
          <Badge variant='light' style={{ marginTop: '5px' }}>
            <div style={{
              fontSize: '20px', color: 'black',
              fontFamily: 'cursive' }}>
              <span>{clock.hours}</span>:<span>{clock.minutes}
              </span>:<span>{clock.seconds}</span><span>{clock.ampm}</span>
            </div></Badge>

        </div>
        <div className="clock-container">
          <Badge variant='warning'><h4 style={{
            color: 'black',
            fontFamily: 'cursive',
          }}><b>Timer</b></h4></Badge>
          <Badge variant='light' style={{ marginTop: '5px' }}>
            <div style={{
              fontSize: '20px', color: 'black',
              fontFamily: 'cursive' }}>
              <span>{minutes}</span>:<span>{seconds}</span>
            </div></Badge>

        </div>

        <button className='btn btn-danger' style={{ width: '130px' }} onClick={leaveAuction}>
                  Leave Auction</button>
      </div>
      <div className="screen-img"
        style={{ backgroundImage: 'url(/light.jpg)' }} >
        <div>
          {
            bids.map((i) => {
              return <Bid key={c++} pos={i.pos} name={i.name} bidValue={i.bidValue} />;
            })
          }
        </div>
        <div ref={messagesEndRef}/>

      </div>

      <div className="auction-bar" style={{ paddingTop: '10px', paddingBottom: '4px' }}>
        <div className="bid-component">
          <Badge variant='primary'><h4 style={{
            color: 'black',
            fontFamily: 'cursive',
          }}><b>Current Bid</b></h4></Badge>
          <Badge variant='light' style={{ marginTop: '5px' }}><h4 style={{
            color: 'black',
            fontFamily: 'cursive',
          }}><b>{currentBid} $</b></h4></Badge>
        </div>
        <div className="bid-component">
          <Badge variant='warning'><h4 style={{
            color: 'black',
            fontFamily: 'cursive',
          }}><b>Next Expected Bid</b></h4></Badge>
          <Badge variant='light' style={{ marginTop: '5px' }}><h4 style={{
            color: 'black',
            fontFamily: 'cursive',
          }}><b>{newBid} $</b></h4></Badge>

        </div>

        <button className="btn btn-success" style={{ width: '200px' }}
          onClick={onBid}><h2>Place Bid</h2></button>
      </div>
    </div>
  );
}
