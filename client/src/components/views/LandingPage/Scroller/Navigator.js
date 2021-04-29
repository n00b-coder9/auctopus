import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-scroll';
import './scrollercss.css';
import { Link as Links } from 'react-router-dom';


export default function Navigator() {
  return (
    <div>
      <br />
      <div>
        <h2 style={{ fontFamily: 'cursive', color: 'brown' }}>
          <u><b><i>Auction Items</i></b></u></h2>
        <Links to='/product/upload'>
          <img src='/upload.png' width='270' height='130' className="upload-image" />
        </Links>

      </div>
      <br />
      <br />
      <br />
      <img src='/categories1.jpg' width='270' height='130'/>
      <ListGroup >
        <ListGroup.Item action variant="primary" style={{ width: '270px', height: '65px' }}>
          <Link activeClass="active" to="Automobile" spy={true} smooth={true}>Automobiles</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="secondary" style={{ width: '270px', height: '65px' }}>
          <Link activeClass="active" to="Fashion" spy={true} smooth={true}>Fashion</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="success" style={{ width: '270px', height: '65px' }}>
          <Link activeClass="active" to="Electronics" spy={true} smooth={true}>Electronics</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="danger" style={{ width: '270px', height: '65px' }}>
          <Link activeClass="active" to="Sports" spy={true} smooth={true}>Sports</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="warning" style={{ width: '270px', height: '65px' }}>
          <Link activeClass="active" to="Antiques" spy={true} smooth={true}>Antiques</Link>
        </ListGroup.Item>
        <ListGroup.Item action variant="info" style={{ width: '270px', height: '65px' }}>
          <Link activeClass="active" to="Miscellaneous"
            spy={true} smooth={true}>Miscellaneous</Link>
        </ListGroup.Item>
      </ListGroup>

    </div>
  );
}
