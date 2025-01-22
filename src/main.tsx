/**
 * Точка входа в React приложение (main.tsx)
 * 
 * Назначение:
 * - Инициализирует React приложение
 * - Подключает глобальные зависимости
 * - Монтирует приложение в DOM
 * 
 * Подключаемые модули:
 * - React и ReactDOM для рендеринга
 * - Redux Store для управления состоянием
 * - Глобальные стили (index.css)
 * 
 * Особенности:
 * - Использует строгий режим React
 * - Работает с TypeScript
 * - Обеспечивает горячую перезагрузку в development
 */

import React from 'react' // Импорт React для работы с JSX
import ReactDOM from 'react-dom/client' // Импорт ReactDOM для рендеринга в браузере
import { Provider } from 'react-redux' // Импорт Provider для подключения Redux
import { store } from './store' // Импорт хранилища Redux
import App from './App.tsx' // Импорт корневого компонента
import './index.css' // Импорт глобальных стилей

// Создаем корневой элемент React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> {/* Включаем строгий режим React */}
    <Provider store={store}> {/* Подключаем Redux store */}
      <App /> {/* Рендерим главный компонент */}
    </Provider>
  </React.StrictMode>,
)
