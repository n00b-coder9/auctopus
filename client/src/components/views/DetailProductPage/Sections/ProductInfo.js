/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { CompareArrowsOutlined } from '@material-ui/icons';
const timeslots = ['10:00 am', '4:00 pm', '8:00 pm', '2:00 am'];
function ProductInfo(props) {
  const [Product, setProduct] = useState({});
  const [Buyers, setBuyers] = useState([]);
  const [check, setCheck] = useState(false);
  const [auction, setAuction] = useState(false);
  const [isWriter, setWriter] = useState(false);
  const user = useSelector((state) => state.user);
  // const [Auctiondate, setAuctiondate] = useState({});

  useEffect(() => {
    setProduct(props.detail);
    console.log(props.detail);
    const writer = props.detail.writer;
    const Buyer = props.detail.buyers;

    if (Buyer !== undefined && writer !== undefined) {
      Buyer.find((element) => {
        if (element == user.userData._id) {
          console.log(element, '-', user.userData._id);

          setCheck(true);
        }
      });
      if (user.userData._id == writer._id) {
        console.log(user.userData._id);
        console.log(writer._id);

        setWriter(true);
      }
    }
    // setAuctiondate(date);
    const date = props.detail.date;


    if (date !== undefined) {
      const timeslot = date.timeSlot;
      let hourSlot;
      if (timeslot === 1) {
        hourSlot = 10;
      } else if (timeslot === 2) {
        hourSlot = 16;
      } else if (timeslot === 3) {
        hourSlot = 20;
      } else {
        hourSlot = 2;
      }
      hourSlot = 21;
      function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) {
          month = '0' + month;
        }
        if (day.length < 2) {
          day = '0' + day;
        }

        return [year, month, day].join('-');
      }
      const time = new Date();
      const currDate = formatDate(time);
      const AuctionDate = date.toString().split('T')[0];

      console.log(AuctionDate);
      console.log(currDate);
      const hrs = time.getHours();
      if (hrs >= hourSlot && currDate == AuctionDate) {
        setAuction(true);
      }
      // setAuction(true);
    }
  }, [props.detail]);


  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      productId: Product._id,
    };
    if (!check) {
      Axios.post('/api/product/add_user', variables).then((response) => {
        if (response.data.success) {
          alert('You have been added for the auction');
        } else {
          alert('Failed to save Comment');
        }
      });
    } else {
      Axios.post('/api/product/remove_user', variables).then((response) => {
        if (response.data.success) {
          alert('You have been removed from the auction');
        } else {
          alert('Failed to save Comment');
        }
      });
    }
    setCheck((value) => !value);
  };

  return (
    <div >

      <Descriptions title="Product Info">
        <Descriptions.Item label="Base Price"> {Product.basePrice}</Descriptions.Item>
        <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
        {
          Product.date !== undefined &&
          <Descriptions.Item label="Date">
            {Product.date.toString().split('T')[0]}</Descriptions.Item>
        }
        <Descriptions.Item label="Time">  {timeslots[Product.timeslot - 1]}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      {
        (!isWriter) ? (
        <div>
          {

            (!auction) ? (
              <div>
                <label style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                  Click to Join/Withdraw from the Auction</label>

                <br />
              </div>
            ) : ''
          }
          <div style={{ display: 'flex', justifyContent: 'center' }}>


            {

              // eslint-disable-next-line max-len
              (auction) ? ((check) ? <Link to={`/auction/${Product._id}`}><Button variant="contained" color="secondary"

              >
                Enter Auction
              </Button></Link> : <h2 style={{ color: 'red' }}>Auction already started !</h2>) :
                (


                  (!check) ? (

                    <Button variant="contained" color="primary"
                      onClick={onSubmit}
                    >
                      Join
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary"
                      onClick={onSubmit}
                    >
                      Withdraw
                    </Button>
                  )

                )


            }
          </div>
        </div>
        ) : <p></p>
      }
    </div>
  );
}

export default ProductInfo;

