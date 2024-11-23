#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import { createComponent } from '../src/commands/component.js';
import { createFSDStructure } from '../src/commands/create.js';
import { createEntity } from '../src/commands/entity.js';
import { createFeature } from '../src/commands/feature.js';
import { createShared } from '../src/commands/shared.js';

const program = new Command();

program
  .version('0.1.0')
  .description('CLI tool for creating Feature-Sliced Design (FSD) folder structure');

program
  .command('init')
  .description('Initialize FSD structure in current directory')
  .option('-f, --force', 'Force creation even if directory is not empty')
  .option('-i, --interactive', 'Run in interactive mode')
  .action(async (options) => {
    try {
      await createFSDStructure(options);
      console.log(chalk.green('✨ FSD structure created successfully!'));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('feature <name>')
  .description('Create a new feature')
  .option('-t, --tests', 'Generate tests')
  .option('-s, --stories', 'Generate Storybook stories')
  .action(async (name, options) => {
    try {
      await createFeature(name, options);
      console.log(chalk.green(`✨ Feature "${name}" created successfully!`));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('entity <name>')
  .description('Create a new entity')
  .option('-t, --tests', 'Generate tests')
  .option('-s, --stories', 'Generate Storybook stories')
  .action(async (name, options) => {
    try {
      await createEntity(name, options);
      console.log(chalk.green(`✨ Entity "${name}" created successfully!`));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('shared <segment> <name>')
  .description('Create a new component in shared layer')
  .option('-t, --tests', 'Generate tests')
  .option('-s, --stories', 'Generate Storybook stories')
  .option('-a, --api', 'Generate API module')
  .option('-l, --lib', 'Generate library module')
  .action(async (segment, name, options) => {
    try {
      await createShared(segment, name, options);
      console.log(chalk.green(`✨ Shared ${segment} "${name}" created successfully!`));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('component <layer> <name>')
  .description('Create a new component in specified layer (entities, features, widgets)')
  .option('-t, --tests', 'Generate tests')
  .option('-s, --stories', 'Generate Storybook stories')
  .action(async (layer, name, options) => {
    if (layer === 'shared') {
      console.log(chalk.yellow('For shared layer, please use the "shared" command. Example:'));
      console.log(chalk.cyan('  create-fsd shared ui Button'));
      process.exit(1);
    }
    try {
      await createComponent(layer, name, options);
      console.log(chalk.green(`✨ Component "${name}" created in ${layer} layer successfully!`));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
