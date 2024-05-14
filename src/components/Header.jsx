import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import CommonModal from './CommonModal';
import { useState } from 'react';

export default function Header({loginUser}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
   const handleClose = ()=> {
    setOpen(false)
   }
   
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{background:'black', colo:'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > 
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {loginUser ? 'YOUR ARE LOGIN':'PLEASE LOGIN FIRST'} - <span className='user'>{loginUser?.username}</span>
          </Typography>
          <Button color="inherit" onClick={()=>{
            if(loginUser){
             setOpen(true)
            } else{
              navigate('/')
            }
          }}>
            {loginUser ? 'LOGOUT': 'LOGIN'}
            </Button>
        </Toolbar>
        <CommonModal open={open} handleClose={handleClose} />
      </AppBar>
    </Box>
  );
}