/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';
import { useParams } from 'react-router';
const { Title } = Typography;

function ResetPage(props) {
  const [Password, setPassword] = useState('');
  const [Confirm, setConfirm] = useState('');
  const { token } = useParams();

  const onPasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmChange = (event) => {
    setConfirm(event.currentTarget.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    if (Password !== Confirm) {
      alert('Password dont match!!');
    }

    const variables = {
      password: Password,
      token: token,
    };


    Axios.post('/api/users/new-password', variables)
        .then((data) => {
          console.log(data);
          if (data.error) {
            // M.toast({ html: data.error, classes: '#c62828 red darken-3' });
            alert('error');
          } else {
            // M.toast({ html: data.message, classes: '#43a047 green darken-1' });
            alert('password updated');
            props.history.push('/login');
          }
        }).catch((err) => {
          console.log(err);
        });
  };


  return (

    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>

      <div style={{ backgroundColor: 'white', padding: '1rem', border: '10px solid black' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2} style={{ }}> Enter New Password</Title>
        </div>


        <Form onSubmit={onSubmit} >

          {/* DropZone */}
          <label style={{ fontSize: '16px' }}>New Password</label>
          <Input
            onChange={onPasswordChange}
            value={Password}
          />
          <br />
          <br />
          <label style={{ fontSize: '16px' }}>Confirm Password</label>
          <Input
            onChange={onConfirmChange}
            value={Confirm}
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
