import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import { createFSDStructure } from '../../commands/create';
import { GenerationError } from '../../types/public';

// Mock fs-extra module
jest.mock('fs-extra', () => ({
  ensureDir: jest.fn(() => Promise.resolve()),
  writeFile: jest.fn(() => Promise.resolve()),
  existsSync: jest.fn(() => false),
  remove: jest.fn(() => Promise.resolve())
}));

describe('createFSDStructure', () => {
  const mockCwd = '/test/project';
  beforeEach(() => {
    process.cwd = jest.fn(() => mockCwd);
    jest.clearAllMocks();
  });

  it('creates basic FSD structure', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    await createFSDStructure();

    // Check src directory creation
    expect(fs.ensureDir).toHaveBeenCalledWith(path.join(mockCwd, 'src'));

    // Check layer directories creation
    const layers = [
      'app',
      'processes',
      'pages',
      'widgets',
      'features',
      'entities',
      'shared'
    ];

    layers.forEach(layer => {
      expect(fs.ensureDir).toHaveBeenCalledWith(
        path.join(mockCwd, 'src', layer)
      );
    });

    // Check shared segments creation
    const sharedSegments = ['ui', 'lib', 'api', 'config', 'types', 'constants'];
    sharedSegments.forEach(segment => {
      expect(fs.ensureDir).toHaveBeenCalledWith(
        path.join(mockCwd, 'src', 'shared', segment)
      );
    });

    // Check index files creation
    layers.forEach(layer => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockCwd, 'src', layer, 'index.ts'),
        expect.any(String)
      );
    });
  });

  it('creates TypeScript configuration when typescript option is true', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    await createFSDStructure({ typescript: true });

    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, 'src', 'app', 'types.ts'),
      expect.any(String)
    );
  });

  it('throws error if directory exists and force is false', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    await expect(createFSDStructure()).rejects.toEqual({
      type: 'DIRECTORY_EXISTS',
      path: path.join(mockCwd, 'src')
    } as GenerationError);
  });

  it('creates structure if directory exists and force is true', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    await createFSDStructure({ force: true });

    expect(fs.ensureDir).toHaveBeenCalled();
  });

  it('handles fs errors correctly', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const error = new Error('File system error');
    (fs.ensureDir as jest.Mock).mockRejectedValue(error as unknown as never);

    await expect(createFSDStructure()).rejects.toEqual({
      type: 'WRITE_ERROR',
      message: error.message
    });
  });
});
