import fs from 'fs-extra';
import path from 'path';
import { createComponent } from '../../src/commands/component';

jest.mock('fs-extra');

describe('createComponent', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create component with all files', async () => {
    // Arrange
    const layer = 'widgets';
    const name = 'Header';
    const options = { tests: true, stories: true };

    // Act
    await createComponent(layer, name, options);

    // Assert
    const componentDir = path.join(process.cwd(), 'src', layer, name);

    expect(mockFs.ensureDir).toHaveBeenCalledWith(componentDir);
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(componentDir, `${name}.tsx`),
      expect.any(String)
    );
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(componentDir, `${name}.module.css`),
      expect.any(String)
    );
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(componentDir, `${name}.test.tsx`),
      expect.any(String)
    );
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(componentDir, `${name}.stories.tsx`),
      expect.any(String)
    );
  });

  it('should create component without tests and stories', async () => {
    // Arrange
    const layer = 'features';
    const name = 'Auth';
    const options = { tests: false, stories: false };

    // Act
    await createComponent(layer, name, options);

    // Assert
    const componentDir = path.join(process.cwd(), 'src', layer, name);

    expect(mockFs.ensureDir).toHaveBeenCalledWith(componentDir);
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(componentDir, `${name}.tsx`),
      expect.any(String)
    );
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(componentDir, `${name}.module.css`),
      expect.any(String)
    );
    expect(mockFs.writeFile).not.toHaveBeenCalledWith(
      path.join(componentDir, `${name}.test.tsx`),
      expect.any(String)
    );
    expect(mockFs.writeFile).not.toHaveBeenCalledWith(
      path.join(componentDir, `${name}.stories.tsx`),
      expect.any(String)
    );
  });
});
