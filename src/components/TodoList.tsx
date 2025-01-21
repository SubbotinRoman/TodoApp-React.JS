import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, Checkbox, Paper, Box, Typography, Tooltip, TextField } from '@mui/material';
import { Delete as DeleteIcon, DeleteSweep as DeleteSweepIcon, DeleteForever as DeleteForeverIcon, Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState, toggleTodo, removeTodo, clearCompleted, clearAll, editTodo, Todo } from '../store';
import { useState } from 'react';

interface TodoListProps {
  filter: 'all' | 'active' | 'completed';
}

const TodoList: React.FC<TodoListProps> = ({ filter }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      dispatch(editTodo({ id: editingId, text: editText.trim() }));
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .sort((a, b) => {
      // Сначала сортируем по статусу выполнения (невыполненные вверху)
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      // Если статус выполнения одинаковый, сохраняем исходный порядок
      return 0;
    });

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);

  if (filteredTodos.length === 0) {
    return (
      <Box 
        sx={{ 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography 
          color="text.secondary"
          sx={{
            opacity: 0.7,
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          }}
        >
          {filter === 'all' ? 'Нет задач' :
           filter === 'active' ? 'Нет активных задач' :
           'Нет выполненных задач'}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography 
          variant="h6"
          sx={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontWeight: 500,
          }}
        >
          {filter === 'all' && 'Все задачи'}
          {filter === 'active' && 'Активные задачи'}
          {filter === 'completed' && 'Выполненные задачи'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Удалить выполненные задачи">
              <IconButton
                onClick={() => dispatch(clearCompleted())}
                sx={{
                  position: 'relative',
                  color: 'error.light',
                  '&::before': {
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
                  '&:hover': {
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
                }}
              >
                <DeleteSweepIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Удалить все задачи">
              <IconButton
                onClick={() => dispatch(clearAll())}
                sx={{
                  position: 'relative',
                  color: 'error.main',
                  '&::before': {
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
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
        </Box>
      </Box>
      <List 
        sx={{ 
          p: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          flex: 1,
          width: '100%',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.15)',
            },
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((todo: Todo, index: number) => (
            <motion.div
              key={todo.id}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ 
                duration: 0.2,
                delay: index * 0.05,
                ease: "easeInOut"
              }}
              layout
              style={{ 
                width: '100%',
                position: 'relative',
              }}
            >
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                  },
                  py: 'clamp(0.5rem, 2vw, 1rem)',
                  px: 'clamp(1rem, 3vw, 2rem)',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: 'clamp(24px, 5vw, 34px)',
                    height: 'clamp(24px, 5vw, 34px)',
                    mt: '2px',
                  }}
                >
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                    sx={{
                      padding: 0,
                      width: '100%',
                      height: '100%',
                      color: 'primary.light',
                      position: 'relative',
                      zIndex: 1,
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(0)',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        transition: 'all 0.2s ease-in-out',
                        bgcolor: (theme) => todo.completed ? theme.palette.primary.main : theme.palette.primary.light,
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
                    editingId === todo.id ? (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TextField
                          fullWidth
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                              height: 'clamp(32px, 6vw, 40px)',
                              borderRadius: 2,
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '& fieldset': {
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                borderColor: 'primary.light',
                              },
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </motion.div>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {todo.text}
                      </Typography>
                    )
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {editingId === todo.id ? (
                    <>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Tooltip title="Сохранить">
                          <IconButton
                            onClick={handleSaveEdit}
                            sx={{
                              position: 'relative',
                              width: 'clamp(32px, 6vw, 40px)',
                              height: 'clamp(32px, 6vw, 40px)',
                              color: 'success.main',
                              border: 'none',
                              outline: 'none',
                              '&:focus': {
                                outline: 'none',
                              },
                              '&.Mui-focusVisible': {
                                outline: 'none',
                              },
                              '&::before': {
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
                              '&:hover': {
                                color: 'success.dark',
                                '&::before': {
                                  transform: 'translate(-50%, -50%) scale(1)',
                                  opacity: 0.1,
                                },
                              },
                            }}
                          >
                            <CheckIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                          </IconButton>
                        </Tooltip>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Tooltip title="Отменить">
                          <IconButton
                            onClick={handleCancelEdit}
                            sx={{
                              position: 'relative',
                              width: 'clamp(32px, 6vw, 40px)',
                              height: 'clamp(32px, 6vw, 40px)',
                              color: 'error.light',
                              border: 'none',
                              outline: 'none',
                              '&:focus': {
                                outline: 'none',
                              },
                              '&.Mui-focusVisible': {
                                outline: 'none',
                              },
                              '&::before': {
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
                              '&:hover': {
                                color: 'error.main',
                                '&::before': {
                                  transform: 'translate(-50%, -50%) scale(1)',
                                  opacity: 0.1,
                                },
                              },
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                          </IconButton>
                        </Tooltip>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Tooltip title="Редактировать">
                        <IconButton
                          onClick={() => handleStartEdit(todo)}
                          sx={{
                            position: 'relative',
                            width: 'clamp(32px, 6vw, 40px)',
                            height: 'clamp(32px, 6vw, 40px)',
                            color: 'primary.light',
                            border: 'none',
                            outline: 'none',
                            '&:focus': {
                              outline: 'none',
                            },
                            '&.Mui-focusVisible': {
                              outline: 'none',
                            },
                            '&::before': {
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
                            '&:hover': {
                              color: 'primary.main',
                              '&::before': {
                                transform: 'translate(-50%, -50%) scale(1)',
                                opacity: 0.1,
                              },
                            },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }} />
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Tooltip title="Удалить">
                      <IconButton
                        onClick={() => dispatch(removeTodo(todo.id))}
                        sx={{
                          position: 'relative',
                          width: 'clamp(32px, 6vw, 40px)',
                          height: 'clamp(32px, 6vw, 40px)',
                          color: 'error.light',
                          border: 'none',
                          outline: 'none',
                          '&:focus': {
                            outline: 'none',
                          },
                          '&.Mui-focusVisible': {
                            outline: 'none',
                          },
                          '&::before': {
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
                          '&:hover': {
                            color: 'error.main',
                            '&::before': {
                              transform: 'translate(-50%, -50%) scale(1)',
                              opacity: 0.1,
                            },
                          },
                        }}
                      >
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
