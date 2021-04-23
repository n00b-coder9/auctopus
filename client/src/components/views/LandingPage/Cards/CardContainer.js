import React, { Component } from 'react';
import Card from './Card';
import './cardcontainercss.css';


const arr = ['1', '2', '3', '4', '5', '6', '8'];
class CardContainer extends Component {
  render() {
    return (
      <div className="flex-container">
        {
          arr.map((i) => {
            return <Card key={i} id={i}/>;
          })
        }

      </div>
    );
  }
}

export default CardContainer;
