import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'10px'
};

export default function CommonModal({handleClose, open}) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography className='modal_title' id="modal-modal-title" variant="h6" component="h2"> Are you Attempting to log out of keyur Mulani's website ? 
        </Typography> 
        <Typography className='modal_description' id="modal-modal-description" sx={{ mt: 2 }}> Are You Sure ? </Typography>
        <Box className='parent_box'>
        <Button variant="contained" className='cancel' onClick={()=>{
            handleClose()
        }}>Cancel</Button>
        <Button variant="contained" className='logout' onClick={()=> {
             localStorage.removeItem('authUser')
             handleClose()
             navigate('/')
        }}> logout </Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}