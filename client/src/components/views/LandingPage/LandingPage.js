import React, { Component } from 'react';
import CardContainer from './Cards/CardContainer';
import MyCarousel from './Carousel/MyCarousel';
import './landingpage.css';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <MyCarousel />
        <CardContainer/>
      </div>
    );
  }
}

export default LandingPage;
