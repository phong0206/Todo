/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    box: {
      textAlign: 'center',
      borderColor: '#ccc',
      backgroundColor: '#f5f5f5',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      padding: 0,
    },
    text: {
      fontFamily: 'Muli, Arial, sans-serif',
      display: 'flex',
      fontSize: '15px',
      margin: '0 auto',
      cursor: 'pointer',
      '& > div': {
        margin: theme.spacing(0, 1),
        '&:hover': {
          color: theme.palette.warning.main,
        },
      },
    },
  })
);

interface Props {
  unit?: { unit: string; unitId: string };
  category?: { category: string; categoryId: string };
}

const InfoBarBlog = ({ unit, category }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/');
  };
  const handleClickUnit = () => {
    navigate(`/unit/${unit?.unitId}`);
  };
  const handleClickCategory = () => {
    navigate(`/category/${category?.categoryId}`);
  };

  return (
    <Box className={classes.box}>
      <Typography component="div" className={classes.text}>
        <div onClick={handleClickHome}>Trang Chủ</div>»
        {category && (
          <div onClick={handleClickCategory}>{category.category}</div>
        )}
        »{unit && <div onClick={handleClickUnit}>{unit.unit}</div>}
      </Typography>
    </Box>
  );
};

export default InfoBarBlog;
