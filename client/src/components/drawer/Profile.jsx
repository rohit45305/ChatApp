import { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

//components
import { AccountContext } from '../../context/AccountProvider';



const useStyles = makeStyles({
    imageContainer:{
        display:'flex',
        justifyContent:'center',

    },
    displayPictures:{
        width:200,
        height:200,
        borderRadius:'50%',
        padding:'18px 0'

    },
    nameContainer:{
        background:'#ffffff',
        padding:'12px 30px 2px',
        boxShadow:'0 1px 3px rgba(0,0,0,0.08)',
        '& :first-child':{
            fontSize:14,
            color:'#009688'
        },
        '& :last-child':{
            color:'#4A4A4A',
            margin:'15px 0'
        }
    },
    decription:{
        padding:'12px 20px 28px 30px',
        '& > *':{
            fontSize:13,
            color:'rgba(0,0,0,0.45)'
        }
    }
})

const Profile = () => {
    const {account} = useContext(AccountContext);
    const defaultimage = 'https://w0.peakpx.com/wallpaper/323/431/HD-wallpaper-avatar-whatsapp-dp-creative-design-graphics-design-hero-hey-profile-pic-smartphone-whatsapp-dp-thumbnail.jpg'
    const classes = useStyles();
  return <div>
      <Box className={classes.imageContainer}>
        <img src={account.imageURL?account.imageURL:defaultimage} alt="dp" className={classes.displayPictures} />
      </Box>
      <Box className={classes.nameContainer}>
          <Typography>Your name</Typography>
          <Typography>{account.name}</Typography>
      </Box>
      <Box className={classes.decription}>
        <Typography>This is not your username or pin. This name will be visible to your WhatsApp contacts.</Typography>
      </Box>
      <Box className={classes.nameContainer}>
          <Typography>About</Typography>
          <Typography>Hey there! I am using WhatsApp.</Typography>
      </Box>
  </div>;
};

export default Profile;
