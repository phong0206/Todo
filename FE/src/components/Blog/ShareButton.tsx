/* eslint-disable react/button-has-type */
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import copy from 'copy-to-clipboard';
import { makeStyles, createStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

interface ShareButtonProps {
  url: string;
  title: string;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    button: {
      marginLeft: '10px',
      marginTop: '10px',
      backgroundColor: '#4267b2',
      border: '2px solid #4267b2',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '2px',
      fontWeight: 'bold',
      alignItems: 'center',
      display: 'flex',
      '&:hover': {
        backgroundColor: '#365899',
      },
    },
    buttonsContainer: {
      marginTop: '40px',
      display: 'flex', // This will align buttons in a row
      justifyContent: 'start', // This will give space around buttons
      alignItems: 'center', // This will vertically align buttons in the middle
      [theme.breakpoints.down('sm')]: {
        // 600px
        display: 'block',
      },
    },
    icon: {
      padding: '1px',
      marginRight: '2px',
    },
  })
);

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}&t=${encodeURIComponent(title)}`;
  const zaloShareUrl = `https://zalo.me/draft?text=${encodeURIComponent(title + ' ' + url)}`;
  const wechatShareUrl = `weixin://dl/forward?title=${encodeURIComponent(
    title + ' ' + url
  )}&url=${encodeURIComponent(url)}`;

  const handleShareClick = (shareUrl: string) => {
    window.open(shareUrl, 'sharer', 'width=550,height=350');
  };

  const handleCopyToClipboard = () => {
    copy(url);
    enqueueSnackbar('Copy URL Successfully', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  return (
    <div className={classes.buttonsContainer}>
      <button
        onClick={() => handleShareClick(facebookShareUrl)}
        className={classes.button}
      >
        <FacebookIcon fontSize="small" className={classes.icon} />
        Share on Facebook
      </button>

      <button
        onClick={() => handleShareClick(zaloShareUrl)}
        className={classes.button}
      >
        <ShareIcon fontSize="small" className={classes.icon} />
        Share on Zalo
      </button>
      <button
        onClick={() => handleShareClick(wechatShareUrl)}
        className={classes.button}
      >
        <ShareIcon fontSize="small" className={classes.icon} />
        Share on WeChat
      </button>
      <button onClick={handleCopyToClipboard} className={classes.button}>
        <FileCopyIcon fontSize="small" className={classes.icon} />
        Copy URL
      </button>
    </div>
  );
};

export default ShareButton;
