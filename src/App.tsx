import { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Paper } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';

// Создаем тему с улучшенным дизайном
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2196f3',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: '500px',
              height: '550px', // Фиксированная высота
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                mb: 4,
                background: 'linear-gradient(45deg, #2196f3, #f50057)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Список задач
            </Typography>
            <TodoInput />
            <TodoFilter filter={filter} setFilter={setFilter} />
            <Box 
              sx={{ 
                flex: 1,
                minHeight: 0, // Важно для корректной работы flex-контейнера
                overflow: 'hidden' // Предотвращаем прокрутку всего контейнера
              }}
            >
              <TodoList filter={filter} />
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
