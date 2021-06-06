/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';
const { Title } = Typography;

function ResetPage(props) {
  const [email, setEmail] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();


    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      alert('Invalid Email');
      return;
    }
    const variables = { email: email };

    Axios.post('/api/users/reset-password', variables)
        .then((data) => {
          if (data.error) {
            alert('error');
          } else {
            // M.toast({ html: data.message, classes: '#43a047 green darken-1' });
            alert('check your email to confirm');
            history.push('/login');
          }
        }).catch((err) => {
          console.log(err);
        });
  };


  return (

    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>

      <div style={{ backgroundColor: 'white', padding: '1rem', border: '10px solid black' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2} > Enter Email</Title>
        </div>


        <Form onSubmit={onSubmit} >

          {/* DropZone */}
          <label style={{ fontSize: '16px' }}>Email</label>
          <Input
            onChange={onEmailChange}
            value={email}
          />
          <br />
          <br />

          <Button type='danger'
            onClick={onSubmit}
            style={{ fontSize: '16px' }}
            size='large'
          >
                    Submit
          </Button>

        </Form>
      </div>

    </div>

  );
}

export default ResetPage;
