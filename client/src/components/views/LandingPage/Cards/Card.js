/* eslint-disable react/prop-types */
/* eslint-disable max-len*/
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import './cardcss.css';
import img from '../../../utils/Images/img2.jpg';
import { Popover, Overlay, OverlayTrigger, PopoverContent, PopoverTitle, Tooltip } from 'react-bootstrap';


function Cards(props) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);


  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };


  return (
    <div className="card text-center border border-dark"
      style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFEWVHxB2Bp_Ewtt8xbZ059fcbOXEOFJmNg&usqp=CAU)' }} >
      <div className="overflow">
        <img src={`http://localhost:8080/${props.img}`}
          className="card-img-top card-image border border-succcess" />
      </div>
      <div className="card-text-body text-dark" ref={target} onMouseOver={handleClick} onMouseOut={() => setShow(!show)}>
        <div >
          <Badge variant="info"><div className="card-title">
            <h4 style={{ color: 'brown' }}>
              <i><u><b>{props.title.toUpperCase()}</b></u></i></h4>
          </div></Badge>
        </div>
        <div className="card-text">
          <Badge pill variant="warning"><h4>Base Price:-{props.price} $</h4></Badge>
        </div>
        <div>
          <Link to={`/product/${props._id}`}
            className="btn btn-outline-success link" >
            <h5 style={{ color: 'white' }}><b>REGISTER HERE</b></h5></Link>
        </div>
      </div>

      <Overlay
        show={show}
        target={target}
        placement="right"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h2">Details :- </Popover.Title>
          <Popover.Content>
            <span style={{ fontSize: '20px' }}><b>Auction Date :- </b></span><span style={{ fontSize: '20px' }}>21/06/2021</span><br />
            <span style={{ fontSize: '20px' }}><b>Auction Time :- </b></span><span style={{ fontSize: '20px' }}>10:00 PM</span><br />
            <span style={{ fontSize: '20px' }}><b>Uploaded By :- </b></span><span style={{ fontSize: '20px' }}>Faiz Ansari</span><br />
            <span style={{ fontSize: '20px' }}><b>Uploaded On :-</b></span><span style={{ fontSize: '20px' }}>15/05/2021</span><br />
            <span style={{ fontSize: '20px' }}><b>No. Of Participants :- </b></span><span style={{ fontSize: '20px' }}>4</span><br /><br />
            <span style={{ fontSize: '20px' }}>Click <b><i>Register Here</i></b> to get furthur Information & Participate.</span>
          </Popover.Content>
        </Popover>
      </Overlay>


    </div>

  );
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
};


export default Cards;
