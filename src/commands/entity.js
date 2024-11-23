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
  schemaTemplate,
  selectorsTemplate,
  typesTemplate,
  publicApiTemplate,
} from '../templates/entity.js';

export async function createEntity(name, options = {}) {
  const entityDir = path.join(process.cwd(), 'src', 'entities', name);

  // Проверяем существование директории
  if (fs.existsSync(entityDir)) {
    throw new Error(`Entity "${name}" already exists`);
  }

  // Создаем структуру директорий
  await fs.ensureDir(path.join(entityDir, 'ui'));
  await fs.ensureDir(path.join(entityDir, 'model'));

  // Создаем UI компоненты
  await fs.writeFile(
    path.join(entityDir, 'ui', `${name}.tsx`),
    componentTemplate(name)
  );
  await fs.writeFile(
    path.join(entityDir, 'ui', `${name}.module.css`),
    styleTemplate()
  );

  // Создаем файлы модели
  await fs.writeFile(
    path.join(entityDir, 'model', `${name}Slice.ts`),
    modelTemplate(name)
  );
  await fs.writeFile(
    path.join(entityDir, 'model', 'schema.ts'),
    schemaTemplate(name)
  );
  await fs.writeFile(
    path.join(entityDir, 'model', 'selectors.ts'),
    selectorsTemplate(name)
  );
  await fs.writeFile(
    path.join(entityDir, 'model', 'types.ts'),
    typesTemplate(name)
  );

  // Создаем public API
  await fs.writeFile(
    path.join(entityDir, 'index.ts'),
    publicApiTemplate(name)
  );

  // Если нужны тесты
  if (options.tests) {
    await fs.writeFile(
      path.join(entityDir, 'ui', `${name}.test.tsx`),
      testTemplate(name)
    );
  }

  // Если нужны истории Storybook
  if (options.stories) {
    await fs.writeFile(
      path.join(entityDir, 'ui', `${name}.stories.tsx`),
      storyTemplate(name)
    );
  }

  console.log(chalk.blue('Created entity files:'));
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
  console.log(chalk.cyan(`    ├── schema.ts`));
  console.log(chalk.cyan(`    ├── selectors.ts`));
  console.log(chalk.cyan(`    └── types.ts`));
  console.log(chalk.cyan('  index.ts'));
}
