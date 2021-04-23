/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
const timeslots = ['10:00 am', '4:00 pm', '8:00 pm', '2:00 am'];
function ProductInfo(props) {
  const [Product, setProduct] = useState({});
  const user = useSelector((state) => state.user);
  // const [Auctiondate, setAuctiondate] = useState({});

  useEffect(() => {
    setProduct(props.detail);
    // const today = Product.date;
    // const date = today.getYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // setAuctiondate(date);
  }, [props.detail]);

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      productId: Product._id,
    };

    Axios.post('/api/product/add_user', variables).then((response) => {
      if (response.data.success) {
        alert('You have been added for the auction');
      } else {
        alert('Failed to save Comment');
      }
    });
  };

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Base Price"> {Product.basePrice}</Descriptions.Item>
        <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
        <Descriptions.Item label="Date"> {Product.date}</Descriptions.Item>
        <Descriptions.Item label="Time">  {timeslots[Product.timeslot - 1]}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="large" shape="round" type="danger"
          onClick={onSubmit}
        >
        Join
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
