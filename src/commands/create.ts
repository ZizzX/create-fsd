import fs from 'fs-extra';
import path from 'path';
import { FSDLayer, GenerationError, ProjectConfig } from '../types/public';
import { logger } from '../utils/logger';

const LAYERS: FSDLayer[] = [
  'app',
  'processes',
  'pages',
  'widgets',
  'features',
  'entities',
  'shared'
];

const SHARED_SEGMENTS = ['ui', 'lib', 'api', 'config', 'types', 'constants'];

/**
 * Creates the basic FSD project structure
 */
export async function createFSDStructure(config: ProjectConfig = {}): Promise<void> {
  const rootDir = process.cwd();
  const srcDir = path.join(rootDir, 'src');

  try {
    // Check if directory exists
    if (fs.existsSync(srcDir) && !config.force) {
      logger.error(`Directory ${srcDir} already exists. Use --force to overwrite.`);
      throw { type: 'DIRECTORY_EXISTS', path: srcDir } as GenerationError;
    }

    // Create src directory
    await fs.ensureDir(srcDir);
    logger.debug(`Created src directory: ${srcDir}`);

    // Create layer directories
    await Promise.all(
      LAYERS.map(async (layer) => {
        const layerPath = path.join(srcDir, layer);
        await fs.ensureDir(layerPath);
        logger.debug(`Created layer directory: ${layerPath}`);

        // Create special structure for shared layer
        if (layer === 'shared') {
          await Promise.all(
            SHARED_SEGMENTS.map(async (segment) => {
              const segmentPath = path.join(layerPath, segment);
              await fs.ensureDir(segmentPath);
              logger.debug(`Created shared segment: ${segmentPath}`);
            })
          );
        }

        // Create index files
        const indexPath = path.join(layerPath, 'index.ts');
        await fs.writeFile(
          indexPath,
          `// Export public API for ${layer} layer\n`
        );
        logger.debug(`Created index file: ${indexPath}`);
      })
    );

    // Create app configuration
    if (config.typescript) {
      const typesPath = path.join(srcDir, 'app', 'types.ts');
      await fs.writeFile(
        typesPath,
        `export type RootState = any; // Replace with your store type\n`
      );
      logger.debug(`Created TypeScript types file: ${typesPath}`);
    }

    logger.success('✨ FSD structure created successfully!');
  } catch (error) {
    if ((error as GenerationError).type) {
      throw error;
    }
    logger.error(`Failed to create FSD structure: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw {
      type: 'WRITE_ERROR',
      message: error instanceof Error ? error.message : 'Failed to create FSD structure'
    } as GenerationError;
  }
}
