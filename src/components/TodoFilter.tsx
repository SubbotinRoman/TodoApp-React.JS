/**
 * Компонент панели фильтров TodoFilter
 * 
 * Назначение:
 * - Отображает кнопки для фильтрации списка задач
 * - Позволяет пользователю быстро находить нужные задачи
 * 
 * Функциональность:
 * - Переключение между всеми задачами
 * - Показ только активных задач
 * - Показ только выполненных задач
 * 
 * Взаимодействие:
 * - При клике на фильтр обновляет список задач
 * - Подсвечивает текущий выбранный фильтр
 */

import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';    // Импорт компонентов Material-UI
import { motion } from 'framer-motion';                                  // Импорт для анимаций

// Настройки компонента: текущий фильтр и функция для его изменения
interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';                               // Текущий фильтр
  setFilter: (filter: 'all' | 'active' | 'completed') => void;         // Функция изменения фильтра
}

const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
  // Обработчик изменения фильтра
  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,                                  // Событие клика (обязательный параметр Material-UI)
    newFilter: 'all' | 'active' | 'completed' | null                   // Новое значение фильтра
  ) => {
    if (newFilter !== null) {                                         // Проверяем, что выбран валидный фильтр
      setFilter(newFilter);                                           // Устанавливаем новый фильтр
    }
  };

  // Анимация появления компонента
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}                                // Начальное состояние анимации
      animate={{ opacity: 1, y: 0 }}                                  // Конечное состояние анимации
      transition={{ duration: 0.3, delay: 0.1 }}                      // Параметры анимации
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}> {/* Контейнер для центрирования */}
        <ToggleButtonGroup
          value={filter}                                              // Текущее значение фильтра
          exclusive                                                   // Только одна кнопка может быть выбрана
          onChange={handleFilterChange}                               // Обработчик изменения
          aria-label="фильтр задач"                                  // Описание для программ чтения с экрана (для слабовидящих)
          sx={{
            gap: 1,                                                   // Отступ между кнопками
            '& .MuiToggleButton-root': {                             // Стили для кнопок
              border: 'none',                                         // Убираем границу
              outline: 'none',                                        // Убираем контур
              borderRadius: '8px !important',                         // Скругление углов
              px: 'clamp(1rem, 3vw, 2rem)',                          // Адаптивные отступы по горизонтали
              py: 'clamp(0.5rem, 1.5vw, 1rem)',                      // Адаптивные отступы по вертикали
              color: 'text.secondary',                                // Цвет текста
              textTransform: 'none',                                  // Отключаем преобразование текста
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',             // Адаптивный размер шрифта
              fontWeight: 500,                                        // Жирность шрифта
              minWidth: 'clamp(80px, 20vw, 120px)',                  // Минимальная ширина кнопки
              transition: 'all 0.2s ease-in-out',                     // Плавное изменение стилей
              '&:hover': {                                           // Стили при наведении
                backgroundColor: 'rgba(33, 150, 243, 0.08)',          // Цвет фона при наведении
                boxShadow: '0px 0px 0px 2px rgba(33, 150, 243, 0.2)', // Тень при наведении
              },
              '&.Mui-selected': {                                    // Стили для выбранной кнопки
                backgroundColor: 'primary.main',                      // Цвет фона
                color: 'white',                                       // Цвет текста
                '&:hover': {
                  backgroundColor: 'primary.dark',                    // Цвет фона при наведении
                },
              },
              '&:focus': {
                outline: 'none',                                      // Убираем контур при фокусе
              },
              '&.Mui-focusVisible': {
                outline: 'none',                                      // Убираем контур при фокусе с клавиатуры
              },
            },
          }}
        >
          <ToggleButton value="all">Все</ToggleButton>                {/* Кнопка для всех задач */}
          <ToggleButton value="active">Активные</ToggleButton>        {/* Кнопка для активных задач */}
          <ToggleButton value="completed">Выполненные</ToggleButton>  {/* Кнопка для выполненных задач */}
        </ToggleButtonGroup>
      </Box>
    </motion.div>
  );
};

export default TodoFilter;
