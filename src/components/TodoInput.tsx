import { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store';
import { motion } from 'framer-motion';

const TodoInput = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input.trim()));
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 1,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Что нужно сделать?"
          variant="outlined"
          size="medium"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '& fieldset': {
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                '& fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
              },
              '&.Mui-focused': {
                backgroundColor: '#fff',
                '& fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
              },
            },
          }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <IconButton
            type="submit"
            color="primary"
            disabled={!input.trim()}
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              '&:disabled': {
                bgcolor: 'rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.26)',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default TodoInput;
