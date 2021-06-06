/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import './pagecss.css';
import img from '../../../../utils/Images/img2.jpg';
import Image from 'react-bootstrap/Image';

class Page extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let y;
    const itemDateAndTime = this.props.date;
    console.log('item', itemDateAndTime);
    if (itemDateAndTime !== undefined) {
      const o = itemDateAndTime.toString();
      const p1 = o.indexOf('T');
      y = o.substring(0, p1);
    }
    return (
      <div className="page text-center"
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
        }}>
        <div className='page-text-body'>
          <div>
            <Badge variant='' style={{ width: '100%', backgroundColor: '#d9d9d9', borderTopLeftRadius: '20px' }}>
              <h2 style={{ color: 'red' }}><b><i><u>
                {this.props.title}</u></i></b></h2></Badge>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '40%',
            }}>
              <Badge variant="warning"><h4><i>Auction Date</i></h4></Badge>
              <Badge pill variant="light" style={{ marginTop: '6px' }}><h4>{y}
              </h4></Badge>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '40%',
            }}>
              <Badge variant="warning"><h4><i>Base Price</i></h4></Badge>
              <Badge pill variant="light"><h4>{this.props.price} $</h4></Badge>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: '8px',
          }}>
            <Link to={`/product/${this.props._id}`} className="btn btn-primary " style={{ width: '40%' }}>
              <h4 style={{ color: 'white' }}><i>Product Info</i></h4></Link>
            {
              this.props.type === 'ongoing' &&
              <button onClick={(event) => window.location.href = `/auction/${this.props._id}`} className="btn btn-success" style={{ width: '40%' }}>
                <h4 style={{ color: 'white' }}><i>Enter</i></h4></button>
            }
            {
              this.props.type === 'upcoming' &&
              <Link to={`/product/${this.props._id}`} className="btn btn-danger" style={{ width: '40%' }}>
                <h4 style={{ color: 'white' }}><i>Withdraw</i></h4></Link>
            }

          </div>


        </div>
        <div className='page-img-container' >
          <Image src={`http://localhost:8080/${this.props.img}`}
            roundedCircle className='page-img' />
        </div>


      </div>

    );
  }
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
};


export default Page;
