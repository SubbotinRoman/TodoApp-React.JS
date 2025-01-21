import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoInput from '../TodoInput';
import { todoSlice } from '../../store';

// Создаем мок store для тестов
const createTestStore = () => {
  return configureStore({
    reducer: {
      todos: todoSlice.reducer,
    },
  });
};

describe('TodoInput Component', () => {
  it('renders input field and add button', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <TodoInput />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Что нужно сделать?')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('adds new todo when submitting non-empty input', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <TodoInput />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Что нужно сделать?');
    const submitButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(submitButton);

    // Проверяем, что поле ввода очистилось
    expect(input).toHaveValue('');
    
    // Проверяем состояние store
    const state = store.getState();
    expect(state.todos.todos).toHaveLength(1);
    expect(state.todos.todos[0].text).toBe('New Todo');
  });
});
