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
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '8px !important',
              px: 3,
              py: 1,
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                borderColor: 'primary.main',
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
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
