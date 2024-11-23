#!/usr/bin/env node
import { Command } from 'commander';
import { createComponent } from '../commands/component';
import { createFSDStructure } from '../commands/create';
import { ComponentOptions } from '../types';
import { ProjectConfig } from '../types/public';
import { logger } from '../utils/logger';

const program = new Command();

program
  .name('create-fsd')
  .description('CLI tool for generating Feature-Sliced Design (FSD) project structures')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize a new FSD project structure')
  .option('-f, --force', 'Force creation even if directory exists')
  .option('--no-typescript', 'Skip TypeScript configuration')
  .action(async (options: ProjectConfig) => {
    try {
      await createFSDStructure(options);
      logger.success('✨ FSD structure created successfully!');
    } catch (error) {
      logger.error(`Failed to create FSD structure: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  });

program
  .command('component <layer> <name>')
  .description('Create a new component in specified layer')
  .option('-f, --force', 'Force creation even if component exists')
  .option('--no-typescript', 'Skip TypeScript configuration')
  .option('--redux', 'Add Redux integration')
  .option('--api', 'Add API layer')
  .option('--no-styles', 'Skip CSS styles')
  .action(async (layer: string, name: string, options: ComponentOptions) => {
    try {
      await createComponent(layer, name, {
        force: options.force,
        typescript: options.typescript,
        withRedux: options.withRedux,
        withApi: options.withApi,
        withStyles: options.withStyles
      });
      logger.success(`✨ Component ${name} created in ${layer} layer!`);
    } catch (error) {
      logger.error(`Failed to create component: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  });

program.parse();
