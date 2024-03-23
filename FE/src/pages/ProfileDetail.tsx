import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Button, Box } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import * as api from '../apis/api';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    h2: {
      textAlign: 'center',
      fontFamily: 'Times New Roman, Times, serif',
      color: '#333',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '20px',
      position: 'relative',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: '40%',
        height: '3px',
        backgroundColor: '#1d5289',
        bottom: '-5px',
      },
      '&::before': {
        left: 0,
      },
      '&::after': {
        right: 0,
      },
    },
    box: {
      fontFamily: 'Times New Roman',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      width: '55%',
      marginInline: 'auto',
      marginTop: '10vw',
      '& > *:not(:last-child)': {
        marginBottom: '10px',
      },
    },
    sendAPI: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      '&:hover': {
        backgroundColor: '#032887 !important',
      },
    },
  })
);
const ProfileDetail = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const res = await api.updateUser({
      name: name,
      email: email,
      age: age,
      phonenumber: phoneNumber,
    });
    if (res.status === 200) {
      enqueueSnackbar(res.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      enqueueSnackbar(res.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form fields if needed
  };
  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Box className={classes.box}>
      <h2 className={classes.h2}>Profile Detail</h2>
      <div>
        <label>Name: </label>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div>
        <label>Email: </label>
        <span>{email}</span>
      </div>
      <div>
        <label>Age: </label>
        {isEditing ? (
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
        ) : (
          <span>{age}</span>
        )}
      </div>
      <div>
        <label>Phone Number: </label>
        {isEditing ? (
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        ) : (
          <span>{phoneNumber}</span>
        )}
      </div>
      {isEditing ? (
        <div>
          <Button
            variant="contained"
            className={classes.sendAPI}
            onClick={handleSave}
          >
            Save
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className={classes.sendAPI}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            className={classes.sendAPI}
            onClick={handleBack}
          >
            Back
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className={classes.sendAPI}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      )}
    </Box>
  );
};

export default ProfileDetail;
