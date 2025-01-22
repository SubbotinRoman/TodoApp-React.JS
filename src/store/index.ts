/**
 * Центральное хранилище данных приложения (Redux Store)
 * 
 * Этот файл содержит:
 * - Типы данных для задач (Todo)
 * - Действия для работы с задачами (добавление, удаление, редактирование)
 * - Логику обработки этих действий (reducers)
 * 
 * Как это работает:
 * 1. Компоненты вызывают действия (например addTodo)
 * 2. Redux обрабатывает эти действия через reducers
 * 3. Состояние обновляется и компоненты автоматически перерисовываются
 */

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit' // configureStore - создание хранилища, createSlice - для управления данными (добавление, удаление, изменение), PayloadAction - типизация действий

// Интерфейс для задачи
export interface Todo {
  id: number;        // Уникальный идентификатор задачи, генерируется автоматически
  text: string;      // Текст задачи, вводится пользователем
  completed: boolean; // Статус выполнения (true - выполнена, false - активна)
}

// Интерфейс состояния приложения
interface TodoState {
  todos: Todo[];     // Массив всех задач в приложении
}

// Начальное состояние приложения
const initialState: TodoState = {
  todos: [],         // При старте приложения список задач пуст
};

// Создаем slice для управления задачами (часть store, отвечающая за задачи)
export const todoSlice = createSlice({
  name: 'todos',     // Уникальное имя для этой части состояния
  initialState,      // Начальное состояние из константы выше
  reducers: {        // Методы для изменения состояния
    // Добавление новой задачи (принимает строку с текстом)
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),           // Используем текущее время как уникальный ID
        text: action.payload,     // Сохраняем текст задачи из action
        completed: false,         // Новая задача всегда не выполнена
      });
    },
    // Переключение статуса задачи (принимает ID задачи)
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload); // Ищем задачу по ID
      if (todo) {
        todo.completed = !todo.completed;                                // Инвертируем статус
      }
    },
    // Удаление задачи по её ID
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload); // Оставляем все задачи кроме удаляемой
    },
    // Очистка только выполненных задач
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);        // Оставляем только невыполненные
    },
    // Удаление всех задач
    clearAll: (state) => {
      state.todos = [];                                                 // Очищаем весь массив
    },
    // Редактирование текста задачи (принимает ID и новый текст)
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id); // Ищем задачу по ID
      if (todo) {
        todo.text = action.payload.text;                                // Обновляем текст
      }
    },
  },
});

// Экспортируем действия для использования в компонентах
export const { 
  addTodo,          // Добавление задачи
  toggleTodo,       // Переключение статуса
  removeTodo,       // Удаление задачи
  clearCompleted,   // Очистка выполненных
  clearAll,         // Очистка всех
  editTodo         // Редактирование задачи
} = todoSlice.actions;

// Создаем главное хранилище приложения
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer, // Подключаем редьюсер как часть главного хранилища
  },
});

// Экспортируем тип корневого состояния для использования в useSelector
export type RootState = ReturnType<typeof store.getState>;
