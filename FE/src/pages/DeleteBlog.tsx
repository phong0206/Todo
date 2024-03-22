import React, { ChangeEvent } from 'react';
import Select from '../components/PostBlog/Select';
import '../App.css';
import InputFileUpload from '../components/PostBlog/InputFileUpload';
import * as api from '../apis/api';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles, createStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
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
    deleteButton: {
      fontWeight: 'bold',
      marginLeft: '10px',
      padding: '6px 16px !important',
      backgroundColor: 'chocolate',
      [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
        marginLeft: '0px',
      },
      '&:hover': {
        backgroundColor: 'red !important',
      },
    },
    content: {
      maxHeight: '300px',
      overflowY: 'auto',
    },
  })
);

const Post = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);

  const [repoCategories, setRepoCategories] = React.useState([]);
  const [category, setCategory] = React.useState('');

  const [repoUnits, setRepoUnits] = React.useState([]);
  const [unit, setUnit] = React.useState('');

  const [repoBlogs, setRepoBlogs] = React.useState([]);
  const [blog, setBlog] = React.useState('');

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

  if (isLoading) {
    return <div>Loading....</div>;
  }

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
  const handleChangeUnit = async (event: ChangeEvent<{ value: unknown }>) => {
    const selectedUnitId = event.target.value as string;
    setUnit(selectedUnitId);

    try {
      setIsLoading(true);

      const data = await api.getBlogByUnitId(selectedUnitId);

      if (data.status === 200) {
        setRepoBlogs(data.data.blogsWithPathImages);
      }
    } catch (error) {
      console.error('Error fetching blogs by category', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangeBlogs = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedBlogId = event.target.value as string;
    setBlog(selectedBlogId);
  };

  const handleDeleteButton = async () => {
    try {
      const data = await api.deleteBlog(blog);
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
  const handlePostButton = () => {
    navigate('/admin/post');
  };

  return (
    <>
      <ButtonsNavigate />
      <h2 className={classes.h2}>Delete Blog</h2>
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
        <Select
          nameSelect="Blog"
          value={blog}
          handleChange={handleChangeBlogs}
          repo={repoBlogs}
          displayField="title"
          valueField="_id"
        />
        <span>
          <Button
            className={classes.sendAPI}
            variant="contained"
            onClick={handlePostButton}
          >
            Back to Upload Blog
          </Button>
          <Button
            className={classes.deleteButton}
            variant="contained"
            onClick={handleDeleteButton}
          >
            Delete Blog
          </Button>
        </span>
      </Box>
    </>
  );
};

export default Post;
