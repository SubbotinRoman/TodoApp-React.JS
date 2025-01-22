/**
 * Компонент отображения и управления списком задач TodoList
 * 
 * Назначение:
 * - Показывает все добавленные задачи в виде списка
 * - Позволяет управлять каждой задачей
 * - Отвечает за основную функциональность приложения
 * 
 * Возможности:
 * - Отметка задач как выполненных/активных
 * - Редактирование текста задач
 * - Удаление отдельных задач
 * - Удаление всех или только выполненных задач
 * 
 * Особенности:
 * - Анимации при добавлении/удалении задач
 * - Адаптивный дизайн для разных экранов
 * - Сортировка (активные задачи сверху)
 * - Фильтрация по статусу (все/активные/выполненные)
 */

import { useSelector, useDispatch } from 'react-redux';              // useSelector - получение задач из store, useDispatch - отправка действий (удаление, изменение задач)
import {
  List,                                                             // Контейнер для списка задач
  ListItem,                                                         // Элемент списка (одна задача)
  ListItemText,                                                     // Текст задачи
  IconButton,                                                       // Кнопка с иконкой
  Checkbox,                                                         // Чекбокс для отметки выполнения
  Paper,                                                            // Белая карточка для списка
  Box,                                                              // Контейнер для компоновки
  Typography,                                                       // Стилизованный текст
  Tooltip,                                                          // Всплывающие подсказки
  TextField,                                                        // Поле для редактирования
} from '@mui/material';                                             // Компоненты интерфейса
import {
  Delete as DeleteIcon,                                            // Иконка удаления задачи
  DeleteSweep as DeleteSweepIcon,                                  // Иконка удаления выполненных
  DeleteForever as DeleteForeverIcon,                              // Иконка удаления всех задач
  Edit as EditIcon,                                                // Иконка редактирования
  Check as CheckIcon,                                              // Иконка подтверждения
  Close as CloseIcon,                                              // Иконка отмены
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';           // Библиотека для анимаций
import {
  RootState,
  toggleTodo,                                                      // Переключение статуса задачи
  removeTodo,                                                      // Удаление задачи
  clearCompleted,                                                  // Удаление выполненных задач
  clearAll,                                                        // Удаление всех задач
  editTodo,                                                        // Редактирование задачи
  Todo,                                                            // Тип задачи
} from '../store';
import { useState } from 'react';                                  // Хук React для хранения временных данных (ID редактируемой задачи, текст при редактировании)

interface TodoListProps {
  filter: 'all' | 'active' | 'completed';                         // Текущий фильтр задач
}

const TodoList: React.FC<TodoListProps> = ({ filter }) => {
  const dispatch = useDispatch();                                 // Функция для отправки действий
  const todos = useSelector((state: RootState) => state.todos.todos); // Получаем список задач
  const [editingId, setEditingId] = useState<number | null>(null); // ID редактируемой задачи
  const [editText, setEditText] = useState('');                   // Текст при редактировании

  const handleStartEdit = (todo: Todo) => {                       // Начало редактирования
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {                                  // Сохранение изменений
    if (editingId && editText.trim()) {
      dispatch(editTodo({ id: editingId, text: editText.trim() }));
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {                                // Отмена редактирования
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos
    .filter((todo) => {                                          // Фильтрация задач
      if (filter === 'active') return !todo.completed;           // Только активные
      if (filter === 'completed') return todo.completed;         // Только выполненные
      return true;                                               // Все задачи
    })
    .sort((a, b) => {                                           // Сортировка: активные сверху
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return 0;
    });

  const listItemVariants = {                                    // Настройки анимации элементов списка
    hidden: { opacity: 0, x: -20 },                             // Начальное состояние
    visible: { opacity: 1, x: 0 },                              // Видимое состояние
    exit: { opacity: 0, x: 20 },                                // Состояние при удалении
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed); // Проверка наличия выполненных задач

  if (filteredTodos.length === 0) {
    return (
      <Box
        sx={{
          height: '100%',                                        // На всю высоту контейнера
          display: 'flex',                                       // Флекс для центрирования
          alignItems: 'center',                                  // Центрируем по вертикали
          justifyContent: 'center',                              // Центрируем по горизонтали
        }}>
        <Typography
          color="text.secondary"
          sx={{
            opacity: 0.7,                                        // Полупрозрачный текст
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',            // Адаптивный размер шрифта
          }}>
          {filter === 'all'                                      // Выбор текста в зависимости от фильтра
            ? 'Нет задач'
            : filter === 'active'
            ? 'Нет активных задач'
            : 'Нет выполненных задач'}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}                                            // Без тени
      sx={{
        height: '100%',                                        // На всю высоту
        bgcolor: 'background.paper',                           // Цвет фона из темы
        borderRadius: 2,                                       // Скругление углов
        overflow: 'hidden',                                    // Скрываем выступающий контент
        display: 'flex',                                       // Флекс-контейнер
        flexDirection: 'column',                               // Элементы друг под другом
        width: '100%',                                         // На всю ширину
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',           // Адаптивный размер заголовка
            fontWeight: 500,                                   // Полужирный шрифт
          }}>
          {filter === 'all' && 'Все задачи'}                   
          {filter === 'active' && 'Активные задачи'}
          {filter === 'completed' && 'Выполненные задачи'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>                 
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> 
            <Tooltip title="Удалить выполненные задачи">       
              <IconButton
                onClick={() => dispatch(clearCompleted())}      // Удаляем выполненные задачи
                sx={{
                  position: 'relative',
                  color: 'error.light',                         // Красный цвет кнопки
                  '&::before': {                                // Эффект при наведении
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0)',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    transition: 'all 0.2s ease-in-out',
                    bgcolor: 'error.light',
                    opacity: 0,
                    zIndex: -1,
                  },
                  '&:hover': {                                  // Стили при наведении
                    color: 'error.main',
                    '&::before': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      opacity: 0.1,
                    },
                  },
                  border: 'none',
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&.Mui-focusVisible': {
                    outline: 'none',
                  },
                }}>
                <DeleteSweepIcon />                             
              </IconButton>
            </Tooltip>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> 
            <Tooltip title="Удалить все задачи">               
              <IconButton
                onClick={() => dispatch(clearAll())}            // Удаляем все задачи
                sx={{
                  position: 'relative',
                  color: 'error.main',                          // Тёмно-красный цвет
                  '&::before': {                                // Эффект при наведении
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0)',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    transition: 'all 0.2s ease-in-out',
                    bgcolor: 'error.main',
                    opacity: 0,
                    zIndex: -1,
                  },
                  '&:hover': {
                    color: 'error.dark',
                    '&::before': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      opacity: 0.1,
                    },
                  },
                  border: 'none',
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&.Mui-focusVisible': {
                    outline: 'none',
                  },
                }}>
                <DeleteForeverIcon />                           
              </IconButton>
            </Tooltip>
          </motion.div>
        </Box>
      </Box>
      <List
        sx={{
          p: 0,                                                // Убираем отступы
          overflowY: 'auto',                                   // Добавляем прокрутку по вертикали
          overflowX: 'hidden',                                 // Скрываем горизонтальную прокрутку
          flex: 1,                                             // Растягиваем на оставшееся место
          width: '100%',                                       // На всю ширину
          '&::-webkit-scrollbar': {                            // Стилизуем полосу прокрутки
            width: '6px',                                      // Ширина полосы
          },
          '&::-webkit-scrollbar-track': {                     // Стиль фона полосы
            background: 'rgba(0, 0, 0, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {                     // Стиль ползунка прокрутки
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.15)',
            },
          },
        }}>
        <AnimatePresence mode="popLayout">                     
          {filteredTodos.map((todo: Todo, index: number) => (  // Отрисовка каждой задачи
            <motion.div                                        // Анимированный контейнер задачи
              key={todo.id}
              variants={listItemVariants}                      // Настройки анимации
              initial="hidden"                                 // Начальное состояние
              animate="visible"                                // Анимация появления
              exit="exit"                                      // Анимация удаления
              transition={{                                    // Настройки перехода
                duration: 0.2,                                 // Длительность анимации
                delay: index * 0.05,                           // Задержка для эффекта каскада
                ease: 'easeInOut',                             // Тип анимации
              }}
              layout                                          // Автоматическая анимация положения
              style={{
                width: '100%',
                position: 'relative',
              }}>
              <ListItem                                       // Элемент списка задач
                sx={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)', // Разделитель между задачами
                  '&:last-child': {
                    borderBottom: 'none',                     // Убираем разделитель у последней задачи
                  },
                  transition: 'all 0.2s ease-in-out',         // Плавное изменение
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)',           // Фон при наведении
                  },
                  py: 'clamp(0.5rem, 2vw, 1rem)',             // Адаптивные отступы
                  px: 'clamp(1rem, 3vw, 2rem)',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 'clamp(24px, 5vw, 34px)',          // Адаптивный размер чекбокса
                    height: 'clamp(24px, 5vw, 34px)',
                    mt: '2px',
                  }}>
                  <Checkbox                                    // Чекбокс для отметки выполнения
                    edge="start"
                    checked={todo.completed}                   // Статус выполнения
                    onChange={() => dispatch(toggleTodo(todo.id))} // Переключение статуса
                    sx={{
                      padding: 0,
                      width: '100%',
                      height: '100%',
                      color: 'primary.light',                  // Цвет невыполненной задачи
                      position: 'relative',
                      zIndex: 1,
                      '&.Mui-checked': {
                        color: 'primary.main',                 // Цвет выполненной задачи
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', // Адаптивный размер иконки
                      },
                      '&::before': {                           // Эффект при наведении
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(0)',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        transition: 'all 0.2s ease-in-out',
                        bgcolor: (theme) =>
                          todo.completed ? theme.palette.primary.main : theme.palette.primary.light,
                        opacity: 0,
                        zIndex: -1,
                      },
                      '&:hover': {
                        '&::before': {
                          transform: 'translate(-50%, -50%) scale(1)',
                          opacity: 0.1,
                        },
                      },
                    }}
                  />
                </Box>
                <ListItemText
                  primary={
                    editingId === todo.id ? (                    // Если задача редактируется
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}         // Анимация появления поля ввода
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}>
                        <TextField                               // Поле для редактирования задачи
                          fullWidth
                          value={editText}                       // Текущий текст задачи
                          onChange={(e) => setEditText(e.target.value)} // Обновление при вводе
                          autoFocus                              // Автофокус при открытии
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {       // Стили поля ввода
                              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // Адаптивный размер текста
                              height: 'clamp(32px, 6vw, 40px)', // Адаптивная высота
                              borderRadius: 2,                   // Скругление углов
                              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Полупрозрачный фон
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '& fieldset': {                   // Стили рамки
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                borderColor: 'primary.light',
                              },
                              '&:hover fieldset': {             // При наведении
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused fieldset': {       // В фокусе
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </motion.div>
                    ) : (                                       // Если задача не редактируется
                      <Typography
                        sx={{
                          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // Адаптивный размер текста
                          textDecoration: todo.completed ? 'line-through' : 'none', // Зачёркивание выполненной
                          color: todo.completed ? 'text.secondary' : 'text.primary', // Цвет текста
                        }}>
                        {todo.text}                             
                      </Typography>
                    )
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>         
                  {editingId === todo.id ? (                    // Кнопки при редактировании
                    <>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Tooltip title="Сохранить">            
                          <IconButton
                            onClick={handleSaveEdit}            // Сохраняем изменения
                            sx={{
                              position: 'relative',
                              width: 'clamp(32px, 6vw, 40px)', // Адаптивный размер кнопки
                              height: 'clamp(32px, 6vw, 40px)',
                              color: 'success.main',            // Зелёный цвет
                              border: 'none',
                              outline: 'none',
                              '&:focus': {
                                outline: 'none',
                              },
                              '&.Mui-focusVisible': {
                                outline: 'none',
                              },
                              '&::before': {                    // Эффект при наведении
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) scale(0)',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                transition: 'all 0.2s ease-in-out',
                                bgcolor: 'success.main',
                                opacity: 0,
                                zIndex: -1,
                              },
                              '&:hover': {                      // Стили при наведении
                                color: 'success.dark',
                                '&::before': {
                                  transform: 'translate(-50%, -50%) scale(1)',
                                  opacity: 0.1,
                                },
                              },
                            }}>
                            <CheckIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                          </IconButton>
                        </Tooltip>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Tooltip title="Отменить">             
                          <IconButton
                            onClick={handleCancelEdit}          // Отменяем изменения
                            sx={{
                              position: 'relative',
                              width: 'clamp(32px, 6vw, 40px)', // Адаптивный размер
                              height: 'clamp(32px, 6vw, 40px)',
                              color: 'error.light',             // Красный цвет
                              border: 'none',
                              outline: 'none',
                              '&:focus': {
                                outline: 'none',
                              },
                              '&.Mui-focusVisible': {
                                outline: 'none',
                              },
                              '&::before': {                    // Эффект при наведении
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) scale(0)',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                transition: 'all 0.2s ease-in-out',
                                bgcolor: 'error.light',
                                opacity: 0,
                                zIndex: -1,
                              },
                              '&:hover': {                      // Стили при наведении
                                color: 'error.main',
                                '&::before': {
                                  transform: 'translate(-50%, -50%) scale(1)',
                                  opacity: 0.1,
                                },
                              },
                            }}>
                            <CloseIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                          </IconButton>
                        </Tooltip>
                      </motion.div>
                    </>
                  ) : (                                        // Кнопки в обычном режиме
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Tooltip title="Редактировать">          
                        <IconButton
                          onClick={() => handleStartEdit(todo)} // Начинаем редактирование
                          sx={{
                            position: 'relative',
                            width: 'clamp(32px, 6vw, 40px)',   // Адаптивный размер
                            height: 'clamp(32px, 6vw, 40px)',
                            color: 'primary.light',             // Синий цвет
                            border: 'none',
                            outline: 'none',
                            '&:focus': {
                              outline: 'none',
                            },
                            '&.Mui-focusVisible': {
                              outline: 'none',
                            },
                            '&::before': {                      // Эффект при наведении
                              content: '""',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%) scale(0)',
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              transition: 'all 0.2s ease-in-out',
                              bgcolor: 'primary.main',
                              opacity: 0,
                              zIndex: -1,
                            },
                            '&:hover': {                        // Стили при наведении
                              color: 'primary.main',
                              '&::before': {
                                transform: 'translate(-50%, -50%) scale(1)',
                                opacity: 0.1,
                              },
                            },
                          }}>
                          <EditIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Tooltip title="Удалить">                  
                      <IconButton
                        onClick={() => dispatch(removeTodo(todo.id))} // Удаляем задачу
                        sx={{
                          position: 'relative',
                          width: 'clamp(32px, 6vw, 40px)',     // Адаптивный размер
                          height: 'clamp(32px, 6vw, 40px)',
                          color: 'error.light',                 // Красный цвет
                          border: 'none',
                          outline: 'none',
                          '&:focus': {
                            outline: 'none',
                          },
                          '&.Mui-focusVisible': {
                            outline: 'none',
                          },
                          '&::before': {                        // Эффект при наведении
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) scale(0)',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            transition: 'all 0.2s ease-in-out',
                            bgcolor: 'error.light',
                            opacity: 0,
                            zIndex: -1,
                          },
                          '&:hover': {                          // Стили при наведении
                            color: 'error.main',
                            '&::before': {
                              transform: 'translate(-50%, -50%) scale(1)',
                              opacity: 0.1,
                            },
                          },
                        }}>
                        <DeleteIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                </Box>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Paper>
  );
};

export default TodoList;
