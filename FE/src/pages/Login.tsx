import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { makeStyles, createStyles } from '@mui/styles';
import * as api from '../apis/api';
import { useSnackbar } from 'notistack';
import '../App.css';
import { AuthContext } from '../context/AuthProvider';

function Copyright(props: any) {
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
      fontFamily: 'Times New Roman',
      marginTop: '7%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      width: '45%',
      marginInline: 'auto',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        width: '65%',
        marginTop: 250,
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        width: '65%',
        marginTop: 240,
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        width: '85%',
        marginTop: 150,
      },
    },
    avatar: {
      margin: '10px',
      backgroundColor: 'navy',
      width: '55px',
      height: 'auto',
    },
    boxChild: {
      marginTop: '10px',
    },
    button: {
      marginTop: '20px',
      marginBottom: '5%',
    },
    link: {
      fontSize: '16px',
    },
    copyRight: {
      marginBottom: '3%',
      marginTop: '5%',
    },
  })
);
export default function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { updateToken } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email is required').email('Email invalid'),
      password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values: any) => {
      const res = await api.login({
        email: values.email,
        password: values.password,
      });
      if (res.data?.accessToken) {
        enqueueSnackbar(res.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        await updateToken(res.data.accessToken);
        navigate('/admin/post');
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
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        className={classes.boxChild}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
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
        </Grid>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.button}
        >
          Sign In
        </Button>
        <Grid container direction="column">
          <Grid item xs>
            <Link
              className={classes.link}
              href="forgot-password"
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link className={classes.link} href="register" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright className={classes.copyRight} />
    </Box>
  );
}
