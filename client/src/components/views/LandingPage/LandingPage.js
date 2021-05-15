/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import MiniCardContainer from './Cards/MiniCardContainer';
import MyCarousel from './Carousel/MyCarousel';
import { useDispatch, useSelector } from 'react-redux';
import Navigator from './Scroller/Navigator';
import './landingpagecss.css';
import { fetchProducts } from '../../../redux/_actions/product_actions';


function LandingPage() {
  let productArray = useSelector((state) => state.product.products);
  const [isProductFetched, setProductFetched] = useState(false);
  const dispatch = useDispatch();
  if (productArray === undefined) {
    productArray = [];
  }
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    if (productArray.length > 0) {
      // console.log('product', product);
      setProductFetched(true, () => {

      });
    }
  }, [productArray]);


  useEffect(() => {
    // console.log('product fetched', isProductFetched);
  }, [isProductFetched]);


  return (
    <div >
      <div className="landing-container">
        <div>
          <MyCarousel />
        </div>

        <div>
          <Navigator />
        </div>

      </div>

      {
        productArray.map((i) => {
          return < MiniCardContainer key={i} type={i.type} array={i.arr}/>;
        })
      }

    </div>

  );
}


export default LandingPage;
