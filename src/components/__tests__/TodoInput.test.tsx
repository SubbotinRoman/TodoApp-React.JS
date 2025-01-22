/**
 * Автоматические тесты компонента ввода новых задач (TodoInput)
 * 
 * Этот файл содержит набор проверок, которые гарантируют, что компонент:
 * - Правильно отображается на странице (есть поле ввода и кнопка)
 * - Корректно работает при добавлении новых задач
 * - Правильно обновляет список задач в хранилище Redux
 * 
 * Используются инструменты:
 * - Vitest для запуска тестов
 * - React Testing Library для тестирования компонентов
 * - Redux Toolkit для работы с состоянием
 */

import { describe, it, expect } from 'vitest';                        // Импорт основных функций тестирования
import { render, screen, fireEvent } from '@testing-library/react';   // Утилиты для тестирования React компонентов
import { Provider } from 'react-redux';                               // Провайдер Redux для тестов
import { configureStore } from '@reduxjs/toolkit';                    // Создание тестового хранилища
import TodoInput from '../TodoInput';                                 // Тестируемый компонент
import { todoSlice } from '../../store';                             // Редьюсер для хранилища

// Функция для создания тестового хранилища Redux
const createTestStore = () => {
  return configureStore({
    reducer: {
      todos: todoSlice.reducer,                                      // Подключаем редьюсер задач
    },
  });
};

describe('TodoInput Component', () => {                              // Группа тестов для TodoInput
  it('renders input field and add button', () => {                   // Тест отображения компонента
    const store = createTestStore();                                 // Создаём тестовое хранилище
    render(
      <Provider store={store}>                                       
        <TodoInput />
      </Provider>,
    );

    // Проверяем наличие поля ввода и кнопки
    expect(screen.getByPlaceholderText('Что нужно сделать?')).toBeInTheDocument();  // Проверка поля ввода
    expect(screen.getByRole('button')).toBeInTheDocument();                         // Проверка кнопки
  });

  it('adds new todo when submitting non-empty input', () => {        // Тест добавления новой задачи
    const store = createTestStore();                                 // Создаём тестовое хранилище
    render(
      <Provider store={store}>                                       
        <TodoInput />
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Что нужно сделать?'); // Находим поле ввода
    const submitButton = screen.getByRole('button');                  // Находим кнопку отправки

    fireEvent.change(input, { target: { value: 'New Todo' } });      // Вводим текст задачи
    fireEvent.click(submitButton);                                   // Нажимаем кнопку добавления

    expect(input).toHaveValue('');                                   // Проверяем очистку поля ввода

    const state = store.getState();                                  // Получаем состояние хранилища
    expect(state.todos.todos).toHaveLength(1);                       // Проверяем количество задач
    expect(state.todos.todos[0].text).toBe('New Todo');             // Проверяем текст добавленной задачи
  });
});
