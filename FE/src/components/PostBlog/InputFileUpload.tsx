import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ handleFileChange, file }: any) {
  return (
    <span>
      <Button
        component="label"
        sx={{ maxWidth: '160px', paddingInline: 1.5 }}
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        {/* Đặt onChange handler và value cho input */}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          // Thêm thuộc tính accept để chỉ cho phép các định dạng ảnh
          accept="image/*"
        />
      </Button>
      &nbsp;{file ? file.name : undefined}
    </span>
  );
}
