import { MoreVert } from '@material-ui/icons';
import {Menu,MenuItem,makeStyles} from '@material-ui/core'
import {React,useState,useContext} from 'react';
import { GoogleLogout } from 'react-google-login';
import {clientId } from '../../constants/data.js';

import { AccountContext } from '../../context/AccountProvider';
import InfoDrawer from '../drawer/InfoDrawer';

const useStyles = makeStyles({
    menuitem:{
        fontSize:14,
        padding:'15px 60px 5px 24px',
        color:'#4A4A4A'
    },
    logout:{
        border:'none!important',
        boxShadow:'none!important',
        '& > *':{
            padding:'0px!important'
        }
    }
})



const HeaderMenu = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const {setAccount} =  useContext(AccountContext)

    const handleClose = ()=>{
        setOpen(false);
    }
    const handleClick = (event)=>{
        setOpen(event.currentTarget)
    }
    const onLogoutSuccess=()=>{
        alert('You have been Logged out succesfully');
        console.clear();
        setAccount('');
    }
    const toggleDrawer = () =>{
        setOpenDrawer(true);
    }



    return (
        
    <div>
        <MoreVert onClick={handleClick}/>
        <Menu
            anchorEl={open}
            keepMounted
            open={Boolean(open)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            
        >
            <MenuItem className={classes.menuitem} onClick={()=>{ handleClose();toggleDrawer() }}>Profile</MenuItem>
            <MenuItem className={classes.menuitem} onClick={handleClose}>New Group</MenuItem>
            <MenuItem className={classes.menuitem} onClick={handleClose}>Starred Messeges</MenuItem>
            <MenuItem className={classes.menuitem} onClick={handleClose}>Settings</MenuItem>
            <MenuItem className={classes.menuitem} onClick={handleClose}>
                <GoogleLogout
                    className={classes.logout}
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                >
                </GoogleLogout>
            </MenuItem>
        </Menu>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
    </div>
    );
};

export default HeaderMenu;
