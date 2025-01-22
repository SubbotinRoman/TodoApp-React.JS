/**
 * Корневой компонент Todo приложения (App.tsx)
 * 
 * Назначение:
 * - Объединяет все компоненты в единое приложение
 * - Настраивает общее оформление и тему
 * - Подключает глобальные зависимости (Redux, Material-UI)
 * 
 * Компоненты:
 * - TodoInput: форма добавления задач
 * - TodoList: список всех задач
 * - TodoFilter: фильтрация задач
 * 
 * Особенности:
 * - Использует Material-UI для стильного интерфейса
 * - Подключает Redux для управления данными
 * - Обеспечивает адаптивную вёрстку
 */

// Подключаем нужные инструменты
import { useState } from 'react';                    // Для хранения данных, которые могут меняться
import {
  CssBaseline,                                     // Сброс стандартных стилей браузера
  ThemeProvider,                                   // Передает настройки темы всем компонентам
  createTheme,                                     // Создает тему с нашими настройками
  Box,                                             // Простой контейнер для группировки элементов
  Typography,                                      // Компонент для отображения текста
  Paper,                                           // Контейнер с белым фоном и тенью
} from '@mui/material';                            // Готовые компоненты для красивого интерфейса
import { Provider } from 'react-redux';            // Для работы с общим хранилищем данных
import { store } from './store';                   // Наше хранилище данных
import TodoList from './components/TodoList';      // Компонент, который показывает список задач
import TodoInput from './components/TodoInput';    // Поле для добавления новых задач
import TodoFilter from './components/TodoFilter';  // Кнопки для фильтрации задач

// Настраиваем внешний вид приложения
const theme = createTheme({
  // Основные цвета приложения
  palette: {
    mode: 'light',                                  // Светлая тема оформления
    primary: {
      main: '#2196f3',                             // Основной синий цвет
      light: '#64b5f6',                            // Светло-синий для hover эффектов
      dark: '#1976d2',                             // Тёмно-синий для нажатий
    },
    secondary: {
      main: '#f50057',                             // Дополнительный розовый цвет
      light: '#ff4081',                            // Светло-розовый
      dark: '#c51162',                             // Тёмно-розовый
    },
    background: {
      default: '#f5f5f5',                          // Цвет фона страницы
      paper: '#ffffff',                            // Цвет фона карточек
    },
  },
  // Настройки текста
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",   // Шрифты, которые будут использоваться
    h4: {
      fontWeight: 500,                             // Делаем заголовки чуть жирнее
      letterSpacing: '0.02em',                     // Небольшой отступ между буквами
    },
  },
  // Настройки отдельных компонентов
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',                    // Убираем фоновую картинку у карточек
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', // Добавляем красивую тень
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2196f3',              // Синяя рамка при наведении на поле ввода
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',                   // Оставляем текст на кнопках как есть
          borderRadius: 8,                         // Скругляем углы у кнопок
        },
      },
    },
  },
});

// Возможные варианты фильтрации задач
type FilterType = 'all' | 'active' | 'completed'    // Все задачи, только активные или выполненные

function App() {
  // Запоминаем, какой фильтр сейчас выбран
  const [filter, setFilter] = useState<FilterType>('all');

  // Основная структура приложения:
  // 1. Provider - хранит все задачи в одном месте, чтобы их можно было добавлять, удалять 
  //    и отмечать как выполненные из любого компонента приложения
  // 2. ThemeProvider - передает настройки внешнего вида всем компонентам
  // 3. CssBaseline - убирает различия в стилях между разными браузерами
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Главный контейнер приложения - занимает весь экран и центрирует содержимое */}
        <Box
          sx={{
            width: '100vw',                         // Растягиваем на всю ширину экрана
            height: '100vh',                        // Растягиваем на всю высоту экрана
            display: 'flex',                        // Включаем гибкую разметку
            alignItems: 'center',                   // Центрируем по вертикали
            justifyContent: 'center',               // Центрируем по горизонтали
            bgcolor: 'background.default',          // Цвет фона из темы
            p: 3,                                   // Отступы по краям
          }}>
          {/* Белая карточка с тенью - основной контейнер для списка задач */}
          {/* Внутри неё находятся заголовок, поле ввода, кнопки фильтров и сам список */}
          <Paper
            elevation={0}
            sx={{
              width: '100%',                        // Занимаем всю доступную ширину
              maxWidth: '500px',                    // Но не шире 500 пикселей
              height: '550px',                      // Фиксированная высота карточки
              display: 'flex',                      // Гибкая разметка
              flexDirection: 'column',              // Элементы друг под другом
              p: 4,                                 // Отступы внутри карточки
              borderRadius: 3,                      // Скругление углов
              background: 'rgba(255, 255, 255, 0.95)', // Полупрозрачный белый фон
              backdropFilter: 'blur(10px)',         // Размытие заднего фона
              border: '1px solid rgba(255, 255, 255, 0.3)', // Тонкая белая рамка
            }}>
            {/* Заголовок приложения - красивый текст с градиентной раскраской */}
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                mb: 4,                              // Отступ снизу
                background: 'linear-gradient(45deg, #2196f3, #f50057)', // Градиент для текста
                backgroundClip: 'text',             // Применяем градиент только к тексту
                textFillColor: 'transparent',       // Делаем сам текст прозрачным
                WebkitBackgroundClip: 'text',       // Для поддержки Safari
                WebkitTextFillColor: 'transparent', // Для поддержки Safari
              }}>
              {/* Ниже это заголовок приложения  */}
              Список задач  
            </Typography>
            <TodoInput />                           {/* Поле для ввода новых задач */}
            <TodoFilter filter={filter} setFilter={setFilter} /> {/* Кнопки фильтрации */}
            <Box
              sx={{
                flex: 1,                            // Занимаем всё оставшееся место
                minHeight: 0,                       // Чтобы список не выходил за границы
                overflow: 'hidden',                 // Прячем то, что не помещается
              }}>
              <TodoList filter={filter} />          {/* Сам список задач */}
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
