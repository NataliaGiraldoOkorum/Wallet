import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectContact({title, selected, setSelected, contacts }) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selected}
          onChange={(e) => setSelected(e.target.value) }
          input={<OutlinedInput label="Name" />}
        >
          {contacts.map((contact) => (
            <MenuItem
              key={contact._id}
              value={contact}
            >
              {contact.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}