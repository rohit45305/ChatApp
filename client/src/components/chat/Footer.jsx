import React from 'react';
import { Box, InputBase, makeStyles } from '@material-ui/core';
import { AttachFile, EmojiEmotionsOutlined, Mic } from '@material-ui/icons';



const useStyles = makeStyles((theme)=>({
  footer:{
    height:'65px',
    backgroundColor:'#ededed',
    width:'100%',
    display:'flex',
    alignItems:'center',
    padding:'0 18px',
    '& > *':{
      margin:'5px',
      color:'#919191'
    }
  },
  searchBox:{
    backgroundColor:'#FFFFFF',
    borderRadius:18,
    width: 'calc(94% - 100px)'
  },
  inputRoot: {
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 25,
    fontSize: 14,
    height: 20,
    width: '100%'
  },
  clipIcon:{
    transform: 'rotate(40deg)'
  }
}))


const Footer = ({sendText,setValue,value}) => {
  const classes = useStyles();
  return <div>
    <Box className={classes.footer}>
      <EmojiEmotionsOutlined />
      <AttachFile className={classes.clipIcon}/>
      <Box className={classes.searchBox}>
        <InputBase 
            placeholder="Type a message"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }} 
            onKeyPress={(e)=>sendText(e)}
            onChange={(e)=>setValue(e.target.value)}
            value={value}
        />
      </Box>
      <Mic />
    </Box>
    
  </div>;
};

export default Footer;
