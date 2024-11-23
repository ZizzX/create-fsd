import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import { createComponent } from '../../commands/component';

// Extend the type of fs to include mock methods
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock fs-extra module
jest.mock('fs-extra', () => mockedFs);

describe('createComponent', () => {
  const mockCwd = '/test/project';
  const componentName = 'TestComponent';
  const layer = 'features';

  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates component with basic files', async () => {
    await createComponent(layer, componentName);

    const componentDir = path.join(mockCwd, 'src', layer, componentName);
    const uiDir = path.join(componentDir, 'ui');

    // Check directories creation
    expect(mockedFs.ensureDir).toHaveBeenCalledWith(uiDir);

    // Check basic files creation
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(uiDir, `${componentName}.tsx`),
      expect.stringContaining(componentName),
      'utf-8'
    );
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(uiDir, `${componentName}.types.ts`),
      expect.stringContaining(componentName),
      'utf-8'
    );
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(uiDir, `${componentName}.module.scss`),
      expect.any(String),
      'utf-8'
    );
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(uiDir, 'index.ts'),
      expect.stringContaining(componentName),
      'utf-8'
    );
  });

  it('creates test file when withTests is true', async () => {
    await createComponent(layer, componentName, { withTests: true });

    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, 'src', layer, componentName, 'ui', `${componentName}.test.tsx`),
      expect.stringContaining(componentName),
      'utf-8'
    );
  });

  it('creates story file when withStories is true', async () => {
    await createComponent(layer, componentName, { withStories: true });

    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, 'src', layer, componentName, 'ui', `${componentName}.stories.tsx`),
      expect.stringContaining(componentName),
      'utf-8'
    );
  });

  it('creates model file when withRedux is true', async () => {
    await createComponent(layer, componentName, { withRedux: true });

    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, 'src', layer, componentName, 'ui', `${componentName}.model.ts`),
      expect.stringContaining(componentName),
      'utf-8'
    );
  });

  it('creates api file when withApi is true', async () => {
    await createComponent(layer, componentName, { withApi: true });

    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, 'src', layer, componentName, 'ui', `${componentName}.api.ts`),
      expect.stringContaining(componentName),
      'utf-8'
    );
  });

  it('throws error for invalid layer', async () => {
    const invalidLayer = 'invalid';

    await expect(createComponent(invalidLayer, componentName)).rejects.toEqual({
      type: 'INVALID_LAYER',
      layer: invalidLayer
    });
  });

  it('throws error for invalid component name starting with lowercase', async () => {
    const invalidName = 'testComponent';

    await expect(createComponent(layer, invalidName)).rejects.toEqual({
      type: 'INVALID_NAME',
      name: invalidName,
      message: expect.stringContaining('uppercase letter')
    });
  });

  it('throws error for invalid component name with special characters', async () => {
    const invalidName = 'Test-Component';

    await expect(createComponent(layer, invalidName)).rejects.toEqual({
      type: 'INVALID_NAME',
      name: invalidName,
      message: expect.stringContaining('letters and numbers')
    });
  });

  it('handles fs errors correctly', async () => {
    const error = new Error('File system error');
    mockedFs.ensureDir.mockRejectedValue(error as unknown as never);

    await expect(createComponent(layer, componentName)).rejects.toEqual({
      type: 'WRITE_ERROR',
      message: error.message
    });
  });
});
