/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
interface Props {
  open: boolean;
  handleDialogClose: Function;
  title: string;
  content: string;
  editTodo: string;
  handleChange: Function;
  changeEditTodo: Function;
  isTextField: boolean;
}
const DialogCustom = ({
  isTextField,
  open,
  handleDialogClose,
  title,
  content,
  handleChange,
  editTodo,
  changeEditTodo,
}: Props) => {
  return (
    <div>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '600px',
            position: 'absolute',
            top: '10%',
          },
        }}
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 style={{ textAlign: 'center' }} id="alert-dialog-title">
          {title}
        </h2>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
          {isTextField ? (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Todo Edit"
              type="text"
              fullWidth
              value={editTodo}
              onChange={changeEditTodo}
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus={true} onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus={true} onClick={handleChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogCustom;
