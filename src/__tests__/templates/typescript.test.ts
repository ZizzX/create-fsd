import { describe, expect, it } from '@jest/globals';
import {
  createApiTemplate,
  createComponentTemplate,
  createIndexTemplate,
  createModelTemplate,
  createStoryTemplate,
  createStyleTemplate,
  createTestTemplate,
  createTypesTemplate
} from '../../templates/typescript';

describe('TypeScript Templates', () => {
  const options = {
    name: 'TestComponent',
    layer: 'features' as const
  };

  describe('createComponentTemplate', () => {
    it('generates correct component template', () => {
      const result = createComponentTemplate(options);

      expect(result.path).toBe('TestComponent.tsx');
      expect(result.content).toContain('import { FC } from \'react\'');
      expect(result.content).toContain('export const TestComponent: FC<TestComponentProps>');
      expect(result.content).toContain('className={styles.root}');
    });
  });

  describe('createTypesTemplate', () => {
    it('generates correct types template', () => {
      const result = createTypesTemplate(options);

      expect(result.path).toBe('TestComponent.types.ts');
      expect(result.content).toContain('export interface TestComponentProps');
      expect(result.content).toContain('className?: string');
      expect(result.content).toContain('children?: React.ReactNode');
    });
  });

  describe('createTestTemplate', () => {
    it('generates correct test template', () => {
      const result = createTestTemplate(options);

      expect(result.path).toBe('TestComponent.test.tsx');
      expect(result.content).toContain('import { render, screen }');
      expect(result.content).toContain('describe(\'TestComponent\'');
      expect(result.content).toContain('expect(screen.getByText(\'TestComponent\'))');
    });
  });

  describe('createStoryTemplate', () => {
    it('generates correct story template', () => {
      const result = createStoryTemplate(options);

      expect(result.path).toBe('TestComponent.stories.tsx');
      expect(result.content).toContain('import type { Meta, StoryObj }');
      expect(result.content).toContain('title: \'features/TestComponent\'');
      expect(result.content).toContain('export const Default: Story = {}');
    });
  });

  describe('createStyleTemplate', () => {
    it('generates correct style template', () => {
      const result = createStyleTemplate(options);

      expect(result.path).toBe('TestComponent.module.scss');
      expect(result.content).toContain('.root {');
    });
  });

  describe('createIndexTemplate', () => {
    it('generates correct index template', () => {
      const result = createIndexTemplate(options);

      expect(result.path).toBe('index.ts');
      expect(result.content).toContain('export * from \'./TestComponent\'');
      expect(result.content).toContain('export * from \'./TestComponent.types\'');
    });
  });

  describe('createModelTemplate', () => {
    it('generates correct model template', () => {
      const result = createModelTemplate(options);

      expect(result.path).toBe('TestComponent.model.ts');
      expect(result.content).toContain('import { createSlice }');
      expect(result.content).toContain('interface TestComponentState');
      expect(result.content).toContain('export const TestComponentSlice');
    });
  });

  describe('createApiTemplate', () => {
    it('generates correct api template', () => {
      const result = createApiTemplate(options);

      expect(result.path).toBe('TestComponent.api.ts');
      expect(result.content).toContain('import { createApi, fetchBaseQuery }');
      expect(result.content).toContain('export const TestComponentApi');
    });
  });
});
