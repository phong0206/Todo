/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as api from '../../apis/api';


interface Props {
  value: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  repo: Array<any>;
  nameSelect: string;
  displayField: string; // Tên field để hiển thị
  valueField: string; // Tên field để giá trị value của MenuItem
}

export default function BasicSelect({
  value,
  handleChange,
  repo,
  nameSelect,
  displayField,
  valueField,
}: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{nameSelect}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={nameSelect}
          onChange={handleChange}
        >
          {repo.map((item) => (
            <MenuItem key={item[valueField]} value={item[valueField]}>
              {item[displayField]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}