import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { makeStyles, createStyles } from '@mui/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    box: {
      textAlign: 'center',
      fontFamily: 'Times New Roman, Times, serif',
      borderColor: '#ccc',
      backgroundColor: '#f5f5f5',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '0px !important',
    },
    title: {
      fontWeight: 'bold !important',
      fontFamily: 'Times New Roman, Times, serif !important',
      paddingTop: '0px !important',
      fontSize: '30px !important',

      [theme.breakpoints.down('sm')]: {
        // 600px
        fontSize: '22px !important',
      },
    },
    dategrid: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '30px',
      paddingTop: '0px !important',
    },
    viewsgrid: {
      paddingBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '0px !important',
    },
    date: {
      fontSize: '18px !important',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        fontSize: '16px !important',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        fontSize: '13px !important',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        fontSize: '11px !important',
      },
    },
    views: {
      fontSize: '18px !important',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        fontSize: '16px !important',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        fontSize: '13px !important',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        fontSize: '11px !important',
      },
    },
  })
);
interface Props {
  blog: { title: string; views: string; date: string };
}
function formatDate(isoDate: string): string {
  const dateParts: string[] = isoDate.substring(0, 10).split('-');
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}
const InfoBarBlog = ({ blog }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ marginTop: '30px' }}>
          <Typography className={classes.title}>{blog.title}</Typography>
        </Grid>
        <Grid item xs={6} className={classes.dategrid}>
          <CalendarMonthIcon fontSize="small" sx={{ marginRight: '5px' }} />
          <Typography className={classes.date}>
            {formatDate(blog.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.viewsgrid}>
          <Visibility sx={{ marginRight: '5px' }} />
          <Typography className={classes.views}>
            {blog.view} lượt xem
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoBarBlog;
