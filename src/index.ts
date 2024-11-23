/**
 * Feature-Sliced Design (FSD) structure generator
 * @packageDocumentation
 */

import { createComponent } from './commands/component';
import { createFSDStructure } from './commands/create';

export { createComponent } from './commands/component';
export { createFSDStructure } from './commands/create';
export * from './types/public';

/**
 * Main API for programmatic usage
 * @example
 * ```typescript
 * import { createComponent } from 'create-fsd-structure';
 *
 * // Create a new component
 * await createComponent('features', 'AuthForm', {
 *   tests: true,
 *   stories: true,
 *   redux: true
 * });
 * ```
 */
export const api = {
  init: createFSDStructure,
  createComponent: createComponent
};
