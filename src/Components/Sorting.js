import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGlobalContext } from './contextWrappers/globalContextwrapper'
import { styled } from '@mui/material';

const SelectBox = styled(Box)`
  height: 80px;
  width: 200px;
  position: absolute;
  left: 1360px;
  border-radius: 30px;
`

export default function Sorting() {
  const { storeSort, setStoreSort} = useGlobalContext()
  const handleChange = (event) => {
    setStoreSort(event.target.value);
  };

  return (
    <SelectBox>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={storeSort}
          label="Sort By"
          onChange={e=>handleChange(e)}
        >
          <MenuItem value="name">Alphabetical</MenuItem>
          <MenuItem value="clicks">Popular</MenuItem>
          <MenuItem value="amount_type,cashback_amount">Cashback</MenuItem>
        </Select>
      </FormControl>
    </SelectBox>
  );
}