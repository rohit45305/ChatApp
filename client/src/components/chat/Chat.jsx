import React from 'react';
import { useEffect,useState} from 'react';
import { useContext } from 'react';
import { Box } from '@material-ui/core';

//compoents
import ChatHeader from './ChatHeader';
import Messages from './Messages';

import { UserContext } from '../../context/UserProvider';
import { AccountContext } from '../../context/AccountProvider'
import { getConversation } from '../../service/api';


const Chat = () => {
  const {person} = useContext(UserContext);
  const {account} = useContext(AccountContext);
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetail = async () =>{
      let data = await getConversation({sender:account.googleId,reciever:person.googleId});
      setConversation(data);
    }
    getConversationDetail();
  }, [person.googleId]);
  
  return <div>
    <Box>
      <ChatHeader />
      <Messages conversation={conversation} person={person}/>
    </Box>
  </div>;
};

export default Chat;
