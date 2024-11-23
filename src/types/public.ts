/**
 * Represents a layer in Feature-Sliced Design architecture
 * @public
 */
export type FSDLayer =
  | 'app'
  | 'processes'
  | 'pages'
  | 'widgets'
  | 'features'
  | 'entities'
  | 'shared';

/**
 * Represents a segment in the shared layer
 * @public
 */
export type SharedSegment =
  | 'ui'
  | 'lib'
  | 'api'
  | 'config'
  | 'types'
  | 'constants';

/**
 * Configuration options for component generation
 * @public
 */
export interface ComponentConfig {
  /** Generate test files */
  tests?: boolean;
  /** Generate Storybook stories */
  stories?: boolean;
  /** Add Redux integration */
  redux?: boolean;
  /** Add API integration */
  api?: boolean;
  /** CSS preprocessor to use */
  style?: 'css' | 'scss' | 'less';
}

/**
 * Configuration options for component creation
 * @public
 */
export interface ComponentOptions {
  /** Force creation even if component exists */
  force?: boolean;
  /** Use TypeScript */
  typescript?: boolean;
  /** Add Redux integration */
  withRedux?: boolean;
  /** Add API layer */
  withApi?: boolean;
  /** Add styles */
  withStyles?: boolean;
}

/**
 * Configuration for project initialization
 * @public
 */
export interface ProjectConfig {
  /** Force creation even if directory exists */
  force?: boolean;
  /** Use TypeScript (default: true) */
  typescript?: boolean;
  /** CSS preprocessor to use */
  style?: 'css' | 'scss' | 'less';
  /** Custom templates configuration */
  templates?: {
    /** Path to custom component template */
    component?: string;
    /** Path to custom story template */
    story?: string;
    /** Path to custom test template */
    test?: string;
    /** Path to custom style template */
    style?: string;
  };
}

/**
 * Command options
 * @public
 */
export interface CommandOptions extends ProjectConfig {
  /** Add Redux integration */
  redux?: boolean;
  /** Add API layer */
  api?: boolean;
}

/**
 * Result of component creation
 * @public
 */
export interface ComponentResult {
  /** Component name */
  name: string;
  /** Layer where component was created */
  layer: FSDLayer;
  /** Generated files */
  files: Array<{
    /** File path relative to component directory */
    path: string;
    /** File type */
    type: 'component' | 'test' | 'story' | 'style' | 'type' | 'model' | 'api';
  }>;
}

/**
 * Error types that can occur during generation
 * @public
 */
export type GenerationError =
  | { type: 'INVALID_LAYER'; layer: string }
  | { type: 'INVALID_NAME'; name: string; message: string }
  | { type: 'WRITE_ERROR'; message: string }
  | { type: 'DIRECTORY_EXISTS'; path: string };

/**
 * Main API for programmatic usage
 * @public
 */
export interface FSDAPI {
  /**
   * Initialize FSD project structure
   * @param config - Project configuration
   * @returns Promise that resolves when structure is created
   * @throws {GenerationError}
   */
  init(config?: ProjectConfig): Promise<void>;

  /**
   * Create a new component
   * @param layer - FSD layer to create component in
   * @param name - Component name
   * @param config - Component configuration
   * @returns Promise that resolves with component creation result
   * @throws {GenerationError}
   */
  createComponent(
    layer: FSDLayer,
    name: string,
    config?: ComponentConfig
  ): Promise<ComponentResult>;
}
