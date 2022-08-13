import { useEffect,useState,useContext } from "react";
import React from 'react';
import {Box} from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import {getUsers} from '../../service/api.js'

import { AccountContext } from '../../context/AccountProvider';
//components
import Conversation from "./Conversation.jsx";


const useStyles = makeStyles({
    component:{
      height:'81vh',
      overflow:'overlay'
    }
})

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const {account,socket,setActiveUsers} = useContext(AccountContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () =>{
      const data = await getUsers();
      const filterData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
      setUsers(filterData)
    }
    fetchData();
  }, [text]);
  useEffect(()=>{
    socket.current.emit('addUser',account.googleId);
    socket.current.on('getUsers',users=>{
      setActiveUsers(users);
    })
  },[account]);

  return <div>
      <Box className={classes.component}>
        {
            users.map(user => (
              user.googleId !== account.googleId &&
              <Conversation user={user}/>
            ))
        }
      </Box>
  </div>;
};

export default Conversations;
