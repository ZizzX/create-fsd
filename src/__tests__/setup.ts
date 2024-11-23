import { jest } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';

// Mock fs-extra
jest.mock('fs-extra', () => ({
  ensureDir: jest.fn(),
  writeFile: jest.fn(),
  existsSync: jest.fn(),
  remove: jest.fn(),
  readFile: jest.fn()
}));

// Mock process.cwd()
const mockCwd = jest.fn(() => '/test/project');

Object.defineProperty(process, 'cwd', {
  value: mockCwd,
  writable: true
});

// Mock process.env
process.env = {
  ...process.env,
  NODE_ENV: 'test'
};

// Mock console methods
const mockConsole = {
  log: (): void => {
    // Empty implementation for tests
  },
  error: (): void => {
    // Empty implementation for tests
  },
  warn: (): void => {
    // Empty implementation for tests
  }
};

Object.defineProperty(global, 'console', {
  value: mockConsole,
  writable: true
});

// Clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Helper to create temp test directory
export const createTempDir = (): { path: string; cleanup: () => Promise<void> } => {
  const tempDir = path.join(process.cwd(), 'temp-test');
  return {
    path: tempDir,
    cleanup: async (): Promise<void> => {
      await fs.remove(tempDir);
    }
  };
};
