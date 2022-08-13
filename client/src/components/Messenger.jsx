import React from 'react';
import { useContext } from 'react';
import {AppBar,Toolbar,makeStyles,Box} from '@material-ui/core'

//components
import Login from './account/Login';
import { AccountContext } from '../context/AccountProvider';
import ChatBox from './account/ChatBox';

const useStyles = makeStyles({
  component:{
    background:'#DCDCDC',
    height:'100vh'
  },
  loginHeader:{
    height:225,
    background: '#00bfa5',
    boxShadow:'none',
    overflow:'hidden'
  },
  header:{
    height:125,
    background: '#128C7E',
    boxShadow:'none',
    overflow:'hidden'
  }
})

const Messenger = () => {
  const classes = useStyles();
  const { account } = useContext(AccountContext)

  return <Box className={classes.component}>
      <AppBar className={ account ? classes.header : classes.loginHeader}>
        <Toolbar>

        </Toolbar>
      </AppBar>
      { account ? <ChatBox /> : <Login />}
  </Box>;
};

export default Messenger;
