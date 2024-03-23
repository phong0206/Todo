/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ChangeEventHandler } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

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
    sendAPI: {
      fontWeight: 'bold',
      padding: '6px 16px !important',
      '&:hover': {
        backgroundColor: '#032887 !important',
      },
    },
  })
);
interface Props {
  addTodo: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  title: string;
  description: string;
  editTodo: string;
  handleTitleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleDescriptionChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  filter: string;
  handleChangeSelect: SelectChangeEvent<string>;
}
const InputTodo = ({
  title,
  handleTitleChange,
  description,
  handleDescriptionChange,
  addTodo,
  filter,
  handleChangeSelect,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.box}>
        <TextField
          value={title}
          onChange={handleTitleChange}
          label="Title"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={description}
          onChange={handleDescriptionChange}
          label="Description"
          variant="outlined"
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={addTodo}
              className={classes.sendAPI}
            >
              Add Todo
            </Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={handleChangeSelect}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="all">Get All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InputTodo;
