import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles, createStyles } from '@mui/styles';

interface Props {
  bottom?: number;
  color?: string;
  Icon?: JSX.Element;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    button: {
      position: 'fixed !important',
      zIndex: 1000,
      width: 1,
      height: 53,
      borderRadius: '50px !important',
      padding: '5px !important',
      minWidth: '55px !important',
      left: 20,
      [theme.breakpoints.down('lg')]: {
        // 1280px
        left: '40px !important',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        left: '30px !important',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        left: '5px !important',
      },
    },
  })
);

export default function ButtonInfo({ bottom, Icon }: Props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      sx={{
        bottom: bottom,
      }}
    >
      {Icon}
    </Button>
  );
}
