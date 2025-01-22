/**
 * Компонент формы добавления задачи TodoInput
 * 
 * Назначение:
 * - Позволяет пользователю создавать новые задачи
 * - Обеспечивает простой и удобный ввод текста
 * 
 * Внешний вид:
 * - Текстовое поле с подсказкой "Что нужно сделать?"
 * - Кнопка добавления с иконкой "+"
 * - Современный дизайн с анимациями
 * 
 * Поведение:
 * - Добавляет задачу при нажатии Enter или кнопки
 * - Очищает поле после добавления
 * - Не добавляет пустые задачи
 */

import { useState } from 'react';                     // Хранит текст, который вводит пользователь
import { TextField, IconButton, Box } from '@mui/material'; // Красивые компоненты для ввода и кнопки
import { Add as AddIcon } from '@mui/icons-material'; // Значок "+" для кнопки добавления
import { useDispatch } from 'react-redux';           // Отправляет новые задачи в общее хранилище Redux
import { addTodo } from '../store';                  // Функция для добавления задачи в список
import { motion } from 'framer-motion';              // Добавляет красивую анимацию

const TodoInput = () => {
  const dispatch = useDispatch();                    // Функция для отправки задач в Redux
  const [input, setInput] = useState('');            // Храним текст, который вводит пользователь

  // Что делать при нажатии на кнопку или Enter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();                              // Отключаем перезагрузку страницы
    if (input.trim()) {                             // Проверяем, что текст не пустой
      dispatch(addTodo(input.trim()));              // Сохраняем новую задачу
      setInput('');                                 // Очищаем поле ввода
    }
  };

  return (
    /* Контейнер с анимацией от Framer Motion */
    <motion.div
      initial={{ opacity: 0, y: -20 }}              // Появляется плавно сверху вниз (сдвиг 20px)
      animate={{ opacity: 1, y: 0 }}                // Становится видимым на своём месте
      transition={{ duration: 0.3 }}                // Анимация длится 0.3 секунды
    >
      <Box
        component="form"                            // Форма для отправки задачи
        onSubmit={handleSubmit}                     // Обработчик нажатия Enter или кнопки добавления
        sx={{
          display: 'flex',                          // Поле и кнопка в одну линию
          gap: 1,                                   // Отступ между полем и кнопкой
          mb: 3,                                    // Отступ снизу
        }}
      >
        {/* Поле ввода с красивой анимацией при наведении и фокусе */}
        <TextField
          fullWidth                                 // Растягиваем поле на всю ширину
          value={input}                             // Текст из состояния
          onChange={(e) => setInput(e.target.value)} // Обновляем текст при вводе
          placeholder="Что нужно сделать?"          // Подсказка в пустом поле
          variant="outlined"                        // Стиль поля с рамкой
          size="medium"                             // Средний размер поля
          sx={{
            '& .MuiOutlinedInput-root': {          // Стили для поля ввода
              borderRadius: 2,                      // Скругление углов
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Полупрозрачный фон
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Плавное изменение
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // Адаптивный размер текста
              height: 'clamp(40px, 8vw, 56px)',    // Адаптивная высота поля
              '& fieldset': {                      // Стили для рамки поля
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover': {                         // При наведении мыши
                backgroundColor: 'rgba(255, 255, 255, 0.95)', // Делаем фон менее прозрачным
                '& fieldset': {
                  borderColor: 'primary.main',      // Синяя рамка
                  borderWidth: '2px',               // Делаем рамку толще
                },
              },
              '&.Mui-focused': {                   // Когда поле в фокусе
                backgroundColor: '#fff',            // Белый фон
                '& fieldset': {
                  borderColor: 'primary.main',      // Синяя рамка
                  borderWidth: '2px',               // Толстая рамка
                },
              },
            },
          }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> {/* Анимация при наведении и нажатии */}
          <IconButton
            type="submit"                           // Кнопка отправки формы
            color="primary"                         // Синий цвет
            disabled={!input.trim()}                // Неактивна, если поле пустое
            sx={{
              width: 'clamp(40px, 8vw, 56px)',     // Адаптивная ширина кнопки
              height: 'clamp(40px, 8vw, 56px)',    // Адаптивная высота кнопки
              bgcolor: 'primary.main',              // Синий фон
              color: 'white',                       // Белый значок
              borderRadius: 2,                      // Скругление углов
              border: 'none',                       // Убираем рамку
              outline: 'none',                      // Убираем контур
              transition: 'all 0.2s ease-in-out',   // Плавное изменение
              '&:hover': {                         // При наведении
                bgcolor: 'primary.dark',            // Темно-синий фон
                transform: 'translateY(-2px)',      // Приподнимаем кнопку
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)', // Добавляем тень
              },
              '&:active': {                        // При нажатии
                transform: 'translateY(0)',         // Возвращаем на место
              },
              '&:disabled': {                      // Когда кнопка неактивна
                bgcolor: 'rgba(0, 0, 0, 0.12)',    // Серый фон
                color: 'rgba(0, 0, 0, 0.26)',      // Серый значок
              },
              '&:focus': {                         // При фокусе
                outline: 'none',                    // Убираем контур
              },
              '&.Mui-focusVisible': {              // При фокусе с клавиатуры
                outline: 'none',                    // Убираем контур
              },
            }}
          >
            <AddIcon sx={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }} /> {/* Значок "+" с адаптивным размером */}
          </IconButton>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default TodoInput;
