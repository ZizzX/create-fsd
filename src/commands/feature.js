import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import {
  componentTemplate,
  styleTemplate,
  testTemplate,
  storyTemplate,
  indexTemplate,
  modelTemplate,
  apiTemplate,
  selectorsTemplate,
  typesTemplate,
  publicApiTemplate,
} from '../templates/feature.js';

export async function createFeature(name, options = {}) {
  const featureDir = path.join(process.cwd(), 'src', 'features', name);

  // Проверяем существование директории
  if (fs.existsSync(featureDir)) {
    throw new Error(`Feature "${name}" already exists`);
  }

  // Создаем структуру директорий
  await fs.ensureDir(path.join(featureDir, 'ui'));
  await fs.ensureDir(path.join(featureDir, 'model'));
  await fs.ensureDir(path.join(featureDir, 'api'));

  // Создаем UI компоненты
  await fs.writeFile(
    path.join(featureDir, 'ui', `${name}.tsx`),
    componentTemplate(name)
  );
  await fs.writeFile(
    path.join(featureDir, 'ui', `${name}.module.css`),
    styleTemplate()
  );

  // Создаем файлы модели
  await fs.writeFile(
    path.join(featureDir, 'model', `${name}Slice.ts`),
    modelTemplate(name)
  );
  await fs.writeFile(
    path.join(featureDir, 'model', 'selectors.ts'),
    selectorsTemplate(name)
  );
  await fs.writeFile(
    path.join(featureDir, 'model', 'types.ts'),
    typesTemplate(name)
  );

  // Создаем API
  await fs.writeFile(
    path.join(featureDir, 'api', `${name}Api.ts`),
    apiTemplate(name)
  );

  // Создаем public API
  await fs.writeFile(
    path.join(featureDir, 'index.ts'),
    publicApiTemplate(name)
  );

  // Если нужны тесты
  if (options.tests) {
    await fs.writeFile(
      path.join(featureDir, 'ui', `${name}.test.tsx`),
      testTemplate(name)
    );
  }

  // Если нужны истории Storybook
  if (options.stories) {
    await fs.writeFile(
      path.join(featureDir, 'ui', `${name}.stories.tsx`),
      storyTemplate(name)
    );
  }

  console.log(chalk.blue('Created feature files:'));
  console.log(chalk.cyan('  ui/'));
  console.log(chalk.cyan(`    ├── ${name}.tsx`));
  console.log(chalk.cyan(`    ├── ${name}.module.css`));
  if (options.tests) {
    console.log(chalk.cyan(`    ├── ${name}.test.tsx`));
  }
  if (options.stories) {
    console.log(chalk.cyan(`    └── ${name}.stories.tsx`));
  }
  console.log(chalk.cyan('  model/'));
  console.log(chalk.cyan(`    ├── ${name}Slice.ts`));
  console.log(chalk.cyan(`    ├── selectors.ts`));
  console.log(chalk.cyan(`    └── types.ts`));
  console.log(chalk.cyan('  api/'));
  console.log(chalk.cyan(`    └── ${name}Api.ts`));
  console.log(chalk.cyan('  index.ts'));
}
