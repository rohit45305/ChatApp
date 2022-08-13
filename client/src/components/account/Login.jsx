
import React from 'react';
import { Dialog,withStyles,Box,Typography,makeStyles, List, ListItem } from '@material-ui/core';
import { GoogleLogin }  from 'react-google-login'
import { useContext } from 'react';
import {clientId} from '../../constants/data.js'

import { AccountContext } from '../../context/AccountProvider';
import { addUser } from '../../service/api.js';

const style = {
    diologPaper:{
        height:'95%',
        width:'60%',
        marginTop:'12%',
        boxShadow: 'none',
        borderRadius:0,
        maxHeight:'100%',
        maxWidth:'100%',
        overflow:'hidden'
    }
}
const useStyles = makeStyles({
    component:{
        display:'flex'
    },
    leftComponent:{
        padding:'56px 0 56px 56px'
    },
    qrcode:{
        height:274,
        width:274,
        padding:'56px 0 0 100px'
    }
    ,title:{
        fontSize:26,
        marginBottom:25,
        color:'#525252',
        fontFamily: 'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
        fontWeight:300
    },
    list:{
        '& > *':{
            fontSize:18,
            padding:0,
            marginTop:15,
            lineHeight:'28px',
            color:'#4a4a4a'
        }
    }
  })

const Login = ({classes}) => {
    const classname = useStyles();
    const qrurl = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';
    //const clientId = '98444466701-0il27cea34nr7plcr473gc21076jkevd.apps.googleusercontent.com';

    const { account,setAccount } = useContext(AccountContext)

    const onLoginSuccess= async (res)=>{
        //console.log(res);
        console.log('Login Success',res.profileObj);
        setAccount(res.profileObj);
        await addUser(res.profileObj);
    }
    const onLoginFailure=()=>{
        console.log('Login Failure');
    }

    return <div>
        <Dialog open={true} classes={{paper:classes.diologPaper}}
            BackdropProps={{style:{backgroundColor:'unset'}}}
        >
            <Box className={classname.component}>
                <Box className={classname.leftComponent}>
                    <Typography className={classname.title}>To use Whatsapp on your computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Open Whatsapp on your phone</ListItem>
                        <ListItem>2. Tap Menu or Settings and select Linked Devices</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </List>
                </Box>
                <Box style={{position:'relative'}}>
                    <img src={qrurl} alt="qr" className={classname.qrcode} />
                    <Box style={{position:'absolute',left:'50%',top:'50%'}}>
                        <GoogleLogin 
                            clientId={clientId}
                            buttonText=""
                            isSignedIn={true}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    </div>;
};

export default withStyles(style)(Login);
