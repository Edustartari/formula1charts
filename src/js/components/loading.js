import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = (props) => {
  return (
    <Backdrop open={props.open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}