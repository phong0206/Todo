import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import * as api from '../../apis/api';
import { APP_URL } from '../../utils/config';
const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      marginTop: '35px',
      width: '100% !important',
    },
    title: {
      fontWeight: 'bold !important',
      fontFamily: 'Times New Roman !important',
    },
    row: {
      height: '20px !important',
    },
    cell: {
      whiteSpace: 'nowrap !important',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '6px !important',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    services: {
      fontFamily: 'Muli, Arial, sans-serif !important',
      fontSize: '1.1rem !important',
      [theme.breakpoints.down('lg')]: {
        // 960px
        fontSize: '0.9rem !important',
      },
      '&:hover': {
        color: '#FF6600 !important',
      },
    },
  })
);

const BlogRelated = ({ blog }: any) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchBlogsByUnitId = async () => {
      try {
        const data = await api.getBlogByUnitId(blog.unitId);
        if (data.status === 200) {
          setTitle(data.data.blogsWithPathImages.slice(0, 10));
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error('Error fetching units by category', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogsByUnitId();
  }, [blog]);
  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow className={classes.row}>
          <TableCell colSpan={2} align="center" sx={{ padding: '8px' }}>
            <Typography variant="h5" className={classes.title}>
              Bài Viết Liên Quan
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {title.map((service: { endpoint: string; title: string }, index) => (
          <TableRow key={index} className={classes.row}>
            <TableCell className={classes.cell}>
              <a
                href={`${APP_URL}${service.endpoint}`}
                className={classes.link}
              >
                <Typography className={classes.services}>
                  • &ensp; {service.title}
                </Typography>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BlogRelated;
