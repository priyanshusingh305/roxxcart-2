import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 4,
  '@media (max-width: 600px)': {
    width: '90%', // Adjust width for small screens
  },
};

export default function AuthModal({handleClose,open}) {
  const location=useLocation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === '/login'? <LoginForm/> : <RegisterForm/>}

        </Box>
      </Modal>
    </div>
  );
}
