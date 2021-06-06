/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len*/

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './auctioncss.css';
import Bid from './Bid';
import Notify from './Notify';
import io from 'socket.io-client';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { useTimer, useTime } from 'react-timer-hook';
import axios from 'axios';
import vdo from './Fireworks.mp4';
import { SettingsTwoTone } from '@material-ui/icons';

const bids = [];
const socket = io('http://localhost:4000');
let c = 1;
const time = new Date();
time.setSeconds(time.getSeconds() + 120);
const expiryTimestamp = time;

export default function Auction(props) {
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
  const [iWon, setIWon] = useState(false);
  const [otherWon, setOtherWon] = useState(false);
  const [noWon, setNoWon] = useState(false);

  const {
    seconds,
    minutes,
    start,
    restart,
    pause,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const clock = useTime({ format: '12-hour' });


  useEffect(() => {
    // const vdo = document.getElementsByClassName('video-element')[0];
    // vdo.play();
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
    if (clock.minutes == 24) {
      startAuction(true);
      start();
    }
  }, [clock.minutes]);

  useEffect(() => {
    if (minutes === 1 && seconds === 50) {
      const len = bids.length;
      if (len == 0) {
        setNoWon(true);
      } else {
        const lastBidder = bids[len - 1].name;
        console.log('last', lastBidder);
        console.log('hii', bids[len - 1]);
        if (lastBidder === 'You') {
          setIWon(true);
        } else {
          setOtherWon(lastBidder);
        }
      }
      blurBackground();
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
    // }
  };

  const auctionOver = (e) => {
    e.preventDefault();
    socket.disconnect();
    setLeave(true);
  };

  const leaveAuction = (e) => {
    e.preventDefault();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);
    restart(time);
    pause();

    socket.disconnect();
    setLeave(true);
  };

  const blurBackground = (e) => {
    const blur = document.getElementById('blur');
    blur.classList.toggle('active');
    const popup = document.getElementById('popup');
    popup.classList.toggle('active');
    const allButton = document.getElementById('allButton');
    allButton.classList.toggle('active');
    const infoButton = document.getElementById('infoButton');
    infoButton.classList.toggle('active');
    const leaveButton = document.getElementById('leaveButton');
    leaveButton.classList.toggle('active');
  };

  return (
    <div>
      <div className='auction-container' id='blur'>
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
            className='btn btn-primary' style={{ width: '130px' }} id ='infoButton'>Product Info</Link>
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

          <button className='btn btn-danger' id='leaveButton' style={{ width: '130px' }} onClick={leaveAuction}>
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

          <button className="btn btn-success" id='allButton' style={{ width: '200px' }}
            onClick={onBid}><h2>Place Bid</h2></button>
        </div>
      </div>
      <div id='popup'>
        {
          iWon === true &&
          <div className="popup-container">
            <img src='/tenor.gif' style={{ width: '90%', height: '22rem', margin: 'auto' }} />
            <Badge className='congo-msg' style={{ marginTop: '5%', marginBottom: '5%' }}><h3 style={{ color: 'white' }}>
              <i><b style={{ color: 'cyan' }}>Congrats..!!You won.</b><br />You are the highest bidder of the <br />
                auction..You will
        receive a mail as a <br />confirmation.
        The mail will also contain the furthur <br />procedure & directions.</i></h3></Badge>
            <Button variant='success' size='lg' style={{ margin: 'auto', width: '25%' }} onClick={auctionOver}><b><i>Thank You</i></b></Button>
          </div>
        }
        {
          otherWon !== false &&
          <div className="popup-container">
            <img src='/defeat.gif' style={{ width: '90%', height: '22rem', margin: 'auto' }} />
            <Badge className='congo-msg' style={{ marginTop: '5%', marginBottom: '5%' }}><h3 style={{ color: 'white' }}>
              <i><b style={{ color: 'orange' }}>Sorry..!! You Lost the Auction.</b><br />You cannot place furthur bids.The auction <br />
              is over..{otherWon} has won the auction..<br />
              Highest bid is {currentBid}</i></h3></Badge>
            <Button variant='danger' size='lg' style={{ margin: 'auto', width: '25%' }} onClick={auctionOver}><b><i>Okay</i></b></Button>
          </div>
        }
        {
          noWon === true &&
          <div className="popup-container" >
            <Badge className='congo-msg' style={{ marginTop: '5%', marginBottom: '5%' }}><h3 style={{ color: 'white' }}>
              <i><b>Sadly..!!</b>No one placed a single bid..<br />The product went unsold..<br />
              The auction is over..</i></h3></Badge>
            <Button variant='warning' size='lg' style={{ margin: 'auto', width: '25%' }} onClick={auctionOver}><b><i>Okay</i></b></Button>
          </div>
        }
      </div>
    </div>
  );
}
