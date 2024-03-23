/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { ChangeEventHandler } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles, createStyles } from '@mui/styles';
const useStyles = makeStyles((theme: any) => createStyles({}));
interface Props {
  todos: Array<any>;
  handleToggleTodo: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleDialogOpenDel: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  handleDialogOpenEdit: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
}
const ListTodo = ({
  todos,
  handleToggleTodo,
  handleDialogOpenDel,
  handleDialogOpenEdit,
}: Props) => {
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
        {todos.map(
          (todo: {
            title: string;
            description: string;
            _id: string;
            status: string;
          }) => (
            <ListItem key={todo._id}>
              <ListItemText
                primary={todo.title}
                secondary={todo.description}
                primaryTypographyProps={{
                  style: {  fontWeight: 'bold' },
                }}
                secondaryTypographyProps={{
                  style: { fontSize: '16px', color: 'green' },
                }}
                style={{
                  textDecoration:
                    todo.status === 'completed' ? 'line-through' : 'none',
                }}
              />
              <Checkbox
                checked={todo.status === 'completed'}
                onChange={() => handleToggleTodo(todo._id)}
              />
              <IconButton
                size="small"
                onClick={() => handleDialogOpenDel(todo._id)}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                size="small"
                onClick={() => handleDialogOpenEdit(todo._id)}
              >
                <EditIcon />
              </IconButton>
            </ListItem>
          )
        )}
      </List>
    </>
  );
};

export default ListTodo;
