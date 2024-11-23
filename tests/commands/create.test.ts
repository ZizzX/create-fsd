import fs from 'fs-extra';
import path from 'path';
import { createFSDStructure } from '../../src/commands/create';

jest.mock('fs-extra');

describe('createFSDStructure', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create base FSD structure', async () => {
    // Arrange
    const targetDir = 'src';
    const expectedDirs = [
      'app',
      'processes',
      'pages',
      'widgets',
      'features',
      'entities',
      'shared',
      'shared/ui',
      'shared/lib',
      'shared/api',
      'shared/config',
      'shared/types',
      'shared/constants',
    ];

    // Act
    await createFSDStructure();

    // Assert
    expectedDirs.forEach(dir => {
      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join(process.cwd(), targetDir, dir)
      );
    });
  });

  it('should handle errors gracefully', async () => {
    // Arrange
    const error = new Error('Failed to create directory');
    mockFs.ensureDir.mockRejectedValue(error);

    // Act & Assert
    await expect(createFSDStructure()).rejects.toThrow('Failed to create directory');
  });
});
