/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { API_URL } from '../../utils/config';

interface Props {
  endpoint: string;
  title: string;
  image: string;
  content?: string;
}
export default function CardSlider(props: Props) {
  const navigate = useNavigate();
  const shortenContent = (str: string, maxWords: number) => {
    const words = str.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return str;
  };
  const handleClick = () => {
    navigate(props.endpoint);
  };
  return (
    <Card
      sx={{
        borderRadius: '10px',
        maxWidth: 300,
        '&:hover img': {
          transform: 'scale(1.2)', // Scale up 10%
          transition: 'transform 0.3s ease', // Smooth transition
        },
      }}
    >
      <CardActionArea onClick={handleClick} component="div">
        <CardMedia
          component="img"
          height="210"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            {shortenContent(props.title, 5)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            {props.content ? shortenContent(props.content, 20) : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
