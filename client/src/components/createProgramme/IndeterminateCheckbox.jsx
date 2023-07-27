import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const IndeterminateCheckbox = ({pLabel}) => {
  const [checked, setChecked] = React.useState([false, false, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2]]);
  };
  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Morning"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} 
        sx={{'&.Mui-checked': {color: "#AEAEFF"}}} 
    />}
      />
      <FormControlLabel
        label="Afternoon"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} 
        sx={{'&.Mui-checked': {color: "#AEAEFF"}}} 
        />}
      />
      <FormControlLabel
        label="Evening"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} 
        sx={{'&.Mui-checked': {color: "#AEAEFF"}}} 
        />}
      />
    </Box>

  );

  return (
    <div>
      <FormControlLabel
        label={pLabel}
        control={
          <Checkbox
            checked={checked[0] && checked[1] && checked[2]}
            indeterminate={!(checked[0] === checked[1] && checked[1] === checked[2])}
            onChange={handleChange1}
            sx={{
                '&.Mui-checked': {color: "#AEAEFF"}
            }}
          />
        }
      />
      {children}
    </div>
  );
}


export default IndeterminateCheckbox