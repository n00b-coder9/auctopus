/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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


function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [categoryValue, setcategoryValue] = useState(1);

  const [Images, setImages] = useState([]);


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

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();


    if (!TitleValue || !DescriptionValue || !PriceValue ||
            !categoryValue || !Images) {
      return alert('fill all the fields first!');
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      basePrice: PriceValue,
      images: Images,
      category: categoryValue,
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
        <select onChange={oncategorysSelectChange}>
          {categorys.map((item) => (
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
