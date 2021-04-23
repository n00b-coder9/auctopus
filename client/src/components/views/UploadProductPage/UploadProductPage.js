/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
/*
{
    '_id': 1,
    'name': 'Automobile',
  },
  {
    '_id': 2,
    'name': 'Fashion',
  },
  {
    '_id': 3,
    'name': 'Electronics',
  },
  {
    '_id': 4,
    'name': 'Sports',
  },

*/
const categorys = [
  { key: 1, value: 'Automobile' },
  { key: 2, value: 'Fashion' },
  { key: 3, value: 'Electronics' },
  { key: 4, value: 'Sports' },
  { key: 5, value: 'Antiques' },
  { key: 6, value: 'Miscellaneous' },
];

const timeslots = [
  { key: 1, value: '10:00 am' },
  { key: 2, value: '4:00 pm' },
  { key: 3, value: '8:00 pm' },
  { key: 4, value: '2:00 am' },
];


function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [categoryValue, setcategoryValue] = useState(1);
  const [timeslotValue, settimeslotValue] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [Images, setImages] = useState([]);
  const currentDate = new Date();
  // console.log(currentDate);
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const oncategorysSelectChange = (event) => {
    setcategoryValue(event.currentTarget.value);
  };
  const ontimeslotSelectChange = (event) => {
    settimeslotValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();


    if (!TitleValue || !DescriptionValue || !PriceValue ||
            !categoryValue || !Images) {
      return alert('fill all the fields first!');
    }
    if (currentDate >= startDate) {
      return alert('Auction Date should be in the future');
    }
    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      basePrice: PriceValue,
      images: Images,
      category: categoryValue,
      date: startDate,
      timeslot: timeslotValue,
    };

    Axios.post('/api/product/uploadProduct', variables)
        .then((response) => {
          if (response.data.success) {
            alert('Product Successfully Uploaded');
            props.history.push('/');
          } else {
            alert('Failed to upload Product');
          }
        });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}> Upload Auction Product</Title>
      </div>


      <Form onSubmit={onSubmit} >

        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={TitleValue}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={DescriptionValue}
        />
        <br />
        <br />
        <label>Price($)</label>
        <Input
          onChange={onPriceChange}
          value={PriceValue}
          type="number"
        />
        <br /><br />
        <label>Date Of Auction</label><br />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <br /><br />
        <label>Category</label><br />
        <select onChange={oncategorysSelectChange}>
          {categorys.map((item) => (
            <option key={item.key} value={item.key}>{item.value} </option>
          ))}
        </select>
        <br />
        <br />
        <label>Auction Time Slot</label><br />
        <select onChange={ontimeslotSelectChange}>
          {timeslots.map((item) => (
            <option key={item.key} value={item.key}>{item.value} </option>
          ))}
        </select>
        <br />
        <br />

        <Button
          onClick={onSubmit}
        >
                    Submit
        </Button>

      </Form>

    </div>
  );
}

export default UploadProductPage;
