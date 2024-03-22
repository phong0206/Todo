/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */

import '../App.css';
import * as React from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { Container, Box, Grid } from '@mui/material';
import Info from '../components/Home/Info';
import ScrollTopButton from '../components/Home/ScrollTopButton';
import { ButtonContact } from './Home';
import { makeStyles, createStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import * as api from '../apis/api';
import CardSlider from '../components/Home/CardSlider';
import PathBlog from '../components/ListCardBlog/PathBlog';
const useStyles = makeStyles((theme: any) =>
  createStyles({
    containerContent: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '20px',
    },
    container: {
      marginTop: '20px',
      marginInline: '15vh',
      marginBottom: '60px',

      [theme.breakpoints.down('lg')]: {
        // 1280px
        marginInline: '8vw',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        marginInline: '3vw',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        marginInline: '5px',
      },
    },
  })
);
function CardBlog() {
  const classes = useStyles();

  let { unitId, categoryId } = useParams<{
    unitId?: string;
    categoryId?: string;
  }>();

  const [blogs, setBlogs] = React.useState(null);

  React.useEffect(() => {
    let fetchUrl;

    if (unitId) {
      fetchUrl = api.getBlogByUnitId(unitId);
    } else if (categoryId) {
      fetchUrl = api.getBlogByCategoryId(categoryId);
    } else {
      console.warn('No parameters provided');
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await fetchUrl;
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      }
    };

    fetchBlog();
  }, [unitId, categoryId]);

  if (!blogs) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <Header />
      <Info />
      <PathBlog unit={blogs.unit ? blogs.unit : {}} category={blogs.category} />
      <div className={classes.container}>
        <ScrollTopButton />
        <ButtonContact />

        <div className={classes.containerContent}>
          {blogs.blogsWithPathImages.map((slide: any) => (
            <CardSlider key={slide._id} {...slide} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CardBlog;
