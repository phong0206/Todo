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
} from '@mui/material';
interface Props {
  open: boolean;
  handleDialogClose: Function;
  title: string;
  content: string;
  handleDelete: Function;
}
const DialogCustom = ({
  open,
  handleDialogClose,
  title,
  content,
  handleDelete,
}: Props) => {
  return (
    <div>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '600px', // Nếu bạn muốn loại bỏ giới hạn chiều rộng mặc định
            position: 'absolute', // Đặt dialog ở vị trí cố định
            top: '10%', // Vị trí từ đỉnh màn hình
          },
        }}
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2>{title}</h2>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this {content}? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogCustom;
