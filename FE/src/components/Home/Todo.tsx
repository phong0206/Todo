/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-useless-fragment */
import { Container, Grid, SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import * as api from '../../apis/api';
import { useSnackbar } from 'notistack';
import DialogCustom from '../DialogCustom';
import InputTodo from './InputTodo';
import ListTodo from './ListTodo';
import { makeStyles, createStyles } from '@mui/styles';
const useStyles = makeStyles((theme: any) =>
  createStyles({
    h2: {
      textAlign: 'center',
      fontFamily: 'Times New Roman, Times, serif',
      color: '#333',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '20px',
      position: 'relative',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: '40%',
        height: '3px',
        backgroundColor: '#1d5289',
        bottom: '-5px',
      },
      '&::before': {
        left: 0,
      },
      '&::after': {
        right: 0,
      },
    },
  })
);
function Todo() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [editTodo, setEditTodo] = React.useState('');
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<{
    title: string;
    description: string;
    _id: string;
  } | null>(null);

  //get all
  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllTodos(filter);
      if (data.status === 200) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error('Error fetching todos', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAllTodos(filter);
  }, [filter]);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  //filter
  const handleChangeSelect = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setFilter(selectedValue);
  };

  //edit
  const handleDialogOpenEdit = (id: string) => {
    setSelectedTodo(
      todos.find((todo: { _id: string }) => todo._id === id) || null
    );
    setOpenEdit(true);
  };
  const handleDialogCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleEditTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditTodo(event.target.value);
  };

  const handleEditTodo = async () => {
    if (!selectedTodo) return;
    handleDialogCloseEdit();
    try {
      const data = await api.updateTodo(selectedTodo._id, editTodo);
      console.log(111, editTodo);
      if (data.status === 200) {
        enqueueSnackbar(data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        setEditTodo('');
        getAllTodos(filter);
      } else {
        setEditTodo('');
        enqueueSnackbar(data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error('Error editting todo', error);
    }
  };
  //delete
  const handleDialogOpenDel = (id: string) => {
    setSelectedTodo(
      todos.find((todo: { _id: string }) => todo._id === id) || null
    );
    setOpenDel(true);
  };
  const handleDialogCloseDel = () => {
    setOpenDel(false);
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;
    handleDialogCloseDel();
    try {
      const data = await api.deleteTodo(selectedTodo._id);
      if (data.status === 200) {
        enqueueSnackbar(data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        getAllTodos(filter);
      } else {
        enqueueSnackbar(data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  //toggle
  const handleToggleTodo = async (id: string) => {
    try {
      const response = await api.markTodo(id);
      if (response.status === 200) {
        // Toggle the status of the todo
        setTodos((prevTodos: any) =>
          prevTodos.map((todo: any) =>
            todo._id === id
              ? {
                  ...todo,
                  status: todo.status === 'pending' ? 'completed' : 'pending',
                }
              : todo
          )
        );
      } else {
        console.error('Error toggling todo status:', response.error);
      }
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };
  //add todo
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const addTodo = async () => {
    if (!title || !description) {
      enqueueSnackbar('Missing required information', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
    try {
      const data = await api.addTodo({ title, description });
      if (data.status === 200) {
        setDescription('');
        setTitle('');
        enqueueSnackbar(data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        getAllTodos(filter);
      } else {
        enqueueSnackbar(data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error('Error add todo', error);
    }
  };

  //

  return (
    <Container component="main">
      <h2 className={classes.h2}>Todo App</h2>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <InputTodo
            title={title}
            handleTitleChange={handleTitleChange}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
            addTodo={addTodo}
            filter={filter}
            handleChangeSelect={handleChangeSelect}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListTodo
            todos={todos}
            handleToggleTodo={handleToggleTodo}
            handleDialogOpenDel={handleDialogOpenDel}
            handleDialogOpenEdit={handleDialogOpenEdit}
          />
        </Grid>
      </Grid>
      <DialogCustom
        isTextField={false}
        open={openDel}
        handleDialogClose={handleDialogCloseDel}
        title="Confirm Delete Todo"
        content={`Are you sure you want to delete the todo ${selectedTodo ? selectedTodo.title : ''}?`}
        handleChange={handleDeleteTodo}
      />
      <DialogCustom
        isTextField={true}
        open={openEdit}
        handleDialogClose={handleDialogCloseEdit}
        title="Confirm Edit Todo"
        content={`Are you sure you want to edit the todo ${selectedTodo ? selectedTodo.title : ''}?`}
        handleChange={handleEditTodo}
        editTodo={editTodo}
        changeEditTodo={handleEditTodoChange}
      />
    </Container>
  );
}

export default Todo;
