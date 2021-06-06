/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import MiniCardContainer from './Cards/MiniCardContainer';
import MyCarousel from './Carousel/MyCarousel';
import axios from 'axios';
import { Categories } from '../../../Categories';
import Navigator from './Scroller/Navigator';
import './landingpagecss.css';

let productArray = [];
function LandingPage() {
  const [product, setProduct] = useState([]);
  const [isProductFetched, setProductFetched] = useState(false);
  const today = new Date();


  useEffect(() => {
    productArray = [];
    axios.get('http://localhost:8080/getproduct')
        .then((results) => {
          setProduct(results.data);
          Categories.map((i) => {
            const temp = [];
            results.data.map((j) => {
              if (j.category === i._id) {
                const itemDateAndTime = j.date;
                const o = itemDateAndTime.toString();
                const p1 = o.indexOf('-');
                const y = o.substring(0, p1);
                const p2 = o.indexOf('-', p1 + 1);
                const m = o.substring(p1 + 1, p2);
                const p3 = o.indexOf('T');
                const d = o.substring(p2 + 1, p3);
                const itemDate = new Date(y, m - 1, d);
                if (itemDate >= today) {
                  temp.push(j);
                }
              }
            });
            if (temp.length > 0) {
              productArray.push({
                type: i.name,
                arr: temp,
              });
            }
          });
          console.log('productarray', productArray);
        });
  }, []);


  useEffect(() => {
    if (product.length > 0) {
      // console.log('product', product);
      setProductFetched(true, () => {

      });
    }
  }, [product]);


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
