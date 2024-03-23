import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { makeStyles, createStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import * as api from '../apis/api';

interface Props {
  email?: string;
  password?: string;
  name?: string;
}
function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      width: '45%',
      height: '85%',
      marginInline: 'auto',
      marginTop: '6rem',
      padding: '30px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      [theme.breakpoints.down('lg')]: {
        width: '70%',
        marginTop: '15rem',
        height: '80%',
      },
      [theme.breakpoints.down('md')]: {
        width: '65%',
        marginTop: '8rem',
        height: '65%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
        marginTop: '6rem',
        height: '85%',
      },
    },
    textField: {
      marginTop: '5px',
      width: '100%',
      '& input': {
        fontSize: '13px',
      },
    },
    date: {
      marginTop: '-8px',
    },
    formControl: {
      width: '100%',
    },
    button: {
      marginTop: '3%',
      marginBottom: '3%',
    },
    copyRight: {
      marginTop: '10px',
    },
    avatar: {
      margin: 0,
      backgroundColor: 'navy',
    },
    boxChild: {
      marginTop: '16px',
    },
    link: {
      fontSize: '16px',
    },
  })
);

function Register() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email is required').email('Email invalid'),
      password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      phoneNumber: yup
        .string()
        .matches(/(\+84|0)[0-9]{9,10}/, 'Invalid phone number'),
      // .required('Confirm password is required'),
      name: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be under 20 character')
        .required('Username is required'),
    }),
    onSubmit: async (values: Props) => {
      const res = await api.register({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      if (res.status === 200) {
        enqueueSnackbar(res.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        navigate('/login');
      } else {
        enqueueSnackbar(res.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    },
  });

  return (
    <Box className={classes.box}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" fontWeight="bold">
        Sign up
      </Typography>
      <Box
        className={classes.boxChild}
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              inputProps={{
                onFocus: () => false,
              }}
              className={classes.textField}
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && Boolean(formik.errors.name)}
            />
          </Grid>
        

          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && Boolean(formik.errors.password)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I accept the Terms of Use and Privacy Policy."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.button}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link className={classes.link} href="login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright className={classes.copyRight} />
    </Box>
  );
}

export default Register;
