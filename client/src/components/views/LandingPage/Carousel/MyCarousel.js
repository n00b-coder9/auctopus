import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './mycarouselcss.css';
import img from './../../../utils/Images/image.webp';


class MyCarousel extends Component {
  render() {
    return (
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item >

            <img
              className="w-100 image"
              src={img}
              alt="First slide"

              height="800"
              style={{ border: '2px solid red' }}
            />

            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 image"
              src={img}
              alt="Second slide"
              height="800"
              style={{ border: '2px solid red' }}

            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 image"
              src={img}
              alt="Third slide"
              height="800"
              style={{ border: '2px solid red' }}
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default MyCarousel;
