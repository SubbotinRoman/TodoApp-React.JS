/**
 * Автоматические тесты компонента списка задач (TodoList)
 * 
 * Этот файл проверяет, что список задач:
 * - Правильно отображается, когда задач нет
 * - Позволяет отмечать задачи как выполненные
 * - Корректно работает с хранилищем Redux
 * 
 * Каждый тест имитирует действия пользователя (клики, отметки)
 * и проверяет, что компонент реагирует правильно
 */

import { render, screen, fireEvent } from '@testing-library/react';   // Утилиты для тестирования React компонентов
import { Provider } from 'react-redux';                               // Провайдер Redux для тестов
import { configureStore } from '@reduxjs/toolkit';                    // Создание тестового хранилища
import TodoList from '../TodoList';                                   // Тестируемый компонент
import { todoSlice } from '../../store';                             // Редьюсер для хранилища

// Функция для создания чистого тестового хранилища
const createTestStore = () => {
  return configureStore({
    reducer: {
      todos: todoSlice.reducer,                                      // Подключаем редьюсер задач
    },
  });
};

describe('TodoList Component', () => {                               // Группа тестов для TodoList
  it('отображает пустой список при отсутствии задач', () => {       // Тест пустого состояния
    const store = createTestStore();                                 // Создаём чистое хранилище
    render(
      <Provider store={store}>                                       
        <TodoList filter="all" />                                    
      </Provider>,
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument(); // Проверяем, что чекбоксов нет на странице
  });

  it('позволяет отметить задачу как выполненную', () => {          // Тест отметки выполнения
    const store = createTestStore();                                 // Создаём чистое хранилище
    store.dispatch(todoSlice.actions.addTodo('Тестовая задача'));   // Добавляем тестовую задачу

    render(
      <Provider store={store}>                                       
        <TodoList filter="all" />                                    
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');                   // Находим чекбокс задачи
    fireEvent.click(checkbox);                                       // Кликаем по чекбоксу

    expect(checkbox).toBeChecked();                                 // Проверяем, что задача отмечена
  });
});
