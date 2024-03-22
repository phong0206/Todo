/* eslint-disable import/no-duplicates */
import React, { ChangeEvent } from 'react';
import Select from '../components/PostBlog/Select';
import '../App.css';
import * as api from '../apis/api';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles, createStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import ButtonsNavigate from '../components/PostBlog/ButtonsNavigate';
const useStyles = makeStyles((theme: any) =>
  createStyles({
    box: {
      fontFamily: 'Times New Roman',
      marginTop: '1.5%',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      width: '75%',
      marginInline: 'auto',
      [theme.breakpoints.down('lg')]: {
        width: '65%',
        marginTop: 50,
      },
      [theme.breakpoints.down('md')]: {
        width: '65%',
        marginTop: 40,
      },
      [theme.breakpoints.down('sm')]: {
        width: '85%',
        marginTop: 50,
      },
      '& > *:not(:last-child)': {
        marginBottom: '10px',
      },
    },
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
    sendAPI: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      '&:hover': {
        backgroundColor: '#032887 !important',
      },
    },
    deleteBlog: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      backgroundColor: 'chocolate',
      '&:hover': {
        backgroundColor: 'red !important',
      },
    },
    deleteUnit: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      backgroundColor: 'chocolate',
      '&:hover': {
        backgroundColor: 'red !important',
      },
    },
    deleteCategory: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      backgroundColor: 'chocolate',
      '&:hover': {
        backgroundColor: 'red !important',
      },
    },
    content: {
      maxHeight: '300px',
      overflowY: 'auto',
    },
    gridcontainer: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '75%',
      },
    },
    h3: {
      textAlign: 'center',
      fontFamily: 'Times New Roman',
      fontWeight: 'bold',
      fontSize: '20px',
      color: 'chocolate',
    },
  })
);

const AddUnit = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [repoCategories, setRepoCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [typoCategory, setTypoCategory] = React.useState('');
  React.useEffect(() => {
    const fetchUnitsByCategory = async () => {
      try {
        const data = await api.getAllCategories();
        if (data.status === 200) {
          setRepoCategories(data.data.data.categories);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error('Error fetching units by category', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnitsByCategory();
  }, []);

  const handleChangeCategory = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedCategoryId = event.target.value as string;
    setCategory(selectedCategoryId);
  };

  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTypoCategory(event.target.value);
  };
  const handleCreateCategory = async () => {
    try {
      const data = await api.createCategory(typoCategory);
      if (data.status === 200) {
        enqueueSnackbar(data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error('Error uploading Category', error);
    }
  };

  const handleCreateUnit = async () => {
    try {
      const data = await api.createUnit(category, unit);
      if (data.status === 200) {
        enqueueSnackbar(data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error('Error uploading Category', error);
    }
  };

  return (
    <>
      <ButtonsNavigate />
      <h2 className={classes.h2}>Create Category And Unit</h2>
      <h3 className={classes.h3}>Create New Category</h3>
      <Box className={classes.box}>
        <TextField
          value={typoCategory}
          onChange={handleCategoryChange}
          label="Category"
          variant="outlined"
          fullWidth
        />
        <Grid container spacing={2} className={classes.gridcontainer}>
          <Grid item xs={12} sm={3}>
            <Button
              className={classes.sendAPI}
              variant="contained"
              onClick={handleCreateCategory}
            >
              Create Category
            </Button>
          </Grid>
        </Grid>
      </Box>
      <h3 className={classes.h3}>Create New Unit</h3>
      <Box className={classes.box}>
        <Select
          nameSelect="Category"
          value={category}
          handleChange={handleChangeCategory}
          repo={repoCategories}
          displayField="category"
          valueField="_id"
        />
        <TextField
          value={unit}
          onChange={handleUnitChange}
          label="Unit"
          variant="outlined"
          fullWidth
        />
        <Grid container spacing={2} className={classes.gridcontainer}>
          <Grid item xs={12} sm={3}>
            <Button
              className={classes.sendAPI}
              variant="contained"
              onClick={handleCreateUnit}
            >
              Upload Unit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddUnit;
