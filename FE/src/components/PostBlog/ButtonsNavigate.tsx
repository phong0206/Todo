import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    box: {
      borderColor: '#ccd',
      backgroundColor: '#f5f5f5',
      maxHeight: '145px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop : '10px'
    },
    gridContainer: {
      display: 'flex',
      marginLeft: '10vw',
    },
    button: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      backgroundColor: 'teal',
      '&:hover': {
        backgroundColor: 'navy !important',
      },
    },
  })
);

const ButtonsNavigate = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleDeleteBlog = () => {
    navigate('/admin/delete');
  };
  const handleUploadBlog = () => {
    navigate('/admin/post');
  };
  const handleChangeUnitCategory = () => {
    navigate('/admin/add-unit-category');
  };
   const handleUseMarkdown = () => {
    navigate('/admin/use-markdown');
  };
  return (
    <Box className={classes.box}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleUploadBlog}
          >
            Upload Blog
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleChangeUnitCategory}
          >
            Add Category and Unit
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleDeleteBlog}
          >
            Delete Blog
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleUseMarkdown}
          >
            Using Markdown
          </Button>
      </Grid>
      </Grid>
    </Box>
  );
};

export default ButtonsNavigate;
