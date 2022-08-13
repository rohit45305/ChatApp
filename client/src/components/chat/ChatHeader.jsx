import { Box, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Search, MoreVert } from '@material-ui/icons';
import { useContext } from 'react';

import { UserContext } from '../../context/UserProvider';
import { AccountContext } from '../../context/AccountProvider';
//import { AccountContext } from '../../context/AccountProvider';

const useStyles = makeStyles({
    header:{
        display:'flex',
        height:35,
        background:'#ededed',
        padding:'10px 10px',
        alignItems:'center'
    },
    displayPicture:{
        height:37,
        width:37,
        borderRadius:'50%',
        padding:'0px 7px'

    },
    name:{
        marginLeft:11,
        marginTop:12
    },
    status:{
        fontSize:12,
        marginLeft:10,
        color:'rgb(0,0,0,0.6)'

    },
    rightComponent:{
        marginLeft:'auto',
        '& > *':{
            padding:8,
            fontSize:24,
            // color:'#919191'
        }
    }
})

const ChatHeader = () => {
    const { person } = useContext(UserContext);
    //console.log(person);
    const classes = useStyles();

    const {activeUsers} = useContext(AccountContext)


  return <div>
      <Box className={classes.header}>
        <img src={person.imageUrl} alt="dp" className={classes.displayPicture} />
        <Box>
            <Typography className={classes.name}>{person.name}</Typography>
            <Typography className={classes.status}>
                {activeUsers?.find(user => user.userId === person.googleId)?'Online':'Offline'}
            </Typography>
        </Box>
        <Box className={classes.rightComponent}>
            <Search />
            <MoreVert />
        </Box>
      </Box>
  </div>;
};

export default ChatHeader;
