/**
 * Конфигурация тестового фреймворка Jest (jest.config.js)
 * 
 * Назначение:
 * - Настраивает среду выполнения тестов
 * - Определяет правила обработки файлов
 * - Подключает необходимые расширения
 * 
 * Настройки:
 * - jsdom: эмуляция браузерного окружения
 * - ts-jest: поддержка TypeScript
 * - identity-obj-proxy: замена CSS файлов пустыми объектами при тестировании
 * - setupTests.ts: глобальные настройки тестов
 * 
 * Особенности:
 * - Автоматическое преобразование TypeScript
 * - Поддержка модульного CSS
 * - Интеграция с React Testing Library
 */

export default {
  testEnvironment: 'jsdom',                                    // Эмуляция браузерного окружения
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',                            // Обработка TypeScript файлов
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',        // Замена стилей пустыми объектами в тестах
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],       // Подключение дополнительных настроек
};
