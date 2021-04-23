import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './cardcss.css';
import img from '../../../utils/Images/img2.jpg';

class Card extends Component {
  render() {
    return (
      <div className="card text-center border border-danger" >
        <div className="overflow">
          <img src={img} alt="image" className="card-img-top card-image border border-dark" />
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title" style={{ color: 'red' }}><u>{this.props.id}</u></h4>
          <p className="card-text" style={{ color: '#5F030E' }}>
            Hii
          </p>
          <Link to='#' className="btn btn-outline-success" > Click here</Link>
        </div>
      </div>

    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
};


export default Card;
