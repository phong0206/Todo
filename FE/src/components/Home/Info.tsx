import { Grid } from '@mui/material';
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';

interface Props {
  content?: string;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    gridInfo: {
      backgroundColor: '#032234',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      marginTop: '100px',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        marginTop: '110px',
        paddingTop: '25px',

        fontSize: '22px !important',
      },
      [theme.breakpoints.down('md')]: {
        // 900px
        paddingTop: '5px',
        marginTop: '110px',
        fontSize: '16px !important',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        paddingTop: '10px',
        marginTop: '60px',
        height: '100px !important',
        fontSize: '14px !important',
        flexBasis: '100%',
      },
    },
    spanText: {
      fontFamily: 'Times New Roman',
      color: 'white !important',
      marginLeft: '9rem !important',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        marginLeft: '60px !important',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        marginLeft: '50px !important',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        marginLeft: '15px !important',
      },
    },
    griditem: {},
  })
);

function Text({ content }: Props) {
  const classes = useStyles();
  return <span className={classes.spanText}>{content}</span>;
}
export default function Info() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.gridInfo}>
      <Grid item xs={12} sm={6} className={classes.griditem}>
        <Text content="Email: Taixininvest.co.ltd@gmail.com" />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.griditem}>
        <Text content="Hotline: 0326603593 - 0976333871" />
      </Grid>
    </Grid>
  );
}
