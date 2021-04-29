/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  TextField,
  makeStyles,
  Card,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import { registerUser } from '../../../_actions/user_actions';
import { loginUser } from '../../../_actions/user_actions';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import background from '../../../utils/BG.jpg';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import setIsSnackbarOpen from '../../../_actions/snackbar_actions';

const validationSchema = Yup.object({
  name: Yup.string()
      .required('Name is required'),
  lastName: Yup.string()
      .required('Last Name is required'),
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
});
const useStyles = makeStyles((theme) => ({
  root: {
    'flex': '1',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'flex-start',
    'alignItems': 'center',
    'height': '70%',
    'width': '80%',
    'marginVertical': '30px',
  },
  card: {
    'display': 'flex',
    'flexDirection': 'row',
    'height': '80%',
    'width': '100%',
    'borderRadius': '10px',

  },
  containers: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    width: '100%',

  },
  containers1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    width: '100%',
    margin: '20px',
  },
}));
function RegisterPage(props) {
  // State declaration for this component
  const [isFormEnabled, setFormEnabled] = useState(true);
  const classes = useStyles();

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  let initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : ' ';
  if (initialEmail == 'undefined') {
    initialEmail = '';
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      lastName: '',
      name: '',
      password: '',
      confirmPassword: '',
      favourites: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setFormEnabled(false);
      setTimeout(() => {
        const dataToSubmit = {
          email: values.email,
          password: values.password,
          name: values.name,
          lastname: values.lastname,
          image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          favourites: values.favourites,
        };

        dispatch(registerUser(dataToSubmit)).then((response) => {
          if (response.payload.success) {
            dispatch(setIsSnackbarOpen({
              isOpen: true,
              message: 'Registration Successful',
              severity: 'success',
            }));
            props.history.push('/login');
          } else {
            dispatch(setIsSnackbarOpen({
              isOpen: true,
              message: response.payload.err.errmsg,
              severity: 'error',
            }));
          }
        });
        setFormEnabled(true);
        setSubmitting(false);
      }, 500);
    },
  });

  return (
    <div className='app'>
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.containers} style={{
            background: `url(${background})`,
            backgroundSize: '100% 100%',
          }}>
            {/* Logo and my site region */}
            <div style={{
              margin: '3px',
              padding: '3px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '20%',
              width: '100%',
              color: 'white',
              fontSize: '28px',
              fontFamily: 'sans-serif',
            }}>
              <p>Auctopus</p>
            </div>
            <div style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              color: 'white',
              fontSize: '30px',
              fontWeight: 'bolder',
              fontFamily: 'sans-serif',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px',
            }}>
              <p>Welcome Page</p>
              <p style={{
                fontSize: '20px',
                fontWeight: 'normal',
              }}>Sign in to <br />continue access</p>
            </div>
            <div style={{
              display: 'flex',
              color: 'white',
              flexDirection: 'column-reverse',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              fontFamily: 'sans-serif',
              fontSize: '16px',
              margin: '5px',
            }}>
              <p>www.auctopus.com</p>
            </div>
          </div>
          <div className={classes.containers1}>
            {/* form*/}
            <div style={{
              height: '100%',
              width: '100%',
              marginVertical: '5px',
              display: 'flex',
              flexDirection: 'column',
              padding: '5px',
            }}>
              <div style={{
                height: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'flex-start',
                justifyContent: 'center',
                fontSize: '30px',
                fontFamily: 'sans-serif',
                fontWeight: 'bolder',
                color: 'black',
              }}>
                <p>Register</p>

              </div>
              <div style={{ flex: '1' }}>
                <form noValidate onSubmit={formik.handleSubmit} style={{
                  height: '100%',
                  width: '100%',
                  marginVertical: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                }}>
                  {/* Name */}
                  <TextField
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    id="name"
                    name="name"
                    label="First Name"
                    placeholder="Enter your First Name"
                  />
                  {/* Last Name */}
                  <TextField
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                  />
                  {/* Email */}
                  <TextField
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                  {/* Password */}
                  <TextField
                    id="password"
                    name="password"
                    label="Create Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    placeholder="Enter your password"
                  />
                  {/* Confirm Password */}
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    placeholder="Confirm your password"
                  />
                  {/* Register button */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '15px',
                    // alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                    <Button
                      disabled={formik.isSubmitting}
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={{
                        width: '30%',
                        marginLeft: 'auto',
                        background: 'linear-gradient(to right,purple,magenta)',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(RegisterPage);
