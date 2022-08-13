import { Box,makeStyles, Typography } from '@material-ui/core';
import { useContext,useState,useEffect } from 'react';
import React from 'react';

import { AccountContext } from '../../context/AccountProvider';
import { getConversation, setConversation } from '../../service/api';
import { UserContext } from '../../context/UserProvider';
//import { useState } from 'react';

const useStyles = makeStyles({
    displayPicture:{
        height:50,
        width:50,
        borderRadius:'50%',
        padding:'0px 14px'

    },
    container:{
        display:'flex',
        height:40,
        padding:'13px 0',
        cursor:'pointer'
    },
    timestamp: {
        fontSize: 12,
        marginLeft: 'auto',
        color: '#00000099',
        marginRight: 20
    },
    text: {
        display: 'block',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14
    }
})

const Conversation = ({ user }) => {
    //const defaultimage = 'https://funkylife.in/wp-content/uploads/2021/06/whatsapp-dp-15.jpg'
    const classes = useStyles();

    const { account,newMessageFlag }= useContext(AccountContext);
    const { setPerson } = useContext(UserContext);

    const [message,setMessage] = useState({});

    useEffect(() => {
      const getConversationMessage = async () =>{
          const data = await getConversation({ sender: account.googleId, reciever: user.googleId});
          setMessage({ text: data.message, timestamp: data.updatedAt });
      }
      getConversationMessage()
    },[newMessageFlag])
    

    const setUser = async() => {
        setPerson(user);
        await setConversation({senderId:account.googleId,recieverId:user.googleId})
    }

  return <div>
      <Box className={classes.container} onClick={()=>setUser()}>
          <Box>
              <img src={user.imageUrl} alt="display-picture" className={classes.displayPicture} />
          </Box>
          <Box style={{width: '100%'}}>
            <Box style={{display:'flex'}}>
                <Typography>{user.name}</Typography>
                {
                    message.text && 
                    <Typography className={classes.timestamp}>
                        {new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}
                    </Typography>
                }
            </Box>
            <Box >
                <Typography className={classes.text}>{message.text}</Typography>
            </Box>
          </Box>
          
      </Box>
  </div>;
};

export default Conversation;
