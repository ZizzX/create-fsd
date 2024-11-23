import chalk from 'chalk';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isTestEnvironment = process.env.NODE_ENV === 'test';

/* eslint-disable no-console */
export const logger = {
  info: (message: string): void => {
    if (!isTestEnvironment) {
      console.log(chalk.blue('ℹ'), message);
    }
  },
  warn: (message: string): void => {
    if (!isTestEnvironment) {
      console.log(chalk.yellow('⚠'), message);
    }
  },
  error: (message: string): void => {
    if (!isTestEnvironment) {
      console.error(chalk.red('✖'), message);
    }
  },
  debug: (message: string): void => {
    if (!isTestEnvironment && process.env.DEBUG) {
      console.log(chalk.gray('🔍'), message);
    }
  },
  success: (message: string): void => {
    if (!isTestEnvironment) {
      console.log(chalk.green('✔'), message);
    }
  }
};
