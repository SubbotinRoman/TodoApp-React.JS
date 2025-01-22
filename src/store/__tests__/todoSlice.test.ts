/**
 * Тесты для хранилища задач (Todo Slice)
 * 
 * Назначение:
 * - Проверяет корректность работы всех операций с задачами
 * - Гарантирует надёжность хранения данных
 * 
 * Тестируемые функции:
 * - Добавление новых задач
 * - Переключение статуса (выполнено/активно)
 * - Удаление задач
 * 
 * Каждый тест проверяет отдельную функцию и её побочные эффекты
 */

import { describe, it, expect } from 'vitest';                      // Функции для написания тестов
import { configureStore } from '@reduxjs/toolkit';                  // Создание тестового хранилища Redux
import { todoSlice } from '../index';                               // Тестируемый модуль с редьюсером

describe('Todo Slice', () => {                                    // Группа тестов для списка задач
  const createStore = () => {                                     // Функция создания тестового хранилища
    return configureStore({
      reducer: {
        todos: todoSlice.reducer,                                // Подключаем редьюсер задач
      },
    });
  };

  it('должен добавлять новую задачу', () => {                    // Тест добавления задачи
    const store = createStore();                                 // Создаём чистое хранилище
    store.dispatch(todoSlice.actions.addTodo('Новая задача'));   // Добавляем задачу

    const state = store.getState();                             // Получаем состояние
    expect(state.todos.todos).toHaveLength(1);                  // Проверяем количество задач
    expect(state.todos.todos[0].text).toBe('Новая задача');     // Проверяем текст задачи
    expect(state.todos.todos[0].completed).toBe(false);         // Проверяем статус задачи
  });

  it('должен переключать статус задачи', () => {                  // Тест переключения статуса
    const store = createStore();                                  // Создаём чистое хранилище
    store.dispatch(todoSlice.actions.addTodo('Тестовая задача')); // Добавляем тестовую задачу
    const todoId = store.getState().todos.todos[0].id;            // Получаем ID задачи

    store.dispatch(todoSlice.actions.toggleTodo(todoId));         // Отмечаем как выполненную
    expect(store.getState().todos.todos[0].completed).toBe(true); // Проверяем что задача выполнена

    store.dispatch(todoSlice.actions.toggleTodo(todoId));          // Отмечаем как активную
    expect(store.getState().todos.todos[0].completed).toBe(false); // Проверяем что задача активна
  });

  it('должен удалять задачу', () => {                          // Тест удаления задачи
    const store = createStore();                               // Создаём чистое хранилище
    store.dispatch(todoSlice.actions.addTodo('Задача на удаление')); // Добавляем задачу
    const todoId = store.getState().todos.todos[0].id;        // Получаем ID задачи

    store.dispatch(todoSlice.actions.removeTodo(todoId));     // Удаляем задачу
    expect(store.getState().todos.todos).toHaveLength(0);     // Проверяем что список пуст
  });
});
