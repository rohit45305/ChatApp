import { React,useState,useContext,useEffect,useRef } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Footer from './Footer';

import { AccountContext } from '../../context/AccountProvider';
import { newMessage,getMessages } from '../../service/api';
import Message from './Message';


const useStyles = makeStyles({
  wrapper:{
    backgroundImage:`url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
    backgroundSize:'50%'
  },
  component:{
    height:'79vh',
    overflow:'scroll'
  },
  container:{
    padding:'1px 80px'
  }
})

const Messages = ({ person,conversation }) => {
  const classes = useStyles();

  const {account,socket,newMessageFlag,setNewMessageFlag} = useContext(AccountContext);
  const [value, setValue] = useState();
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef()

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setIncomingMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  },[])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ transition:'smooth'})
  })

  useEffect(()=>{
    incomingMessage && conversation?.members?.includes(incomingMessage.sender) &&
      setMessages(prev => [...prev,incomingMessage])

  }, [incomingMessage, conversation])

  useEffect(() => {
    const getMessageDetails = async()=>{
      let response = await getMessages(conversation._id);
      console.log(response.data);
      setMessages(response.data);
    }
    getMessageDetails();
  }, [conversation?._id,person._id,newMessageFlag]);
  

  const receiverId = conversation?.members?.find(member => member !== account.googleId);

  const sendText = async (e)=>{
    let code = e.keycode||e.which
    if(!value){
      return ;
    }
    if(code === 13){
      let message = {
        sender:account.googleId,
        conversationId:conversation._id,
        text:value
      }

      socket.current.emit('sendMessage',{
        senderId:account.googleId,
        receiverId,
        text:value
      })

      await newMessage(message);
      setValue('');
      setNewMessageFlag(prev => !prev);
    }
  }
  return <div>
    <Box className={classes.wrapper}>
      <Box className={classes.component}>
        {
          messages && messages.map(message =>(
            <Box className={classes.container} ref={scrollRef}>
              <Message message={message}/>
            </Box>
          ))
        }
      </Box>
      <Footer sendText={sendText} setValue={setValue} value={value}/>
    </Box>
  </div>;
};

export default Messages;
