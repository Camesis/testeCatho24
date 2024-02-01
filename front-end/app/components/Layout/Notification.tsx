import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface NotificationProps {
  message: string | null;
  type: 'error' | 'success';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [open, setOpen] = useState(!!message);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={() => {
        onClose();
        setOpen(false);
      }}
    >
      <Alert elevation={6} variant="filled" severity={type === 'error' ? 'error' : 'success'}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
