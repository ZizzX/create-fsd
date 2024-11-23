// FSD Layers
/**
 * Valid FSD layers
 * @internal
 */
export type FSDLayer = 'shared' | 'entities' | 'features' | 'widgets' | 'pages' | 'processes' | 'app';

// Shared Layer Segments
export type SharedSegment = 'ui' | 'lib' | 'api' | 'config' | 'types' | 'constants';

// Component Options
/**
 * Options for component generation
 * @internal
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
  withTests?: boolean;
  withStories?: boolean;
}

// Create Structure Options
export interface CreateStructureOptions {
  force?: boolean;
  typescript?: boolean;
  cssPreprocessor?: 'css' | 'scss' | 'less';
}

// Template Options
export interface TemplateOptions {
  name: string;
  layer: FSDLayer;
  segment?: SharedSegment;
  [key: string]: unknown;
}

// Template Result
/**
 * Result of template generation
 * @internal
 */
export interface TemplateResult {
  /** Path to write the template */
  path: string;
  /** Template content */
  content: string;
}

// CLI Command Options
export interface CommandOptions {
  force?: boolean;
  typescript?: boolean;
  tests?: boolean;
  stories?: boolean;
  styles?: 'css' | 'scss' | 'less';
}

// Project Configuration
export interface ProjectConfig {
  typescript: boolean;
  cssPreprocessor: 'css' | 'scss' | 'less';
  templates: {
    component?: string;
    story?: string;
    test?: string;
    style?: string;
  };
  paths: {
    src: string;
    templates: string;
  };
}
