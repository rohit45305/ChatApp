import { Box,makeStyles } from '@material-ui/core';
import {Chat} from '@material-ui/icons'
import {React,useContext,useState} from 'react';

import { AccountContext } from '../../context/AccountProvider';
import InfoDrawer from '../drawer/InfoDrawer';
import HeaderMenu from './HeaderMenu';


const useStyles = makeStyles({
    header:{
        display:'flex',
        height:35,
        background:'#ededed',
        padding: '10px 16px',
        alignItems:'center'
    },
    avatar:{
        height:37,
        width:37,
        borderRadius:'50%',
        marginTop:7
    },
    icons:{
        display:'flex',
        marginLeft: 'auto',
        '& > *':{
            marginLeft:2,
            padding:7,
            color:'#919191'
        }
    }
})

const Header = () => {
    const classes = useStyles();
    const defaultimage = 'https://w0.peakpx.com/wallpaper/323/431/HD-wallpaper-avatar-whatsapp-dp-creative-design-graphics-design-hero-hey-profile-pic-smartphone-whatsapp-dp-thumbnail.jpg'
    const [open, setOpen] = useState(false);
    const {account} = useContext(AccountContext);

    const toggleDrawer = () =>{
        setOpen(true);
    }

    return (<div>
    <Box className={classes.header}>
        <img src={defaultimage || account.imageUrl} alt="display" onClick={()=> toggleDrawer()} className={classes.avatar}/>
        <Box className={classes.icons}>
            <Chat style={{fontSize:20,marginRight:8,marginTop:5}}/>
            <HeaderMenu />
        </Box>
    </Box>
    <InfoDrawer open={open} setOpen={setOpen}/>
    </div>);
};

export default Header;
