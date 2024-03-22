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

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      fontFamily: 'Times New Roman !important',
      border: '0.8px solid #000',
      width: 'auto !important',
      display: 'inline-block',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    head: {
      backgroundColor: '#522f15',
    },
    title: {
      fontWeight: 'bold !important',
      color: 'white !important',
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
      fontWeight: 'bold !important',
      fontSize: '1rem !important',
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

const OutstandingService = () => {
  const classes = useStyles();

  return (
    <Table className={classes.root}>
      <TableHead className={classes.head}>
        <TableRow className={classes.row}>
          <TableCell colSpan={2} align="center" sx={{ padding: '8px' }}>
            <Typography variant="h6" className={classes.title}>
              Dịch Vụ Nổi Bật
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          'Giấy chứng nhận đăng ký kinh doanh',
          'Giấy chứng nhận đăng ký đầu tư',
          'Giấy phép lao động',
          'Visa, thẻ tạm trú',
          'Giấy phép khác',
          'Dịch vụ tư vấn',
        ].map((service, index) => (
          <TableRow key={index} className={classes.row}>
            <TableCell className={classes.cell}>
              <a href="#" className={classes.link}>
                <Typography variant="body2" className={classes.services}>
                  • {service}
                </Typography>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OutstandingService;
