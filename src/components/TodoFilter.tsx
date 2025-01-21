import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, value) => value && setFilter(value)}
          aria-label="фильтр задач"
          sx={{
            gap: 1,
            '& .MuiToggleButton-root': {
              border: 'none',
              outline: 'none',
              borderRadius: '8px !important',
              px: 'clamp(1rem, 3vw, 2rem)',
              py: 'clamp(0.5rem, 1.5vw, 1rem)',
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: 500,
              minWidth: 'clamp(80px, 20vw, 120px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                boxShadow: '0px 0px 0px 2px rgba(33, 150, 243, 0.2)',
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              '&:focus': {
                outline: 'none',
              },
              '&.Mui-focusVisible': {
                outline: 'none',
              },
            },
          }}
        >
          <ToggleButton value="all">
            Все
          </ToggleButton>
          <ToggleButton value="active">
            Активные
          </ToggleButton>
          <ToggleButton value="completed">
            Выполненные
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </motion.div>
  );
};

export default TodoFilter;
