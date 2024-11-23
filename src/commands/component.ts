import fs from 'fs-extra';
import path from 'path';
import {
  createApiTemplate,
  createComponentTemplate,
  createIndexTemplate,
  createModelTemplate,
  createStoryTemplate,
  createStyleTemplate,
  createTestTemplate,
  createTypesTemplate
} from '../templates/typescript';
import { ComponentOptions, FSDLayer, TemplateResult } from '../types';
import { GenerationError } from '../types/public';
import { logger } from '../utils/logger';

const VALID_LAYERS: FSDLayer[] = ['shared', 'entities', 'features', 'widgets'];
const COMPONENT_NAME_REGEX = /^[A-Z][a-zA-Z0-9]*$/;

export async function createComponent(
  layer: string,
  name: string,
  options: ComponentOptions = {}
): Promise<void> {
  // Validate layer
  if (!VALID_LAYERS.includes(layer as FSDLayer)) {
    throw {
      type: 'INVALID_LAYER',
      layer
    } as GenerationError;
  }

  // Validate component name
  if (!COMPONENT_NAME_REGEX.test(name)) {
    throw {
      type: 'INVALID_NAME',
      name,
      message: 'Component name must start with an uppercase letter and contain only letters and numbers'
    } as GenerationError;
  }

  const componentDir = path.join(process.cwd(), 'src', layer, name);
  const uiDir = path.join(componentDir, 'ui');

  try {
    // Create component directory structure
    await fs.ensureDir(uiDir);
    logger.debug(`Created component directory: ${uiDir}`);

    // Generate templates
    const templates: TemplateResult[] = [
      createComponentTemplate({ name, layer: layer as FSDLayer }),
      createTypesTemplate({ name, layer: layer as FSDLayer }),
      createStyleTemplate({ name, layer: layer as FSDLayer }),
      createIndexTemplate({ name, layer: layer as FSDLayer })
    ];

    // Add optional templates
    if (options.withTests) {
      templates.push(createTestTemplate({ name, layer: layer as FSDLayer }));
    }

    if (options.withStories) {
      templates.push(createStoryTemplate({ name, layer: layer as FSDLayer }));
    }

    if (options.withRedux) {
      templates.push(createModelTemplate({ name, layer: layer as FSDLayer }));
    }

    if (options.withApi) {
      templates.push(createApiTemplate({ name, layer: layer as FSDLayer }));
    }

    // Write all files
    await Promise.all(
      templates.map(template => {
        const filePath = path.join(uiDir, template.path);
        logger.debug(`Writing file: ${filePath}`);
        return fs.writeFile(filePath, template.content, 'utf-8');
      })
    );

    logger.success(`Component ${name} created successfully in ${layer} layer`);
  } catch (error) {
    logger.error(`Failed to create component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw {
      type: 'WRITE_ERROR',
      message: error instanceof Error ? error.message : 'Failed to create component'
    } as GenerationError;
  }
}
