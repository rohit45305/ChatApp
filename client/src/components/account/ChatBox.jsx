import {React,useContext }from 'react';
import { withStyles,Dialog, Box,makeStyles } from '@material-ui/core';
import Menu from '../menu/Menu';
import Chat from '../chat/Chat';

import { UserContext } from '../../context/UserProvider';
import { EmptyChat } from '../chat/EmptyChat';

const style = {
  diologPaper:{
      height:'95%',
      width:'90%',
      boxShadow: 'none',
      borderRadius:0,
      maxHeight:'100%',
      maxWidth:'100%',
      overflow:'hidden'
  }
}
const useStyles = makeStyles({
  components:{
    display:'flex'
  },
  leftComponent:{
    minWidth:390
  },
  rightComponent:{
    borderLeft:`1px solid rgba(0,0,0,0.14)`,
    width:'72%',
    minWidth:300,
    height:'100%'
  }
})

const ChatBox = ({classes}) => {
  const classname = useStyles();
  const {person} = useContext(UserContext)
  return (
    <Dialog open={true} classes={{paper:classes.diologPaper}} BackdropProps={{style:{backgroundColor:'unset'}}} >
      <Box className={classname.components}>
        <Box className={classname.leftComponent}>
          <Menu />
        </Box>
        <Box className={classname.rightComponent}>
          {
            Object.keys(person).length?<Chat />:<EmptyChat />
          }
          
        </Box>
      </Box>
    </Dialog>  
  );
};

export default withStyles(style)(ChatBox);
