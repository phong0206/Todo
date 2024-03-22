/* eslint-disable import/no-duplicates */
import React, { ChangeEvent } from 'react';
import Select from '../components/PostBlog/Select';
import '../App.css';
import InputFileUpload from '../components/PostBlog/InputFileUpload';
import * as api from '../apis/api';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles, createStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import DialogCustom from '../components/DialogCustom';
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
  })
);

const Post = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [repoCategories, setRepoCategories] = React.useState([]);
  const [repoUnits, setRepoUnits] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [openUnit, setOpenUnit] = React.useState(false);
  const [openCate, setOpenCate] = React.useState(false);

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

  const handleDeleteButton = () => {
    navigate('/admin/delete');
  };
  const handleChangeCategory = async (
    event: ChangeEvent<{ value: unknown }>
  ) => {
    const selectedCategoryId = event.target.value as string;
    setCategory(selectedCategoryId);

    try {
      setIsLoading(true);
      const data = await api.getUnitsByCategoryId(selectedCategoryId);
      if (data.status === 200) {
        setRepoUnits(data.data.units);
      }
    } catch (error) {
      console.error('Error fetching units by category', error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div>Loading....ádas</div>;
  }

  const handleChangeUnit = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedUnitId = event.target.value as string;
    setUnit(selectedUnitId);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleDialogOpenUnit = () => {
    setOpenUnit(true);
  };

  const handleDialogCloseUnit = () => {
    setOpenUnit(false);
  };

  const handleDeleteUnit = async () => {
    handleDialogCloseUnit();
    // Thực hiện xóa ở đây hoặc truyền hàm xóa từ props
    try {
      const data = await api.deleteUnit(unit);
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
      console.error('Error uploading blog', error);
    }
  };

  const handleDialogOpenCate = () => {
    setOpenCate(true);
  };

  const handleDialogCloseCate = () => {
    setOpenCate(false);
  };

  const handleDeleteCate = async () => {
    handleDialogCloseCate();
    try {
      const data = await api.deleteCategory(category);
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
      console.error('Error uploading blog', error);
    }
    // Thực hiện xóa ở đây hoặc truyền hàm xóa từ props
  };

  const uploadBlog = async () => {
    if (!category || !unit || !file || !title || !content) {
      enqueueSnackbar('Missing required information', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      console.error('Missing required information');
      return;
    }
    try {
      const data = await api.uploadBlog({ file, content, title, unit });
      if (data.status === 200) {
        setCategory('');
        setUnit('');
        setFile(null);
        setTitle('');
        setContent('');
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
      console.error('Error uploading blog', error);
    }
  };

  return (
    <>
      <ButtonsNavigate />
      <h2 className={classes.h2}>Post Blog</h2>
      <Box className={classes.box}>
        <Select
          nameSelect="Category"
          value={category}
          handleChange={handleChangeCategory}
          repo={repoCategories}
          displayField="category"
          valueField="_id"
        />
        <Select
          nameSelect="Unit"
          value={unit}
          handleChange={handleChangeUnit}
          repo={repoUnits}
          displayField="unit"
          valueField="_id"
        />
        <TextField
          value={title}
          onChange={handleTitleChange}
          label="Title"
          variant="outlined"
          fullWidth
        />
        <InputFileUpload handleFileChange={handleFileChange} file={file} />
        <TextField
          value={content}
          onChange={handleContentChange}
          className={classes.content}
          label="Content"
          multiline
          variant="outlined"
          fullWidth
          InputLabelProps={{
            style: { lineHeight: '2.28' },
          }}
        />
        <Grid container spacing={2} className={classes.gridcontainer}>
          <Grid item xs={12} sm={3}>
            <Button
              className={classes.sendAPI}
              variant="contained"
              onClick={uploadBlog}
            >
              Upload Blog
            </Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              className={classes.deleteBlog}
              variant="contained"
              onClick={handleDeleteButton}
            >
              Delete Blog
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              className={classes.deleteUnit}
              variant="contained"
              onClick={handleDialogOpenUnit}
            >
              Delete Unit
            </Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              className={classes.deleteCategory}
              variant="contained"
              onClick={handleDialogOpenCate}
            >
              Delete Category
            </Button>
          </Grid>
        </Grid>
      </Box>
      <DialogCustom
        open={openUnit}
        handleDialogClose={handleDialogCloseUnit}
        title="Confirm Delete Unit"
        content="unit"
        handleDelete={handleDeleteUnit}
      />
      <DialogCustom
        open={openCate}
        handleDialogClose={handleDialogCloseCate}
        title="Confirm Delete Category"
        content="category"
        handleDelete={handleDeleteCate}
      />
    </>
  );
};

export default Post;
