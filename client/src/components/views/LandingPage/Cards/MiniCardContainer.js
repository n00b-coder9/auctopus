/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Card from './Card';
import './minicardcontainercss.css';
import img from '../../../utils/Images/arrow.png';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';


class miniCardContainer extends Component {
  render() {
    let c = -1;
    console.log('mini');
    return (
      <div className="mini-card-container"
        style={{ backgroundImage: 'url(/light.jpg)' }} id={this.props.type}>
        <div className='mini-title' >
          <h1><Badge variant="dark">{this.props.type}</Badge></h1>
        </div>
        <div className="mini-flex-container">

          {

            this.props.array.map((i) => {
              const itemDate = i.date;
              const o = itemDate.toString();
              const p1 = o.indexOf('T');
              const y = o.substring(0, p1);
              const itemD = i.createdAt;
              const oo = itemD.toString();
              const p2 = oo.indexOf('T');
              const x = oo.substring(0, p2);
              c++;
              if (c < this.props.array.length && c <= 2) {
                return <Card key={i} _id={i._id} price={i.basePrice}
                  img={i.images[0]} title={i.title} writer={i.writer} aucDate={y} createdAt={x}
                  len={i.buyers.length}/>;
              }
            })

          }
          <Link to={{
            pathname: '/cards',
            state: {
              array: this.props.array,
              type: this.props.type,
            },
          }} className="btn btn-outline-primary arrow" >
            <img src={img} height='55' width='65' data-toggle="tooltip" title="View More" /></Link>
        </div>
      </div>
    );
  }
}

export default miniCardContainer;
