import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для задачи
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Интерфейс состояния
interface TodoState {
  todos: Todo[];
}

// Начальное состояние
const initialState: TodoState = {
  todos: [],
};

// Создаем slice для управления задачами
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Добавление новой задачи
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    // Переключение статуса задачи
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Удаление задачи
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    // Очистка выполненных задач
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    // Удаление всех задач
    clearAll: (state) => {
      state.todos = [];
    },
    // Редактирование задачи
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

// Экспортируем actions
export const { addTodo, toggleTodo, removeTodo, clearCompleted, clearAll, editTodo } = todoSlice.actions;

// Создаем store
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

// Экспортируем тип RootState
export type RootState = ReturnType<typeof store.getState>;
