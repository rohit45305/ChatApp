import { Box, Drawer, Typography } from '@material-ui/core';
import React from 'react';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Profile from './Profile';

const useStyle = makeStyles({
  header:{
    display:'flex',
    background:'#00bfa5',
    height:107,
    color:'#fff',
    '& > *':{
      marginTop:'auto',
      padding:15
    }
  },
  component:{
    background:'#ededed',
    height:'85%'
  }
})

const InfoDrawer = ({ open,setOpen }) => {
  const classes = useStyle();
  const handleClose = ()=>{
    setOpen(false)
  }

  return <div>
    <Drawer open={open} onClose={handleClose}>
      <Box className={classes.header}>
        <ArrowBack onClick={()=>handleClose()}/>
        <Typography>Profile</Typography>
      </Box>
      <Box className={classes.component}>
        <Profile />
      </Box>
    </Drawer>
  </div>;
};

export default InfoDrawer;
