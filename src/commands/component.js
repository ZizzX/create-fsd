import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import {
  componentTemplate,
  indexTemplate,
  storyTemplate,
  styleTemplate,
  testTemplate,
} from '../templates/component.js';

const VALID_LAYERS = ['shared', 'entities', 'features', 'widgets'];

export async function createComponent(layer, name, options = {}) {
  // Проверяем валидность слоя
  if (!VALID_LAYERS.includes(layer)) {
    throw new Error(`Invalid layer "${layer}". Must be one of: ${VALID_LAYERS.join(', ')}`);
  }

  const componentDir = path.join(process.cwd(), 'src', layer, name);

  // Проверяем существование директории
  if (fs.existsSync(componentDir)) {
    throw new Error(`Component "${name}" already exists in ${layer} layer`);
  }

  // Создаем директорию компонента
  await fs.ensureDir(componentDir);

  // Создаем файлы компонента
  await fs.writeFile(
    path.join(componentDir, `${name}.tsx`),
    componentTemplate(name)
  );

  await fs.writeFile(
    path.join(componentDir, `${name}.module.css`),
    styleTemplate()
  );

  await fs.writeFile(
    path.join(componentDir, 'index.ts'),
    indexTemplate(name)
  );

  // Если нужны тесты
  if (options.tests) {
    await fs.writeFile(
      path.join(componentDir, `${name}.test.tsx`),
      testTemplate(name)
    );
  }

  // Если нужны истории Storybook
  if (options.stories) {
    await fs.writeFile(
      path.join(componentDir, `${name}.stories.tsx`),
      storyTemplate(name)
    );
  }

  console.log(chalk.blue('Created files:'));
  console.log(chalk.cyan(`  ├── ${name}.tsx`));
  console.log(chalk.cyan(`  ├── ${name}.module.css`));
  console.log(chalk.cyan(`  ├── index.ts`));
  if (options.tests) {
    console.log(chalk.cyan(`  ├── ${name}.test.tsx`));
  }
  if (options.stories) {
    console.log(chalk.cyan(`  └── ${name}.stories.tsx`));
  }
}
