import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoList from '../TodoList';
import { todoSlice } from '../../store';

// Создаем тестовый store
const createTestStore = () => {
  return configureStore({
    reducer: {
      todos: todoSlice.reducer,
    },
  });
};

describe('TodoList Component', () => {
  it('отображает пустой список при отсутствии задач', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <TodoList filter="all" />
      </Provider>
    );
    
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('позволяет отметить задачу как выполненную', () => {
    const store = createTestStore();
    store.dispatch(todoSlice.actions.addTodo('Тестовая задача'));

    render(
      <Provider store={store}>
        <TodoList filter="all" />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });
});
