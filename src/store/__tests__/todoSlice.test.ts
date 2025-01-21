import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from '../index';

describe('Todo Slice', () => {
  const createStore = () => {
    return configureStore({
      reducer: {
        todos: todoSlice.reducer,
      },
    });
  };

  it('должен добавлять новую задачу', () => {
    const store = createStore();
    store.dispatch(todoSlice.actions.addTodo('Новая задача'));

    const state = store.getState();
    expect(state.todos.todos).toHaveLength(1);
    expect(state.todos.todos[0].text).toBe('Новая задача');
    expect(state.todos.todos[0].completed).toBe(false);
  });

  it('должен переключать статус задачи', () => {
    const store = createStore();
    store.dispatch(todoSlice.actions.addTodo('Тестовая задача'));
    const todoId = store.getState().todos.todos[0].id;

    store.dispatch(todoSlice.actions.toggleTodo(todoId));
    expect(store.getState().todos.todos[0].completed).toBe(true);

    store.dispatch(todoSlice.actions.toggleTodo(todoId));
    expect(store.getState().todos.todos[0].completed).toBe(false);
  });

  it('должен удалять задачу', () => {
    const store = createStore();
    store.dispatch(todoSlice.actions.addTodo('Задача на удаление'));
    const todoId = store.getState().todos.todos[0].id;

    store.dispatch(todoSlice.actions.removeTodo(todoId));
    expect(store.getState().todos.todos).toHaveLength(0);
  });
});
