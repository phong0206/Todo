import React, { useState } from 'react';
import Button from '@mui/material/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../../App.css';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    button: {
      width: 0,
      height: 40,
      position: 'fixed !important',
      bottom: 60,
      right: 30,
      zIndex: 1000,
      minWidth: '55px !important',
      backgroundColor: '#114272 !important',
    },
    spanText: {
      color: 'white',
    },
    griditem: { marginTop: '12px' },
    scroll: {
      display: 'block', 
      [theme.breakpoints.down('md')]: {
        display: 'none', 
      },
    },
  })
);
export default function ScrollTopButton({ threshold = 100 }) {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.scroll}>
      <Zoom in={trigger}>
        <Button
          onClick={handleClick}
          style={{
            visibility: trigger ? 'visible' : 'hidden',
          }}
          className={classes.button}
          variant="contained"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Button>
      </Zoom>
    </div>
  );
}
