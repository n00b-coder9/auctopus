import React, { Component } from 'react';
import './cardcss.css';
import img from '../../../utils/Images/img2.jpg';

class Card extends Component {
  render() {
    return (
      <div className="card text-center border border-warning" >
        <div className="overflow">
          <img src={img} alt="image" className="card-img-top" />
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title" style={{ color: 'red' }}><u>Hello </u></h4>
          <p className="card-text" style={{ color: '#5F030E' }}>
            Hii
          </p>
        </div>
      </div>

    );
  }
}


export default Card;
