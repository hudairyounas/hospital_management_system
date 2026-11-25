import '@testing-library/jest-dom';

// Mock window.scrollTo for jsdom environment
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});
